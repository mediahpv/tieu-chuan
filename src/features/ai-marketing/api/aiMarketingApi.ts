import { apiClient } from '@/shared/api';
import type {
  AutoReplyConfig,
  ContentGenerationRequest,
  GeneratedContent,
  SocialPostData,
  TopicAnalysisResult,
  MarketingInsight,
  AISettings,
  FloatingAssistantConfig,
  ScreenControlConfig,
  HardwareIntegration,
  ThirdPartyAppConfig
} from '../types';

class AIMarketingApi {
  private baseUrl = '/ai-marketing';

  // Auto Reply Management
  async getAutoReplyConfigs(): Promise<AutoReplyConfig[]> {
    return apiClient.get(`${this.baseUrl}/auto-reply/configs`);
  }

  async createAutoReplyConfig(config: Omit<AutoReplyConfig, 'id'>): Promise<AutoReplyConfig> {
    return apiClient.post(`${this.baseUrl}/auto-reply/configs`, config);
  }

  async updateAutoReplyConfig(id: string, config: Partial<AutoReplyConfig>): Promise<AutoReplyConfig> {
    return apiClient.put(`${this.baseUrl}/auto-reply/configs/${id}`, config);
  }

  async deleteAutoReplyConfig(id: string): Promise<void> {
    return apiClient.delete(`${this.baseUrl}/auto-reply/configs/${id}`);
  }

  async generateAutoReply(message: string, businessContext: any): Promise<string> {
    return apiClient.post(`${this.baseUrl}/auto-reply/generate`, {
      message,
      businessContext
    });
  }

  // Content Generation
  async generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
    return apiClient.post(`${this.baseUrl}/content/generate`, request);
  }

  async getGeneratedContentHistory(limit = 20, offset = 0): Promise<GeneratedContent[]> {
    return apiClient.get(`${this.baseUrl}/content/history`, {
      params: { limit, offset }
    });
  }

  async optimizeContent(content: string, platform: string, targetAudience: string): Promise<string> {
    return apiClient.post(`${this.baseUrl}/content/optimize`, {
      content,
      platform,
      targetAudience
    });
  }

  // Social Media Publishing
  async publishToSocialMedia(post: Omit<SocialPostData, 'id'>): Promise<SocialPostData> {
    return apiClient.post(`${this.baseUrl}/social/publish`, post);
  }

  async schedulePost(post: Omit<SocialPostData, 'id'>, scheduledTime: Date): Promise<SocialPostData> {
    return apiClient.post(`${this.baseUrl}/social/schedule`, {
      ...post,
      scheduledTime
    });
  }

  async getScheduledPosts(): Promise<SocialPostData[]> {
    return apiClient.get(`${this.baseUrl}/social/scheduled`);
  }

  async updateScheduledPost(id: string, updates: Partial<SocialPostData>): Promise<SocialPostData> {
    return apiClient.put(`${this.baseUrl}/social/scheduled/${id}`, updates);
  }

  async deleteScheduledPost(id: string): Promise<void> {
    return apiClient.delete(`${this.baseUrl}/social/scheduled/${id}`);
  }

  async getPublishedPosts(platform?: string, limit = 20): Promise<SocialPostData[]> {
    return apiClient.get(`${this.baseUrl}/social/published`, {
      params: { platform, limit }
    });
  }

  // Topic Analysis
  async analyzeTopic(topic: string, businessContext: any): Promise<TopicAnalysisResult> {
    return apiClient.post(`${this.baseUrl}/topics/analyze`, {
      topic,
      businessContext
    });
  }

  async getTrendingTopics(industry: string, limit = 10): Promise<string[]> {
    return apiClient.get(`${this.baseUrl}/topics/trending`, {
      params: { industry, limit }
    });
  }

  async getTopicSuggestions(keywords: string[], businessContext: any): Promise<string[]> {
    return apiClient.post(`${this.baseUrl}/topics/suggestions`, {
      keywords,
      businessContext
    });
  }

  // Marketing Analytics & Insights
  async getMarketingInsights(days = 30): Promise<MarketingInsight[]> {
    return apiClient.get(`${this.baseUrl}/analytics/insights`, {
      params: { days }
    });
  }

  async getPerformanceMetrics(platform: string, dateRange: { start: Date; end: Date }): Promise<any> {
    return apiClient.get(`${this.baseUrl}/analytics/performance`, {
      params: { platform, ...dateRange }
    });
  }

  async getCompetitorAnalysis(competitors: string[]): Promise<any> {
    return apiClient.post(`${this.baseUrl}/analytics/competitors`, { competitors });
  }

  async getAudienceInsights(): Promise<any> {
    return apiClient.get(`${this.baseUrl}/analytics/audience`);
  }

  // AI Settings
  async getAISettings(): Promise<AISettings> {
    return apiClient.get(`${this.baseUrl}/settings/ai`);
  }

  async updateAISettings(settings: Partial<AISettings>): Promise<AISettings> {
    return apiClient.put(`${this.baseUrl}/settings/ai`, settings);
  }

  // Floating Assistant Configuration
  async getFloatingAssistantConfig(): Promise<FloatingAssistantConfig> {
    return apiClient.get(`${this.baseUrl}/assistant/config`);
  }

  async updateFloatingAssistantConfig(config: Partial<FloatingAssistantConfig>): Promise<FloatingAssistantConfig> {
    return apiClient.put(`${this.baseUrl}/assistant/config`, config);
  }

  // Screen Control & Hardware Integration
  async getScreenControlConfig(): Promise<ScreenControlConfig> {
    return apiClient.get(`${this.baseUrl}/screen-control/config`);
  }

  async updateScreenControlConfig(config: Partial<ScreenControlConfig>): Promise<ScreenControlConfig> {
    return apiClient.put(`${this.baseUrl}/screen-control/config`, config);
  }

  async getHardwareIntegration(): Promise<HardwareIntegration> {
    return apiClient.get(`${this.baseUrl}/hardware/integration`);
  }

  async updateHardwareIntegration(integration: Partial<HardwareIntegration>): Promise<HardwareIntegration> {
    return apiClient.put(`${this.baseUrl}/hardware/integration`, integration);
  }

  // Third-party App Integration
  async getThirdPartyApps(): Promise<ThirdPartyAppConfig[]> {
    return apiClient.get(`${this.baseUrl}/third-party/apps`);
  }

  async addThirdPartyApp(app: Omit<ThirdPartyAppConfig, 'isEnabled'>): Promise<ThirdPartyAppConfig> {
    return apiClient.post(`${this.baseUrl}/third-party/apps`, app);
  }

  async updateThirdPartyApp(packageId: string, updates: Partial<ThirdPartyAppConfig>): Promise<ThirdPartyAppConfig> {
    return apiClient.put(`${this.baseUrl}/third-party/apps/${packageId}`, updates);
  }

  async removeThirdPartyApp(packageId: string): Promise<void> {
    return apiClient.delete(`${this.baseUrl}/third-party/apps/${packageId}`);
  }

  // Real-time Communication
  async connectToRealTimeUpdates(): Promise<WebSocket> {
    const wsUrl = `${apiClient.defaults.baseURL?.replace('http', 'ws')}${this.baseUrl}/realtime`;
    return new WebSocket(wsUrl);
  }

  // Batch Operations
  async batchGenerateContent(requests: ContentGenerationRequest[]): Promise<GeneratedContent[]> {
    return apiClient.post(`${this.baseUrl}/content/batch-generate`, { requests });
  }

  async batchPublishPosts(posts: Omit<SocialPostData, 'id'>[]): Promise<SocialPostData[]> {
    return apiClient.post(`${this.baseUrl}/social/batch-publish`, { posts });
  }

  // AI Model Management
  async getAvailableModels(): Promise<Array<{ provider: string; models: string[] }>> {
    return apiClient.get(`${this.baseUrl}/models/available`);
  }

  async testModelConnection(provider: string, model: string): Promise<boolean> {
    return apiClient.post(`${this.baseUrl}/models/test`, { provider, model });
  }

  // Data Export/Import
  async exportData(format: 'json' | 'csv' | 'xlsx'): Promise<Blob> {
    return apiClient.get(`${this.baseUrl}/data/export`, {
      params: { format },
      responseType: 'blob'
    });
  }

  async importData(data: FormData): Promise<void> {
    return apiClient.post(`${this.baseUrl}/data/import`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
}

export const aiMarketingApi = new AIMarketingApi();