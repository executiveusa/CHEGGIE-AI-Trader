# Append-Only Design Prompts

1. **UDEC Design Validator**  
   "Validate current screen against UDEC (CTX,DYN,LFT,TYP,CLR,GRD,SPC,IMG,MOT,ACC,RSP,TRD,EMO). Output JSON: `{code, severity, finding, fix.type, fix.value, acceptance}` with exact Tailwind classes, px/rem, and WCAG notes. Target AA or better."

2. **Hero Composition Rewrite**  
   "Rebuild Hero with `/media/hero/city-hero.jpg`, full-bleed, `min-h-[100svh]`, overlay gradient for AA contrast. Keep headline, subcopy, primary/secondary CTAs. Provide JSX diff and why it improves CTX/ACC."

3. **Gradient System Normalizer**  
   "Inventory all gradient classes. Propose a 3-token set (primary, surface, overlay). Replace usages with tokens. Output a codemod plan and before/after snippets."

4. **Glass Panel Calibration**  
   "Define `.glass-panel` tokens for blur, saturation, border, background. Ensure readability over busy imagery. Provide CSS and usage rules for cards, stats, and modals."

5. **Responsive Grid Hardening**  
   "Refactor stats and card grids to `grid-cols-1 sm:grid-cols-3` with consistent gaps. Include mobile line-wrapping rules and min-tap target sizes. Output JSX diff."

6. **Motion Accessibility Pass**  
   "Add keyframes for `fade-in` and `scale-in`. Implement `prefers-reduced-motion: reduce` kill switch. List components using motion and show the exact removal under reduced-motion."

7. **i18n Backfill + Guards**  
   "Generate `en/es/sr` for: `dashboardShowcase.*`, `workflow.steps[]`, `integrations.stack[]`, `hero.watchDemo/callSales/callSalesAria`, `ctaSection.*`, `testimonials.items[]`. Add runtime guards for `.map/.split`. Output i18n JSON and example guarded usage."

8. **CTA Semantics + Wiring**  
   "Ensure ‘Watch Demo’ opens video modal or links to `/demo`. Add `aria-label` from i18n. Remove fake phone CTA or replace with valid contact flow. Provide route or modal code."

9. **Color & Contrast Fixer**  
   "Run contrast check on Hero text over image + overlay. If < AA, increase overlay opacity or adjust text color. Output exact RGBA and Tailwind utilities. Include before/after contrast ratios."

10. **Image Performance Policy**  
    "Apply `loading=\"lazy\"`, dimensions, and placeholder (BlurHash or skeleton). Provide a utility `<SmartImage>` wrapper and replace raw `<img>` usages."

11. **Type Scale + Rhythm**  
    "Define a 8-pt rhythm type scale with roles (h1–h6, lead, body, caption). Map to Tailwind classes. Replace ad-hoc text sizes with roles; output find/replace table."

12. **Admin UX Consistency (Agents Console)**  
    "Align Admin tabs (Assistant, Computer-Use, Agents, Reviews, Logs) to shared card layout, consistent spacing, empty states, and error toasts. Provide component props and example screen."

13. **Error/Empty/Skeleton States**  
    "Add standard patterns for: loading, empty, error, no-permission. Output components with copy guidelines and when-to-show rules."

14. **Lighthouse/Axe Gate**  
    "Define budgets: LCP < 2.5s, CLS < 0.1. List concrete remediations tied to components. Include `@axe-core/react` integration code and CI step."

15. **Copy Tone Guard**  
    "Create a micro-styleguide for finance-lifestyle tone. Provide banned words, preferred terms, and example rewrites for hero, cards, and CTAs. Output as `COPY_GUIDE.md`."

