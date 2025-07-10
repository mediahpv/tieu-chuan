// AI Marketing Store using Zustand
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { 
  AutoReplyConfig, 
  ContentGenerationRequest, 
  GeneratedContent,
  SocialPostData,
  TopicAnalysisResult,
  MarketingMetrics,
  AIAssistantConfig,
  ScreenControlAction,
  AIAnalysisResult
} from '../types';
import { aiMarketingApi } from '../api/aiMarketingApi';

interface AIMarketingState {
  // State
  autoReplyConfigs: AutoReplyConfig[];
  generatedContents: GeneratedContent[];
  socialPosts: SocialPostData[];
  topicAnalysisResults: TopicAnalysisResult[];
  marketingMetrics: MarketingMetrics | null;
  assistantConfig: AIAssistantConfig | null;
  screenAnalysis: AIAnalysisResult | null;
  
  // Loading states
  isLoading: boolean;
  isGenerating: boolean;
  isPublishing: boolean;
  isAnalyzing: boolean;
  
  // Actions
  // Auto Reply
  fetchAutoReplyConfigs: () => Promise<void>;
  createAutoReplyConfig: (config: Omit<AutoReplyConfig, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateAutoReplyConfig: (id: string, config: Partial<AutoReplyConfig>) => Promise<void>;
  deleteAutoReplyConfig: (id: string) => Promise<void>;
  toggleAutoReply: (id: string) => Promise<void>;
  
  // Content Generation
  generateContent: (request: ContentGenerationRequest) => Promise<GeneratedContent>;
  saveContent: (content: GeneratedContent) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  getContentVariations: (contentId: string) => GeneratedContent[];
  
  // Social Publishing
  publishPost: (post: Omit<SocialPostData, 'id' | 'status'>) => Promise<SocialPostData>;
  schedulePost: (post: Omit<SocialPostData, 'id' | 'status'>, scheduledTime: Date) => Promise<SocialPostData>;
  updatePost: (id: string, updates: Partial<SocialPostData>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getScheduledPosts: () => SocialPostData[];
  getPublishedPosts: () => SocialPostData[];
  
  // Topic Analysis
  analyzeTopics: (businessType: string, keywords: string[]) => Promise<TopicAnalysisResult>;
  getTrendingTopics: (industry: string) => Promise<string[]>;
  analyzeCompetitors: (competitorNames: string[]) => Promise<any[]>;
  getAudienceInsights: (targetAudience: string[]) => Promise<any>;
  saveAnalysis: (result: TopicAnalysisResult) => Promise<void>;
  
  // Marketing Analytics
  fetchMarketingMetrics: (dateRange: { start: Date; end: Date }) => Promise<MarketingMetrics>;
  getPlatformPerformance: (platform: string) => Promise<any>;
  getTopPerformingContent: (limit?: number) => Promise<any[]>;
  getAudienceGrowth: (period: 'week' | 'month' | 'quarter') => Promise<any>;
  exportReport: (format: 'pdf' | 'excel' | 'csv') => Promise<void>;
  
  // Assistant Configuration
  saveAssistantConfig: (config: AIAssistantConfig) => Promise<void>;
  loadAssistantConfig: () => Promise<void>;
  updateAssistantConfig: (updates: Partial<AIAssistantConfig>) => void;
  
  // Screen Control
  analyzeScreen: (screenshot?: string) => Promise<AIAnalysisResult>;
  executeScreenAction: (action: ScreenControlAction) => Promise<void>;
  
  // Utility
  reset: () => void;
}

// Default assistant configuration
const defaultAssistantConfig: AIAssistantConfig = {
  position: {
    x: window.innerWidth - 350,
    y: 100,
    isDraggable: true,
  },
  size: {
    width: 320,
    height: 400,
    isResizable: true,
  },
  appearance: {
    theme: 'auto',
    opacity: 0.9,
    blur: false,
    alwaysOnTop: true,
  },
  permissions: {
    screenControl: true,
    appAccess: true,
    notificationAccess: true,
    clipboardAccess: true,
  },
  aiCapabilities: {
    autoReply: true,
    contentGeneration: true,
    socialPublishing: true,
    topicAnalysis: true,
    smartScheduling: true,
  },
  businessContext: {
    industry: 'technology',
    targetAudience: ['entrepreneurs', 'business owners'],
    brandVoice: 'professional',
    goals: ['increase engagement', 'generate leads'],
  },
};

export const aiMarketingStore = create<AIMarketingState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        autoReplyConfigs: [],
        generatedContents: [],
        socialPosts: [],
        topicAnalysisResults: [],
        marketingMetrics: null,
        assistantConfig: defaultAssistantConfig,
        screenAnalysis: null,
        
        isLoading: false,
        isGenerating: false,
        isPublishing: false,
        isAnalyzing: false,
        
        // Auto Reply Actions
        fetchAutoReplyConfigs: async () => {
          set({ isLoading: true });
          try {
            const configs = await aiMarketingApi.getAutoReplyConfigs();
            set({ autoReplyConfigs: configs });
          } catch (error) {
            console.error('Failed to fetch auto reply configs:', error);
          } finally {
            set({ isLoading: false });
          }
        },
        
        createAutoReplyConfig: async (config) => {
          set({ isLoading: true });
          try {
            const newConfig = await aiMarketingApi.createAutoReplyConfig(config);
            set(state => ({ 
              autoReplyConfigs: [...state.autoReplyConfigs, newConfig] 
            }));
          } catch (error) {
            console.error('Failed to create auto reply config:', error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        
        updateAutoReplyConfig: async (id, config) => {
          set({ isLoading: true });
          try {
            const updatedConfig = await aiMarketingApi.updateAutoReplyConfig(id, config);
            set(state => ({
              autoReplyConfigs: state.autoReplyConfigs.map(item =>
                item.id === id ? updatedConfig : item
              )
            }));
          } catch (error) {
            console.error('Failed to update auto reply config:', error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        
        deleteAutoReplyConfig: async (id) => {
          set({ isLoading: true });
          try {
            await aiMarketingApi.deleteAutoReplyConfig(id);
            set(state => ({
              autoReplyConfigs: state.autoReplyConfigs.filter(item => item.id !== id)
            }));
          } catch (error) {
            console.error('Failed to delete auto reply config:', error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        
        toggleAutoReply: async (id) => {
          const config = get().autoReplyConfigs.find(item => item.id === id);
          if (config) {
            await get().updateAutoReplyConfig(id, { isActive: !config.isActive });
          }
        },
        
        // Content Generation Actions
        generateContent: async (request) => {
          set({ isGenerating: true });
          try {
            const content = await aiMarketingApi.generateContent(request);
            set(state => ({
              generatedContents: [...state.generatedContents, content]
            }));
            return content;
          } catch (error) {
            console.error('Failed to generate content:', error);
            throw error;
          } finally {
            set({ isGenerating: false });
          }
        },
        
        saveContent: async (content) => {
          set(state => ({
            generatedContents: state.generatedContents.map(item =>
              item.id === content.id ? content : item
            )
          }));
        },
        
        deleteContent: async (id) => {
          set(state => ({
            generatedContents: state.generatedContents.filter(item => item.id !== id)
          }));
        },
        
        getContentVariations: (contentId) => {
          const content = get().generatedContents.find(item => item.id === contentId);
          return content?.variations || [];
        },
        
        // Social Publishing Actions
        publishPost: async (post) => {
          set({ isPublishing: true });
          try {
            const publishedPost = await aiMarketingApi.publishToSocialMedia(post);
            set(state => ({
              socialPosts: [...state.socialPosts, publishedPost]
            }));
            return publishedPost;
          } catch (error) {
            console.error('Failed to publish post:', error);
            throw error;
          } finally {
            set({ isPublishing: false });
          }
        },
        
        schedulePost: async (post, scheduledTime) => {
          set({ isPublishing: true });
          try {
            const scheduledPost = await aiMarketingApi.scheduleSocialPost(post, scheduledTime);
            set(state => ({
              socialPosts: [...state.socialPosts, scheduledPost]
            }));
            return scheduledPost;
          } catch (error) {
            console.error('Failed to schedule post:', error);
            throw error;
          } finally {
            set({ isPublishing: false });
          }
        },
        
        updatePost: async (id, updates) => {
          set(state => ({
            socialPosts: state.socialPosts.map(post =>
              post.id === id ? { ...post, ...updates } : post
            )
          }));
        },
        
        deletePost: async (id) => {
          set(state => ({
            socialPosts: state.socialPosts.filter(post => post.id !== id)
          }));
        },
        
        getScheduledPosts: () => {
          return get().socialPosts.filter(post => post.status === 'scheduled');
        },
        
        getPublishedPosts: () => {
          return get().socialPosts.filter(post => post.status === 'published');
        },
        
        // Topic Analysis Actions
        analyzeTopics: async (businessType, keywords) => {
          set({ isAnalyzing: true });
          try {
            const result = await aiMarketingApi.analyzeTopics(businessType, keywords);
            set(state => ({
              topicAnalysisResults: [...state.topicAnalysisResults, result]
            }));
            return result;
          } catch (error) {
            console.error('Failed to analyze topics:', error);
            throw error;
          } finally {
            set({ isAnalyzing: false });
          }
        },
        
        getTrendingTopics: async (industry) => {
          // TODO: Implement trending topics API
          return [`${industry} trends`, `${industry} tips`];
        },
        
        analyzeCompetitors: async (competitorNames) => {
          // TODO: Implement competitor analysis API
          return competitorNames.map(name => ({ name, engagement: Math.random() * 1000 }));
        },
        
        getAudienceInsights: async (targetAudience) => {
          // TODO: Implement audience insights API
          return {
            interests: targetAudience,
            activeHours: [9, 12, 19, 21],
            demographics: { ageRange: '25-45', location: 'Vietnam' }
          };
        },
        
        saveAnalysis: async (result) => {
          set(state => ({
            topicAnalysisResults: state.topicAnalysisResults.map(item =>
              item === result ? { ...item, savedAt: new Date() } : item
            )
          }));
        },
        
        // Marketing Analytics Actions
        fetchMarketingMetrics: async (dateRange) => {
          set({ isLoading: true });
          try {
            const metrics = await aiMarketingApi.getMarketingMetrics(dateRange);
            set({ marketingMetrics: metrics });
            return metrics;
          } catch (error) {
            console.error('Failed to fetch marketing metrics:', error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },
        
        getPlatformPerformance: async (platform) => {
          // TODO: Implement platform performance API
          return {
            posts: Math.floor(Math.random() * 100),
            engagement: Math.floor(Math.random() * 20000),
            reach: Math.floor(Math.random() * 100000)
          };
        },
        
        getTopPerformingContent: async (limit = 10) => {
          // TODO: Implement top performing content API
          return Array.from({ length: limit }, (_, i) => ({
            id: (i + 1).toString(),
            content: `Top content ${i + 1}`,
            engagement: Math.floor(Math.random() * 10000)
          }));
        },
        
        getAudienceGrowth: async (period) => {
          // TODO: Implement audience growth API
          return {
            current: Math.floor(Math.random() * 50000),
            previous: Math.floor(Math.random() * 40000),
            growthRate: Math.random() * 50
          };
        },
        
        exportReport: async (format) => {
          // TODO: Implement report export
          console.log(`Exporting report as ${format}`);
        },
        
        // Assistant Configuration Actions
        saveAssistantConfig: async (config) => {
          try {
            await aiMarketingApi.saveAssistantConfig(config);
            set({ assistantConfig: config });
          } catch (error) {
            console.error('Failed to save assistant config:', error);
            throw error;
          }
        },
        
        loadAssistantConfig: async () => {
          try {
            const config = await aiMarketingApi.getAssistantConfig();
            set({ assistantConfig: config });
          } catch (error) {
            console.error('Failed to load assistant config:', error);
            // Use default config if loading fails
            set({ assistantConfig: defaultAssistantConfig });
          }
        },
        
        updateAssistantConfig: (updates) => {
          const currentConfig = get().assistantConfig;
          if (currentConfig) {
            set({ assistantConfig: { ...currentConfig, ...updates } });
          }
        },
        
        // Screen Control Actions
        analyzeScreen: async (screenshot) => {
          set({ isAnalyzing: true });
          try {
            const analysis = await aiMarketingApi.analyzeScreen(screenshot);
            set({ screenAnalysis: analysis });
            return analysis;
          } catch (error) {
            console.error('Failed to analyze screen:', error);
            throw error;
          } finally {
            set({ isAnalyzing: false });
          }
        },
        
        executeScreenAction: async (action) => {
          // TODO: Implement screen control execution
          console.log('Executing screen action:', action);
        },
        
        // Utility Actions
        reset: () => {
          set({
            autoReplyConfigs: [],
            generatedContents: [],
            socialPosts: [],
            topicAnalysisResults: [],
            marketingMetrics: null,
            screenAnalysis: null,
            isLoading: false,
            isGenerating: false,
            isPublishing: false,
            isAnalyzing: false,
          });
        },
      }),
      {
        name: 'ai-marketing-store',
        partialize: (state) => ({
          assistantConfig: state.assistantConfig,
          autoReplyConfigs: state.autoReplyConfigs,
          generatedContents: state.generatedContents,
          socialPosts: state.socialPosts,
        }),
      }
    ),
    {
      name: 'ai-marketing-store',
    }
  )
);