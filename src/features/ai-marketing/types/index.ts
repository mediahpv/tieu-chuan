// AI Marketing Types

export interface AutoReplyConfig {
  id: string;
  name: string;
  isEnabled: boolean;
  triggerKeywords: string[];
  responseTemplates: ResponseTemplate[];
  businessContext: BusinessContext;
  tone: 'professional' | 'friendly' | 'casual' | 'formal';
  language: 'vi' | 'en';
  autoApprove: boolean;
  maxResponseLength: number;
}

export interface ResponseTemplate {
  id: string;
  content: string;
  category: 'greeting' | 'inquiry' | 'complaint' | 'sale' | 'support';
  priority: number;
  isActive: boolean;
}

export interface BusinessContext {
  businessName: string;
  industry: string;
  targetAudience: string[];
  products: string[];
  services: string[];
  brandVoice: string;
  contactInfo: ContactInfo;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

export interface ContentGenerationRequest {
  contentType: 'post' | 'article' | 'ad' | 'email' | 'story';
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube';
  topic?: string;
  keywords: string[];
  targetAudience: string;
  tone: 'professional' | 'casual' | 'humorous' | 'inspirational';
  length: 'short' | 'medium' | 'long';
  includeHashtags: boolean;
  includeCallToAction: boolean;
  businessContext: BusinessContext;
}

export interface GeneratedContent {
  id: string;
  content: string;
  hashtags: string[];
  callToAction?: string;
  suggestedImage?: string;
  estimatedEngagement: number;
  aiConfidence: number;
  generationTime: number;
  createdAt: Date;
}

export interface SocialPostData {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube';
  content: string;
  media?: MediaFile[];
  hashtags: string[];
  scheduledTime?: Date;
  isPublished: boolean;
  engagement?: EngagementMetrics;
  businessContext: BusinessContext;
}

export interface MediaFile {
  id: string;
  type: 'image' | 'video' | 'gif';
  url: string;
  altText?: string;
  duration?: number; // for videos
}

export interface EngagementMetrics {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  reach: number;
  clicks: number;
}

export interface TopicAnalysisResult {
  id: string;
  topic: string;
  relevanceScore: number;
  trendingScore: number;
  competitionLevel: 'low' | 'medium' | 'high';
  suggestedKeywords: string[];
  relatedTopics: string[];
  estimatedReach: number;
  bestPostingTime: string[];
  platformRecommendations: PlatformRecommendation[];
}

export interface PlatformRecommendation {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube';
  score: number;
  reason: string;
  suggestedFormat: string;
}

export interface MarketingInsight {
  id: string;
  type: 'performance' | 'trend' | 'opportunity' | 'warning';
  title: string;
  description: string;
  data: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  suggestedActions: string[];
  createdAt: Date;
}

export interface AISettings {
  autoReplyEnabled: boolean;
  contentGenerationEnabled: boolean;
  socialPublishingEnabled: boolean;
  topicAnalysisEnabled: boolean;
  analyticsEnabled: boolean;
  
  // AI Model Settings
  modelProvider: 'openai' | 'anthropic' | 'google' | 'local';
  modelVersion: string;
  temperature: number; // 0-1
  maxTokens: number;
  
  // Business Intelligence
  industryFocus: string[];
  competitorAnalysis: boolean;
  sentimentAnalysis: boolean;
  
  // Automation Settings
  autoSchedulePosts: boolean;
  autoRespondToComments: boolean;
  autoOptimizeContent: boolean;
  
  // Privacy & Security
  dataRetentionDays: number;
  anonymizeData: boolean;
  encryptionEnabled: boolean;
}

export interface FloatingAssistantConfig {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size: 'small' | 'medium' | 'large';
  opacity: number; // 0-1
  alwaysOnTop: boolean;
  minimizeOnBlur: boolean;
  quickActions: QuickAction[];
  voiceControl: boolean;
  gestureControl: boolean;
}

export interface QuickAction {
  id: string;
  name: string;
  icon: string;
  action: 'auto-reply' | 'generate-content' | 'analyze-topic' | 'publish-post' | 'view-analytics';
  shortcut?: string;
  isEnabled: boolean;
}

export interface ScreenControlConfig {
  enableScreenCapture: boolean;
  enableScreenInteraction: boolean;
  enableAppSwitching: boolean;
  enableGestureRecognition: boolean;
  privacyMode: boolean;
  recordingQuality: 'low' | 'medium' | 'high';
}

export interface HardwareIntegration {
  camera: boolean;
  microphone: boolean;
  gps: boolean;
  accelerometer: boolean;
  gyroscope: boolean;
  biometrics: boolean;
  nfc: boolean;
}

export interface ThirdPartyAppConfig {
  appName: string;
  packageId: string;
  permissions: string[];
  integrationType: 'screen-control' | 'api-integration' | 'webhook';
  isEnabled: boolean;
  apiKey?: string;
  webhookUrl?: string;
}