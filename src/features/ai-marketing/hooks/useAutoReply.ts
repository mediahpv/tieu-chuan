import { useState, useCallback } from 'react';
import { AutoReplyConfig } from '../types';

interface UseAutoReplyReturn {
  autoReplyConfigs: AutoReplyConfig[];
  isProcessing: boolean;
  createAutoReply: (config: Omit<AutoReplyConfig, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateAutoReply: (id: string, config: Partial<AutoReplyConfig>) => Promise<void>;
  deleteAutoReply: (id: string) => Promise<void>;
  toggleAutoReply: (id: string) => Promise<void>;
  processMessage: (message: string, platform: string) => Promise<string | null>;
}

export const useAutoReply = (): UseAutoReplyReturn => {
  const [autoReplyConfigs, setAutoReplyConfigs] = useState<AutoReplyConfig[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const createAutoReply = useCallback(async (config: Omit<AutoReplyConfig, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsProcessing(true);
    try {
      const newConfig: AutoReplyConfig = {
        ...config,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setAutoReplyConfigs(prev => [...prev, newConfig]);
      
      // TODO: Save to backend
      console.log('Created auto reply config:', newConfig);
    } catch (error) {
      console.error('Failed to create auto reply config:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const updateAutoReply = useCallback(async (id: string, config: Partial<AutoReplyConfig>) => {
    setIsProcessing(true);
    try {
      setAutoReplyConfigs(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item, ...config, updatedAt: new Date() }
            : item
        )
      );
      
      // TODO: Update in backend
      console.log('Updated auto reply config:', id, config);
    } catch (error) {
      console.error('Failed to update auto reply config:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const deleteAutoReply = useCallback(async (id: string) => {
    setIsProcessing(true);
    try {
      setAutoReplyConfigs(prev => prev.filter(item => item.id !== id));
      
      // TODO: Delete from backend
      console.log('Deleted auto reply config:', id);
    } catch (error) {
      console.error('Failed to delete auto reply config:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const toggleAutoReply = useCallback(async (id: string) => {
    setIsProcessing(true);
    try {
      setAutoReplyConfigs(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item, isActive: !item.isActive, updatedAt: new Date() }
            : item
        )
      );
      
      // TODO: Update in backend
      console.log('Toggled auto reply config:', id);
    } catch (error) {
      console.error('Failed to toggle auto reply config:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const processMessage = useCallback(async (message: string, platform: string): Promise<string | null> => {
    setIsProcessing(true);
    try {
      // Tìm config phù hợp
      const matchingConfig = autoReplyConfigs.find(config => 
        config.platform === platform && 
        config.isActive &&
        config.triggerKeywords.some(keyword => 
          message.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      if (!matchingConfig) {
        return null;
      }

      // AI enhancement nếu được bật
      if (matchingConfig.aiEnhancement) {
        // TODO: Gọi AI API để cải thiện response
        const enhancedResponse = await enhanceResponseWithAI(
          matchingConfig.responseTemplate,
          message,
          matchingConfig.personality,
          matchingConfig.businessContext
        );
        return enhancedResponse;
      }

      return matchingConfig.responseTemplate;
    } catch (error) {
      console.error('Failed to process message:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [autoReplyConfigs]);

  // AI enhancement function
  const enhanceResponseWithAI = async (
    template: string,
    originalMessage: string,
    personality: string,
    businessContext: string
  ): Promise<string> => {
    // TODO: Implement AI enhancement
    // This would call an AI service to improve the response
    return template;
  };

  return {
    autoReplyConfigs,
    isProcessing,
    createAutoReply,
    updateAutoReply,
    deleteAutoReply,
    toggleAutoReply,
    processMessage,
  };
};