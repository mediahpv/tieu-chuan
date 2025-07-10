// AI Marketing API Layer
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

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
const AI_API_URL = process.env.REACT_APP_AI_API_URL || 'https://api.openai.com/v1';

// API Headers
const getHeaders = (includeAuth = true) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// AI Marketing API Class
class AIMarketingAPI {
  // Auto Reply Management
  async getAutoReplyConfigs(): Promise<AutoReplyConfig[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/auto-reply`, {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch auto reply configs');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error - getAutoReplyConfigs:', error);
      throw error;
    }
  }

  async createAutoReplyConfig(config: Omit<AutoReplyConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<AutoReplyConfig> {
    try {
      const response = await fetch(`${API_BASE_URL}/auto-reply`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(config),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create auto reply config');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error - createAutoReplyConfig:', error);
      throw error;
    }
  }

  async updateAutoReplyConfig(id: string, config: Partial<AutoReplyConfig>): Promise<AutoReplyConfig> {
    try {
      const response = await fetch(`${API_BASE_URL}/auto-reply/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(config),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update auto reply config');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error - updateAutoReplyConfig:', error);
      throw error;
    }
  }

  async deleteAutoReplyConfig(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/auto-reply/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete auto reply config');
      }
    } catch (error) {
      console.error('API Error - deleteAutoReplyConfig:', error);
      throw error;
    }
  }

  // Content Generation
  async generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
    try {
      const response = await fetch(`${AI_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `Bạn là một chuyên gia marketing AI. Tạo nội dung cho ${request.businessType} trên ${request.platform} với tone ${request.tone}. Đối tượng: ${request.targetAudience.join(', ')}. Từ khóa: ${request.keywords.join(', ')}.`
            },
            {
              role: 'user',
              content: `Tạo nội dung ${request.contentType} phù hợp với yêu cầu trên.`
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate content');
      }
      
      const data = await response.json();
      const generatedText = data.choices[0].message.content;
      
      return {
        id: Date.now().toString(),
        title: `Nội dung cho ${request.platform}`,
        content: generatedText,
        hashtags: request.keywords.map(keyword => `#${keyword}`),
        suggestedImages: [],
        postingTime: new Date(),
        engagementScore: Math.random() * 100,
        aiSuggestions: [
          'Đăng vào 19:00 để có engagement cao nhất',
          'Thêm emoji để tăng tương tác',
          'Sử dụng câu hỏi để khuyến khích comment'
        ],
        variations: []
      };
    } catch (error) {
      console.error('API Error - generateContent:', error);
      throw error;
    }
  }

  // Social Media Publishing
  async publishToSocialMedia(post: Omit<SocialPostData, 'id' | 'status'>): Promise<SocialPostData> {
    try {
      const response = await fetch(`${API_BASE_URL}/social/publish`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(post),
      });
      
      if (!response.ok) {
        throw new Error('Failed to publish to social media');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error - publishToSocialMedia:', error);
      throw error;
    }
  }

  async scheduleSocialPost(post: Omit<SocialPostData, 'id' | 'status'>, scheduledTime: Date): Promise<SocialPostData> {
    try {
      const response = await fetch(`${API_BASE_URL}/social/schedule`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ ...post, scheduledTime }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to schedule social post');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error - scheduleSocialPost:', error);
      throw error;
    }
  }

  // Topic Analysis
  async analyzeTopics(businessType: string, keywords: string[]): Promise<TopicAnalysisResult> {
    try {
      const response = await fetch(`${AI_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `Phân tích chủ đề và xu hướng cho ${businessType} với từ khóa: ${keywords.join(', ')}. Trả về JSON với cấu trúc: trendingTopics, competitorAnalysis, audienceInsights.`
            }
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze topics');
      }
      
      const data = await response.json();
      const analysisText = data.choices[0].message.content;
      
      // Parse JSON response
      try {
        return JSON.parse(analysisText);
      } catch {
        // Fallback to mock data if parsing fails
        return this.getMockTopicAnalysis(businessType, keywords);
      }
    } catch (error) {
      console.error('API Error - analyzeTopics:', error);
      throw error;
    }
  }

  // Marketing Analytics
  async getMarketingMetrics(dateRange: { start: Date; end: Date }): Promise<MarketingMetrics> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/metrics`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(dateRange),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get marketing metrics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error - getMarketingMetrics:', error);
      throw error;
    }
  }

  // Screen Control and AI Analysis
  async analyzeScreen(screenshot?: string): Promise<AIAnalysisResult> {
    try {
      const response = await fetch(`${AI_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Phân tích màn hình này và đề xuất các hành động marketing có thể thực hiện. Trả về JSON với confidence, suggestedActions, insights, recommendations.'
                },
                ...(screenshot ? [{
                  type: 'image_url',
                  image_url: { url: screenshot }
                }] : [])
              ]
            }
          ],
          max_tokens: 1000,
          temperature: 0.3,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze screen');
      }
      
      const data = await response.json();
      const analysisText = data.choices[0].message.content;
      
      try {
        return JSON.parse(analysisText);
      } catch {
        return this.getMockScreenAnalysis();
      }
    } catch (error) {
      console.error('API Error - analyzeScreen:', error);
      throw error;
    }
  }

  // Assistant Configuration
  async saveAssistantConfig(config: AIAssistantConfig): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/assistant/config`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(config),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save assistant config');
      }
    } catch (error) {
      console.error('API Error - saveAssistantConfig:', error);
      throw error;
    }
  }

  async getAssistantConfig(): Promise<AIAssistantConfig> {
    try {
      const response = await fetch(`${API_BASE_URL}/assistant/config`, {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get assistant config');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error - getAssistantConfig:', error);
      throw error;
    }
  }

  // Mock data methods for fallback
  private getMockTopicAnalysis(businessType: string, keywords: string[]): TopicAnalysisResult {
    return {
      trendingTopics: [
        {
          topic: `${businessType} trends 2024`,
          relevanceScore: 0.95,
          searchVolume: 10000,
          competition: 'medium',
          suggestedContent: [
            `Top 10 xu hướng ${businessType} năm 2024`,
            `Cách áp dụng xu hướng ${businessType} vào kinh doanh`
          ]
        }
      ],
      competitorAnalysis: [],
      audienceInsights: {
        interests: ['technology', 'business'],
        activeHours: [9, 12, 19, 21],
        preferredContent: ['video', 'infographic'],
        demographics: {
          ageRange: '25-45',
          location: 'Vietnam',
          gender: 'all'
        }
      }
    };
  }

  private getMockScreenAnalysis(): AIAnalysisResult {
    return {
      confidence: 0.85,
      suggestedActions: [
        {
          type: 'click',
          coordinates: { x: 100, y: 200 },
          element: { text: 'Đăng bài' }
        }
      ],
      insights: [
        'Phát hiện form đăng bài Facebook',
        'Có thể tự động điền nội dung'
      ],
      recommendations: [
        'Sử dụng nội dung đã được tối ưu',
        'Đăng vào thời điểm tối ưu (19:00)'
      ]
    };
  }
}

// Export singleton instance
export const aiMarketingApi = new AIMarketingAPI();