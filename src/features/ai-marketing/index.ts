// AI Marketing Module - Floating Assistant Integration
export { AutoReplyManager } from './components/AutoReplyManager/AutoReplyManager';
export { ContentGenerator } from './components/ContentGenerator/ContentGenerator';
export { SocialMediaPublisher } from './components/SocialMediaPublisher/SocialMediaPublisher';
export { TopicAnalyzer } from './components/TopicAnalyzer/TopicAnalyzer';
export { MarketingDashboard } from './pages/MarketingDashboard/MarketingDashboard';
export { AIAssistantOverlay } from './components/AIAssistantOverlay/AIAssistantOverlay';

// Hooks
export { useAutoReply } from './hooks/useAutoReply';
export { useContentGeneration } from './hooks/useContentGeneration';
export { useSocialPublishing } from './hooks/useSocialPublishing';
export { useTopicAnalysis } from './hooks/useTopicAnalysis';
export { useMarketingAnalytics } from './hooks/useMarketingAnalytics';

// Types
export type { 
  AutoReplyConfig, 
  ContentGenerationRequest, 
  SocialPostData, 
  TopicAnalysisResult,
  MarketingMetrics,
  AIAssistantConfig 
} from './types';

// API
export { aiMarketingApi } from './api/aiMarketingApi';

// Store
export { aiMarketingStore } from './store/aiMarketingStore';