# Cheggie AI - Technical Specifications for AI-Assisted Development

## Document Purpose
This document provides **exact implementation specifications** for OpenAI Codex or similar AI development assistants to build Cheggie AI with minimal human intervention.

---

## Stack Summary

```yaml
Frontend:
  - Framework: React 18 + TypeScript 5
  - Build: Vite 5
  - Styling: Tailwind CSS 3 + shadcn/ui
  - Animation: Framer Motion
  - i18n: react-i18next
  - State: React Query + React Hooks
  - Routing: React Router DOM 6

Backend:
  - Platform: Lovable Cloud (Supabase-based)
  - Database: PostgreSQL 15
  - Auth: Supabase Auth
  - Storage: Supabase Storage
  - Functions: Edge Functions (Deno)
  - AI: Lovable AI Gateway (Gemini 2.5 Flash)

Payments:
  - Stripe Checkout + Billing Portal
  - Webhooks for subscription events

Deployment:
  - Frontend: Vercel
  - Backend: Supabase Cloud
  - Domain: Custom via Vercel
```

---

## File Structure

```
cheggie-ai/
├── src/
│   ├── components/
│   │   ├── ui/                      # shadcn components (pre-configured)
│   │   ├── Navigation.tsx           # Top navbar with language switcher
│   │   ├── Hero.tsx                 # Landing page hero
│   │   ├── Features.tsx             # Feature cards grid
│   │   ├── Pricing.tsx              # Pricing table
│   │   ├── Footer.tsx               # Footer with links
│   │   ├── LanguageSwitcher.tsx     # Language dropdown
│   │   ├── AnalysisForm.tsx         # Stock analysis input form
│   │   ├── LiveProgress.tsx         # AI task progress viewer
│   │   └── ReportViewer.tsx         # Analysis results display
│   ├── pages/
│   │   ├── Index.tsx                # Landing page
│   │   ├── Auth.tsx                 # Sign in/up page
│   │   ├── Dashboard.tsx            # Main app dashboard
│   │   ├── NewAnalysis.tsx          # Create new analysis
│   │   ├── Reports.tsx              # User's past reports
│   │   ├── Affiliate.tsx            # Affiliate dashboard
│   │   └── NotFound.tsx             # 404 page
│   ├── hooks/
│   │   ├── useAuth.ts               # Authentication hook
│   │   ├── useAnalysis.ts           # Analysis creation hook
│   │   └── useSubscription.ts       # Stripe subscription hook
│   ├── i18n/
│   │   └── config.ts                # i18next setup + translations
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client
│   │   └── utils.ts                 # Utility functions
│   ├── App.tsx                      # Root component with routing
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles + design tokens
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql   # Database tables
│   │   ├── 002_rls_policies.sql     # Row-level security
│   │   └── 003_functions.sql        # SQL functions
│   └── functions/
│       ├── analyze-stock/
│       │   └── index.ts             # Main AI analysis function
│       ├── stripe-webhook/
│       │   └── index.ts             # Stripe event handler
│       └── generate-pdf/
│           └── index.ts             # PDF report generator
├── public/
│   ├── images/                      # Placeholder images (Pexels/Unsplash)
│   └── robots.txt
├── PRODUCT_REQUIREMENTS.md          # PRD (already created)
├── TECHNICAL_SPECS.md               # This document
└── README.md                        # Setup instructions
```

---

## Implementation Instructions

### Phase 1: Foundation Setup

#### 1.1 Initialize Lovable Cloud

**Action:** Enable Lovable Cloud integration
**Tool:** `supabase--enable`

**Verify:**
```sql
-- Should see these tables auto-created:
-- auth.users
-- storage.buckets
```

#### 1.2 Create Database Schema

**File:** `supabase/migrations/001_initial_schema.sql`

```sql
-- Users extended profile
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'sr', 'es')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  analyses_used_this_month INTEGER DEFAULT 0,
  analyses_limit INTEGER DEFAULT 3,
  stripe_customer_id TEXT UNIQUE,
  affiliate_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analyses (user reports)
CREATE TABLE public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  ticker TEXT NOT NULL,
  analysis_type TEXT NOT NULL CHECK (analysis_type IN ('quick', 'standard', 'deep')),
  parameters JSONB,
  result JSONB,
  pdf_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Affiliates
CREATE TABLE public.affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  code TEXT UNIQUE NOT NULL,
  total_referrals INTEGER DEFAULT 0,
  total_earnings NUMERIC(10,2) DEFAULT 0,
  payout_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals tracking
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliates(id) ON DELETE CASCADE NOT NULL,
  referred_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'cancelled')),
  commission_paid NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_analyses_user_id ON public.analyses(user_id);
CREATE INDEX idx_analyses_created_at ON public.analyses(created_at DESC);
CREATE INDEX idx_referrals_affiliate_id ON public.referrals(affiliate_id);

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
```

#### 1.3 Row-Level Security Policies

**File:** `supabase/migrations/002_rls_policies.sql`

```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/update their own
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Analyses: users can only see their own
CREATE POLICY "Users can view own analyses"
ON public.analyses FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create analyses"
ON public.analyses FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Affiliates: users can manage their own affiliate account
CREATE POLICY "Users can view own affiliate"
ON public.affiliates FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own affiliate"
ON public.affiliates FOR UPDATE
USING (auth.uid() = user_id);

-- Referrals: affiliates can view their referrals
CREATE POLICY "Affiliates can view referrals"
ON public.referrals FOR SELECT
USING (
  affiliate_id IN (
    SELECT id FROM public.affiliates WHERE user_id = auth.uid()
  )
);
```

#### 1.4 Automatic Profile Creation Trigger

**File:** `supabase/migrations/003_functions.sql`

```sql
-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  random_code TEXT;
BEGIN
  -- Generate unique affiliate code
  random_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
  
  INSERT INTO public.profiles (id, email, affiliate_code)
  VALUES (
    NEW.id,
    NEW.email,
    random_code
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
```

---

### Phase 2: Frontend Implementation

#### 2.1 Supabase Client Setup

**File:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  language: 'en' | 'sr' | 'es';
  subscription_tier: 'free' | 'pro' | 'enterprise';
  analyses_used_this_month: number;
  analyses_limit: number;
  affiliate_code: string | null;
};

export type Analysis = {
  id: string;
  user_id: string;
  ticker: string;
  analysis_type: 'quick' | 'standard' | 'deep';
  parameters: Record<string, any>;
  result: Record<string, any>;
  pdf_url: string | null;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
};
```

#### 2.2 Authentication Hook

**File:** `src/hooks/useAuth.ts`

```typescript
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, Profile } from '@/lib/supabase';
import { toast } from 'sonner';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      toast.error(error.message);
      return { error };
    }

    toast.success('Check your email to confirm your account!');
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return { error };
    }

    toast.success('Welcome back!');
    return { error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed out successfully');
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };
}
```

#### 2.3 Analysis Hook

**File:** `src/hooks/useAnalysis.ts`

```typescript
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type AnalysisParams = {
  ticker: string;
  analysisType: 'quick' | 'standard' | 'deep';
  investmentHorizon?: 'short' | 'medium' | 'long';
  riskTolerance?: 'low' | 'medium' | 'high';
};

export function useAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const createAnalysis = async (params: AnalysisParams) => {
    setIsAnalyzing(true);
    setProgress(['Initializing analysis...']);

    try {
      // Call edge function
      const { data, error } = await supabase.functions.invoke('analyze-stock', {
        body: params,
      });

      if (error) throw error;

      setProgress(prev => [...prev, 'Analysis complete!']);
      toast.success('Analysis completed successfully!');
      
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'Analysis failed');
      return { data: null, error };
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    createAnalysis,
    isAnalyzing,
    progress,
  };
}
```

---

### Phase 3: Edge Functions (Backend Logic)

#### 3.1 Stock Analysis Function

**File:** `supabase/functions/analyze-stock/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticker, analysisType, investmentHorizon, riskTolerance } = await req.json();
    
    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader! } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // Check usage limits
    const { data: profile } = await supabase
      .from('profiles')
      .select('analyses_used_this_month, analyses_limit, subscription_tier')
      .eq('id', user.id)
      .single();

    if (profile.analyses_used_this_month >= profile.analyses_limit) {
      throw new Error('Usage limit reached. Upgrade to Pro for more analyses.');
    }

    // Create analysis record
    const { data: analysis, error: insertError } = await supabase
      .from('analyses')
      .insert({
        user_id: user.id,
        ticker,
        analysis_type: analysisType,
        parameters: { investmentHorizon, riskTolerance },
        status: 'processing',
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // Call Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    const prompt = `
      You are a professional financial analyst. Perform a ${analysisType} analysis of ${ticker}.
      
      Investment Horizon: ${investmentHorizon || 'medium-term'}
      Risk Tolerance: ${riskTolerance || 'medium'}
      
      Provide:
      1. Executive Summary (2-3 paragraphs)
      2. Key Financial Metrics (P/E, P/B, Dividend Yield, etc.)
      3. Growth Analysis
      4. Risk Assessment
      5. Recommendation (Buy/Hold/Sell with confidence %)
      
      Format as JSON with these keys: summary, metrics, growth, risks, recommendation
    `;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        throw new Error('AI service rate limit exceeded. Please try again later.');
      }
      throw new Error('AI analysis failed');
    }

    const aiData = await aiResponse.json();
    const result = JSON.parse(aiData.choices[0].message.content);

    // Update analysis with results
    await supabase
      .from('analyses')
      .update({
        result,
        status: 'completed',
      })
      .eq('id', analysis.id);

    // Increment usage counter
    await supabase
      .from('profiles')
      .update({
        analyses_used_this_month: profile.analyses_used_this_month + 1,
      })
      .eq('id', user.id);

    return new Response(
      JSON.stringify({ analysisId: analysis.id, result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
```

#### 3.2 Stripe Webhook Handler

**File:** `supabase/functions/stripe-webhook/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@13.0.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature!, webhookSecret!);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Update user tier
        await supabase
          .from('profiles')
          .update({
            subscription_tier: 'pro',
            analyses_limit: 50,
          })
          .eq('stripe_customer_id', customerId);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Downgrade to free
        await supabase
          .from('profiles')
          .update({
            subscription_tier: 'free',
            analyses_limit: 3,
          })
          .eq('stripe_customer_id', customerId);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Track affiliate commission if applicable
        // (Implementation depends on affiliate tracking logic)
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
});
```

---

### Phase 4: Stripe Integration

#### 4.1 Enable Stripe

**Action:** Use Stripe integration tool
**Required:** STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

#### 4.2 Create Products in Stripe

```bash
# Pro Plan
stripe products create \
  --name "Cheggie AI Pro" \
  --description "50 AI analyses per month"

stripe prices create \
  --product <PRODUCT_ID> \
  --unit-amount 4900 \
  --currency usd \
  --recurring[interval]=month
```

---

### Phase 5: Deployment Checklist

- [ ] Enable Lovable Cloud
- [ ] Run database migrations
- [ ] Configure environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - `LOVABLE_API_KEY` (auto-configured)
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
- [ ] Deploy edge functions
- [ ] Test authentication flow
- [ ] Test analysis creation
- [ ] Test Stripe subscription
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring (Sentry/LogRocket)

---

## AI Development Prompt for Codex

```
Build Cheggie AI, a multilingual AI-powered stock analysis SaaS.

Tech Stack:
- React 18 + TypeScript + Vite
- Tailwind CSS with custom design system
- Lovable Cloud backend (Supabase)
- Lovable AI Gateway (Gemini 2.5 Flash)
- Stripe for payments
- react-i18next for EN/SR/ES support

Implement:
1. User authentication with Supabase Auth
2. Stock analysis using multi-agent AI architecture
3. Subscription management with Stripe
4. Affiliate program with commission tracking
5. Full multilingual support across UI and AI responses

Database schema, edge functions, and frontend components are specified in TECHNICAL_SPECS.md.

Design requirements:
- Finance-focused color palette (deep blue, cyan, green)
- Animated UI with Framer Motion
- Professional report layouts
- Mobile-responsive

Key features:
- Free tier: 3 analyses/month
- Pro tier: $49/month, 50 analyses
- Real-time AI progress tracking
- Downloadable PDF reports
- Affiliate dashboard with earnings

Follow the exact specifications in TECHNICAL_SPECS.md and PRODUCT_REQUIREMENTS.md.
```

---

## Testing Strategy

### Unit Tests
```typescript
// Example: useAuth.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

test('signUp creates user and profile', async () => {
  const { result } = renderHook(() => useAuth());
  
  await waitFor(async () => {
    await result.current.signUp('test@example.com', 'password123', 'Test User');
  });
  
  expect(result.current.user).toBeTruthy();
  expect(result.current.profile).toBeTruthy();
});
```

### Integration Tests
- Auth flow: signup → email verify → login → dashboard
- Analysis flow: create → process → view report → download PDF
- Payment flow: select plan → checkout → webhook → tier upgrade

---

## Performance Optimization

1. **Code Splitting:**
   ```typescript
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   const Reports = lazy(() => import('./pages/Reports'));
   ```

2. **Image Optimization:**
   - Use WebP format
   - Lazy load below-the-fold images
   - Implement blur placeholders

3. **AI Response Caching:**
   ```typescript
   // Cache completed analyses for 24 hours
   const cacheKey = `analysis:${ticker}:${analysisType}`;
   const cached = await redis.get(cacheKey);
   if (cached) return cached;
   ```

---

## Security Considerations

1. **SQL Injection Prevention:** All queries use parameterized statements via Supabase SDK
2. **XSS Prevention:** React escapes by default, no dangerouslySetInnerHTML
3. **CSRF Protection:** Supabase handles token-based auth
4. **Rate Limiting:** Implement at edge function level
5. **Input Validation:** Use zod schemas for all user inputs

---

## Monitoring & Analytics

```typescript
// PostHog/Mixpanel integration
import { analytics } from '@/lib/analytics';

analytics.track('Analysis Created', {
  ticker,
  analysisType,
  subscriptionTier: profile.subscription_tier,
});
```

---

**End of Technical Specifications**
