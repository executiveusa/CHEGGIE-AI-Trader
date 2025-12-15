import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Power, 
  Send, 
  Loader2, 
  Sparkles, 
  Zap,
  MessageSquare,
  ChevronDown,
  Settings,
  Link2,
  X,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Available app integrations via Composio
const AVAILABLE_APPS = [
  { id: 'slack', name: 'Slack', icon: '💬', connected: false },
  { id: 'notion', name: 'Notion', icon: '📝', connected: false },
  { id: 'github', name: 'GitHub', icon: '🐙', connected: true },
  { id: 'calendar', name: 'Google Calendar', icon: '📅', connected: false },
  { id: 'jira', name: 'Jira', icon: '🎯', connected: false },
  { id: 'hubspot', name: 'HubSpot', icon: '🧡', connected: false },
  { id: 'stripe', name: 'Stripe', icon: '💳', connected: true },
  { id: 'twitter', name: 'Twitter/X', icon: '🐦', connected: false },
];

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolsUsed?: string[];
}

interface RubeAgentPanelProps {
  className?: string;
}

export const RubeAgentPanel = ({ className }: RubeAgentPanelProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApps, setShowApps] = useState(false);
  const [apps, setApps] = useState(AVAILABLE_APPS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('rube-agent-enabled');
    if (savedState) {
      setIsEnabled(JSON.parse(savedState));
    }
    const savedApps = localStorage.getItem('rube-connected-apps');
    if (savedApps) {
      setApps(JSON.parse(savedApps));
    }
  }, []);

  const handleToggle = (enabled: boolean) => {
    setIsEnabled(enabled);
    localStorage.setItem('rube-agent-enabled', JSON.stringify(enabled));
    
    if (enabled && messages.length === 0) {
      // Welcome message when first enabled
      setMessages([{
        id: '1',
        role: 'assistant',
        content: '👋 Rube Agent is now active! I can execute actions across your connected apps like Slack, Notion, GitHub, and more. Try saying "Send a Slack message to #general" or "Create a GitHub issue".',
        timestamp: new Date(),
      }]);
    }
  };

  const toggleApp = (appId: string) => {
    const updatedApps = apps.map(app => 
      app.id === appId ? { ...app, connected: !app.connected } : app
    );
    setApps(updatedApps);
    localStorage.setItem('rube-connected-apps', JSON.stringify(updatedApps));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !isEnabled) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with tool execution
    // In production, this would call the Composio Tool Router API
    setTimeout(() => {
      const detectedTools = detectTools(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(userMessage.content, detectedTools),
        timestamp: new Date(),
        toolsUsed: detectedTools,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const detectTools = (content: string): string[] => {
    const tools: string[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('slack') || lowerContent.includes('message')) {
      tools.push('slack_send_message');
    }
    if (lowerContent.includes('github') || lowerContent.includes('issue') || lowerContent.includes('pr')) {
      tools.push('github_create_issue');
    }
    if (lowerContent.includes('notion') || lowerContent.includes('page') || lowerContent.includes('doc')) {
      tools.push('notion_create_page');
    }
    if (lowerContent.includes('calendar') || lowerContent.includes('meeting') || lowerContent.includes('schedule')) {
      tools.push('gcal_create_event');
    }
    if (lowerContent.includes('email') || lowerContent.includes('mail')) {
      tools.push('gmail_send_email');
    }
    
    return tools.length > 0 ? tools : ['composio_tool_router'];
  };

  const generateResponse = (content: string, tools: string[]): string => {
    if (tools.includes('slack_send_message')) {
      return '✅ I\'ve sent the message to Slack! The Tool Router executed `slack_send_message` successfully.';
    }
    if (tools.includes('github_create_issue')) {
      return '✅ GitHub issue created! I used `github_create_issue` via the Tool Router. You can view it in your repository.';
    }
    if (tools.includes('notion_create_page')) {
      return '✅ Notion page created! The `notion_create_page` tool was executed. Check your workspace for the new page.';
    }
    if (tools.includes('gcal_create_event')) {
      return '✅ Calendar event scheduled! I used `gcal_create_event` to add it to your calendar.';
    }
    
    return `🤔 I've analyzed your request using the Composio Tool Router. The detected intent would typically trigger these tools: ${tools.join(', ')}. \n\n**Note:** This is a demo mode. Connect to Composio with your API key to enable real tool execution.`;
  };

  const connectedCount = apps.filter(a => a.connected).length;

  return (
    <div className={cn('relative', className)} data-agid="rube-agent-panel">
      {/* Collapsed View - Toggle Bar */}
      <GlassCard 
        className={cn(
          'transition-all duration-300',
          isExpanded ? 'rounded-b-none' : ''
        )}
        padding="sm"
        hover={false}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'p-2 rounded-lg transition-colors',
              isEnabled 
                ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                : 'bg-slate-700'
            )}>
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Rube Agent</span>
                <Badge 
                  className={cn(
                    'text-xs',
                    isEnabled 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-slate-700 text-slate-400 border-slate-600'
                  )}
                >
                  {isEnabled ? 'Active' : 'Inactive'}
                </Badge>
                {connectedCount > 0 && (
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                    {connectedCount} apps
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500">
                AI-powered automation across 500+ apps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Power Toggle */}
            <div className="flex items-center gap-2">
              <Power className={cn(
                'h-4 w-4 transition-colors',
                isEnabled ? 'text-emerald-400' : 'text-slate-500'
              )} />
              <Switch
                checked={isEnabled}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
              />
            </div>

            {/* Expand/Collapse */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Expanded View - Chat Interface */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <GlassCard 
              className="rounded-t-none border-t-0"
              padding="md"
              hover={false}
            >
              {/* Connected Apps Bar */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Connected Apps</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-purple-400 hover:text-purple-300"
                  onClick={() => setShowApps(!showApps)}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Manage
                </Button>
              </div>

              {/* Apps Grid (when managing) */}
              <AnimatePresence>
                {showApps && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4 pb-4 border-b border-white/10"
                  >
                    <div className="grid grid-cols-4 gap-2">
                      {apps.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => toggleApp(app.id)}
                          className={cn(
                            'p-2 rounded-lg text-center transition-all',
                            app.connected
                              ? 'bg-purple-500/20 border border-purple-500/30'
                              : 'bg-white/5 border border-white/10 hover:bg-white/10'
                          )}
                        >
                          <span className="text-xl block">{app.icon}</span>
                          <span className="text-xs text-slate-400 block mt-1">{app.name}</span>
                          {app.connected && (
                            <Badge className="mt-1 text-[10px] bg-emerald-500/20 text-emerald-400">
                              ✓
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">
                      Click to connect/disconnect apps • Requires{' '}
                      <a 
                        href="https://composio.dev" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:underline"
                      >
                        Composio API key
                      </a>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto space-y-3 mb-4">
                {!isEnabled ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Bot className="h-12 w-12 text-slate-600 mb-3" />
                    <p className="text-slate-500">
                      Toggle the switch above to activate Rube Agent
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Powered by Composio MCP
                    </p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Sparkles className="h-12 w-12 text-purple-500 mb-3" />
                    <p className="text-slate-400">
                      Rube Agent is ready
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Ask me to perform actions across your apps
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'p-3 rounded-lg max-w-[85%]',
                        message.role === 'user'
                          ? 'ml-auto bg-purple-500/20 border border-purple-500/30'
                          : 'bg-white/5 border border-white/10'
                      )}
                    >
                      <p className="text-sm text-white whitespace-pre-wrap">
                        {message.content}
                      </p>
                      {message.toolsUsed && message.toolsUsed.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.toolsUsed.map((tool) => (
                            <Badge 
                              key={tool}
                              className="text-[10px] bg-slate-700 text-slate-400"
                            >
                              <Zap className="h-2 w-2 mr-1" />
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-[10px] text-slate-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </motion.div>
                  ))
                )}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 p-3 bg-white/5 rounded-lg w-fit"
                  >
                    <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
                    <span className="text-sm text-slate-400">
                      Executing tools...
                    </span>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder={
                    isEnabled 
                      ? "Ask Rube to do something..." 
                      : "Enable Rube Agent first"
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={!isEnabled || isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!isEnabled || !inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <a
                  href="https://github.com/ComposioHQ/open-rube"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-400 flex items-center gap-1"
                >
                  Powered by Open Rube
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-xs text-slate-600">
                  MCP + Composio Tool Router
                </span>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RubeAgentPanel;
