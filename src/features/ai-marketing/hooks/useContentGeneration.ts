import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aiMarketingApi } from '../api/aiMarketingApi';
import type { ContentGenerationRequest, GeneratedContent } from '../types';

export function useContentGeneration() {
  const queryClient = useQueryClient();
  const [generationHistory, setGenerationHistory] = useState<GeneratedContent[]>([]);

  // Generate content
  const generateContentMutation = useMutation({
    mutationFn: (request: ContentGenerationRequest) => 
      aiMarketingApi.generateContent(request),
    onSuccess: (generatedContent) => {
      setGenerationHistory(prev => [generatedContent, ...prev]);
      queryClient.invalidateQueries({ queryKey: ['generated-content-history'] });
    },
  });

  // Get content history
  const {
    data: contentHistory = [],
    isLoading: isLoadingHistory,
    error: historyError
  } = useQuery({
    queryKey: ['generated-content-history'],
    queryFn: () => aiMarketingApi.getGeneratedContentHistory(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Optimize content
  const optimizeContentMutation = useMutation({
    mutationFn: ({ content, platform, targetAudience }: {
      content: string;
      platform: string;
      targetAudience: string;
    }) => aiMarketingApi.optimizeContent(content, platform, targetAudience),
  });

  // Batch generate content
  const batchGenerateMutation = useMutation({
    mutationFn: (requests: ContentGenerationRequest[]) => 
      aiMarketingApi.batchGenerateContent(requests),
    onSuccess: (generatedContents) => {
      setGenerationHistory(prev => [...generatedContents, ...prev]);
      queryClient.invalidateQueries({ queryKey: ['generated-content-history'] });
    },
  });

  // Helper functions
  const generateContent = useCallback((request: ContentGenerationRequest) => {
    return generateContentMutation.mutateAsync(request);
  }, [generateContentMutation]);

  const optimizeContent = useCallback((content: string, platform: string, targetAudience: string) => {
    return optimizeContentMutation.mutateAsync({ content, platform, targetAudience });
  }, [optimizeContentMutation]);

  const batchGenerate = useCallback((requests: ContentGenerationRequest[]) => {
    return batchGenerateMutation.mutateAsync(requests);
  }, [batchGenerateMutation]);

  const clearHistory = useCallback(() => {
    setGenerationHistory([]);
  }, []);

  const getContentById = useCallback((id: string) => {
    return [...generationHistory, ...contentHistory].find(content => content.id === id);
  }, [generationHistory, contentHistory]);

  const getContentByPlatform = useCallback((platform: string) => {
    return [...generationHistory, ...contentHistory].filter(content => 
      content.content.toLowerCase().includes(platform.toLowerCase())
    );
  }, [generationHistory, contentHistory]);

  const getHighConfidenceContent = useCallback((threshold = 0.8) => {
    return [...generationHistory, ...contentHistory].filter(content => 
      content.aiConfidence >= threshold
    );
  }, [generationHistory, contentHistory]);

  const getRecentContent = useCallback((hours = 24) => {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return [...generationHistory, ...contentHistory].filter(content => 
      new Date(content.createdAt) >= cutoffTime
    );
  }, [generationHistory, contentHistory]);

  // Content templates for quick generation
  const generateFromTemplate = useCallback((
    template: 'product-promotion' | 'company-update' | 'industry-insight' | 'customer-story' | 'tips-tricks',
    businessContext: any,
    customKeywords: string[] = []
  ) => {
    const templates = {
      'product-promotion': {
        contentType: 'post' as const,
        tone: 'professional' as const,
        length: 'medium' as const,
        includeCallToAction: true,
        includeHashtags: true,
      },
      'company-update': {
        contentType: 'post' as const,
        tone: 'professional' as const,
        length: 'short' as const,
        includeCallToAction: false,
        includeHashtags: true,
      },
      'industry-insight': {
        contentType: 'article' as const,
        tone: 'professional' as const,
        length: 'long' as const,
        includeCallToAction: true,
        includeHashtags: true,
      },
      'customer-story': {
        contentType: 'story' as const,
        tone: 'casual' as const,
        length: 'medium' as const,
        includeCallToAction: true,
        includeHashtags: true,
      },
      'tips-tricks': {
        contentType: 'post' as const,
        tone: 'friendly' as const,
        length: 'short' as const,
        includeCallToAction: false,
        includeHashtags: true,
      },
    };

    const baseRequest: ContentGenerationRequest = {
      ...templates[template],
      platform: 'facebook',
      keywords: customKeywords,
      targetAudience: businessContext.targetAudience?.[0] || 'general',
      businessContext,
    };

    return generateContent(baseRequest);
  }, [generateContent]);

  // Multi-platform content generation
  const generateForMultiplePlatforms = useCallback((
    baseRequest: Omit<ContentGenerationRequest, 'platform'>,
    platforms: string[]
  ) => {
    const requests = platforms.map(platform => ({
      ...baseRequest,
      platform: platform as ContentGenerationRequest['platform'],
    }));

    return batchGenerate(requests);
  }, [batchGenerate]);

  return {
    // Data
    contentHistory,
    generationHistory,
    isLoadingHistory,
    historyError,
    
    // Mutations
    generateContentMutation,
    optimizeContentMutation,
    batchGenerateMutation,
    
    // Actions
    generateContent,
    optimizeContent,
    batchGenerate,
    clearHistory,
    
    // Helpers
    getContentById,
    getContentByPlatform,
    getHighConfidenceContent,
    getRecentContent,
    generateFromTemplate,
    generateForMultiplePlatforms,
    
    // State
    isGenerating: generateContentMutation.isPending,
    isOptimizing: optimizeContentMutation.isPending,
    isBatchGenerating: batchGenerateMutation.isPending,
  };
}