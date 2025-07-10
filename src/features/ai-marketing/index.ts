// AI Marketing Module - Floating Assistant Integration
export { AutoReplyManager } from './components/AutoReplyManager/AutoReplyManager';
export { ContentGenerator } from './components/ContentGenerator/ContentGenerator';
export { SocialMediaPublisher } from './components/SocialMediaPublisher/SocialMediaPublisher';
export { SmartTopicFinder } from './components/SmartTopicFinder/SmartTopicFinder';
export { MarketingAnalytics } from './components/MarketingAnalytics/MarketingAnalytics';
export { AISettingsPanel } from './components/AISettingsPanel/AISettingsPanel';

// Hooks
export { useAutoReply } from './hooks/useAutoReply';
export { useContentGeneration } from './hooks/useContentGeneration';
export { useSocialPublishing } from './hooks/useSocialPublishing';
export { useTopicAnalysis } from './hooks/useTopicAnalysis';
export { useMarketingInsights } from './hooks/useMarketingInsights';

// API
export { aiMarketingApi } from './api/aiMarketingApi';

// Types
export type { 
  AutoReplyConfig, 
  ContentGenerationRequest, 
  SocialPostData, 
  TopicAnalysisResult,
  MarketingInsight,
  AISettings 
} from './types';

// Store
export { aiMarketingStore } from './store/aiMarketingStore';