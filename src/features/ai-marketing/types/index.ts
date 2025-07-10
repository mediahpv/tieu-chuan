// AI Marketing Types
export interface AutoReplyConfig {
  id: string;
  name: string;
  platform: 'facebook' | 'instagram' | 'zalo' | 'telegram' | 'whatsapp';
  triggerKeywords: string[];
  responseTemplate: string;
  aiEnhancement: boolean;
  personality: 'professional' | 'friendly' | 'casual' | 'formal';
  businessContext: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentGenerationRequest {
  businessType: string;
  targetAudience: string[];
  contentType: 'post' | 'story' | 'ad' | 'email' | 'blog';
  platform: 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'twitter';
  tone: 'professional' | 'casual' | 'humorous' | 'inspirational' | 'educational';
  keywords: string[];
  productInfo?: {
    name: string;
    description: string;
    benefits: string[];
    price?: string;
  };
  callToAction?: string;
  imageStyle?: 'minimal' | 'colorful' | 'professional' | 'trendy';
  language: 'vi' | 'en';
}

export interface GeneratedContent {
  id: string;
  title: string;
  content: string;
  hashtags: string[];
  suggestedImages: string[];
  postingTime: Date;
  engagementScore: number;
  aiSuggestions: string[];
  variations: GeneratedContent[];
}

export interface SocialPostData {
  id: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'twitter';
  content: string;
  mediaUrls: string[];
  hashtags: string[];
  scheduledTime?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagementMetrics?: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
}

export interface TopicAnalysisResult {
  trendingTopics: Array<{
    topic: string;
    relevanceScore: number;
    searchVolume: number;
    competition: 'low' | 'medium' | 'high';
    suggestedContent: string[];
  }>;
  competitorAnalysis: Array<{
    competitor: string;
    topPosts: Array<{
      content: string;
      engagement: number;
      hashtags: string[];
    }>;
  }>;
  audienceInsights: {
    interests: string[];
    activeHours: number[];
    preferredContent: string[];
    demographics: {
      ageRange: string;
      location: string;
      gender: string;
    };
  };
}

export interface MarketingMetrics {
  totalPosts: number;
  totalEngagement: number;
  averageEngagementRate: number;
  topPerformingContent: SocialPostData[];
  audienceGrowth: {
    current: number;
    previous: number;
    growthRate: number;
  };
  platformPerformance: Array<{
    platform: string;
    posts: number;
    engagement: number;
    reach: number;
  }>;
}

export interface AIAssistantConfig {
  // Floating Assistant Configuration
  position: {
    x: number;
    y: number;
    isDraggable: boolean;
  };
  size: {
    width: number;
    height: number;
    isResizable: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    opacity: number;
    blur: boolean;
    alwaysOnTop: boolean;
  };
  permissions: {
    screenControl: boolean;
    appAccess: boolean;
    notificationAccess: boolean;
    clipboardAccess: boolean;
  };
  aiCapabilities: {
    autoReply: boolean;
    contentGeneration: boolean;
    socialPublishing: boolean;
    topicAnalysis: boolean;
    smartScheduling: boolean;
  };
  businessContext: {
    industry: string;
    targetAudience: string[];
    brandVoice: string;
    goals: string[];
  };
}

export interface ScreenControlAction {
  type: 'click' | 'type' | 'scroll' | 'swipe' | 'longPress';
  coordinates?: { x: number; y: number };
  text?: string;
  element?: {
    id?: string;
    className?: string;
    text?: string;
  };
  delay?: number;
}

export interface AIAnalysisResult {
  confidence: number;
  suggestedActions: ScreenControlAction[];
  insights: string[];
  recommendations: string[];
}