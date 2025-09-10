import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiMarketingApi } from '../api/aiMarketingApi';
import type { AutoReplyConfig, ResponseTemplate } from '../types';

export function useAutoReply() {
  const queryClient = useQueryClient();
  const [selectedConfig, setSelectedConfig] = useState<AutoReplyConfig | null>(null);

  // Fetch auto reply configurations
  const {
    data: configs = [],
    isLoading: isLoadingConfigs,
    error: configsError
  } = useQuery({
    queryKey: ['auto-reply-configs'],
    queryFn: () => aiMarketingApi.getAutoReplyConfigs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create new auto reply config
  const createConfigMutation = useMutation({
    mutationFn: (config: Omit<AutoReplyConfig, 'id'>) => 
      aiMarketingApi.createAutoReplyConfig(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-reply-configs'] });
    },
  });

  // Update auto reply config
  const updateConfigMutation = useMutation({
    mutationFn: ({ id, config }: { id: string; config: Partial<AutoReplyConfig> }) =>
      aiMarketingApi.updateAutoReplyConfig(id, config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-reply-configs'] });
    },
  });

  // Delete auto reply config
  const deleteConfigMutation = useMutation({
    mutationFn: (id: string) => aiMarketingApi.deleteAutoReplyConfig(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-reply-configs'] });
      if (selectedConfig?.id === id) {
        setSelectedConfig(null);
      }
    },
  });

  // Generate auto reply
  const generateReplyMutation = useMutation({
    mutationFn: ({ message, businessContext }: { message: string; businessContext: any }) =>
      aiMarketingApi.generateAutoReply(message, businessContext),
  });

  // Enable/disable auto reply config
  const toggleConfigMutation = useMutation({
    mutationFn: ({ id, isEnabled }: { id: string; isEnabled: boolean }) =>
      aiMarketingApi.updateAutoReplyConfig(id, { isEnabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-reply-configs'] });
    },
  });

  // Helper functions
  const createConfig = useCallback((config: Omit<AutoReplyConfig, 'id'>) => {
    return createConfigMutation.mutateAsync(config);
  }, [createConfigMutation]);

  const updateConfig = useCallback((id: string, config: Partial<AutoReplyConfig>) => {
    return updateConfigMutation.mutateAsync({ id, config });
  }, [updateConfigMutation]);

  const deleteConfig = useCallback((id: string) => {
    return deleteConfigMutation.mutateAsync(id);
  }, [deleteConfigMutation]);

  const generateReply = useCallback((message: string, businessContext: any) => {
    return generateReplyMutation.mutateAsync({ message, businessContext });
  }, [generateReplyMutation]);

  const toggleConfig = useCallback((id: string, isEnabled: boolean) => {
    return toggleConfigMutation.mutateAsync({ id, isEnabled });
  }, [toggleConfigMutation]);

  const selectConfig = useCallback((config: AutoReplyConfig | null) => {
    setSelectedConfig(config);
  }, []);

  const getConfigById = useCallback((id: string) => {
    return configs.find(config => config.id === id);
  }, [configs]);

  const getActiveConfigs = useCallback(() => {
    return configs.filter(config => config.isEnabled);
  }, [configs]);

  const addResponseTemplate = useCallback(async (configId: string, template: Omit<ResponseTemplate, 'id'>) => {
    const config = getConfigById(configId);
    if (!config) throw new Error('Config not found');

    const newTemplate: ResponseTemplate = {
      ...template,
      id: `template_${Date.now()}`,
    };

    const updatedTemplates = [...config.responseTemplates, newTemplate];
    await updateConfig(configId, { responseTemplates: updatedTemplates });
  }, [getConfigById, updateConfig]);

  const updateResponseTemplate = useCallback(async (
    configId: string, 
    templateId: string, 
    updates: Partial<ResponseTemplate>
  ) => {
    const config = getConfigById(configId);
    if (!config) throw new Error('Config not found');

    const updatedTemplates = config.responseTemplates.map(template =>
      template.id === templateId ? { ...template, ...updates } : template
    );

    await updateConfig(configId, { responseTemplates: updatedTemplates });
  }, [getConfigById, updateConfig]);

  const deleteResponseTemplate = useCallback(async (configId: string, templateId: string) => {
    const config = getConfigById(configId);
    if (!config) throw new Error('Config not found');

    const updatedTemplates = config.responseTemplates.filter(template => template.id !== templateId);
    await updateConfig(configId, { responseTemplates: updatedTemplates });
  }, [getConfigById, updateConfig]);

  // Auto-reply logic for incoming messages
  const processIncomingMessage = useCallback(async (message: string, businessContext: any) => {
    const activeConfigs = getActiveConfigs();
    
    for (const config of activeConfigs) {
      const hasTriggerKeyword = config.triggerKeywords.some(keyword =>
        message.toLowerCase().includes(keyword.toLowerCase())
      );

      if (hasTriggerKeyword) {
        try {
          const reply = await generateReply(message, businessContext);
          
          // If auto-approve is enabled, return the reply immediately
          if (config.autoApprove) {
            return {
              reply,
              config,
              autoApproved: true
            };
          } else {
            // Return for manual approval
            return {
              reply,
              config,
              autoApproved: false,
              requiresApproval: true
            };
          }
        } catch (error) {
          console.error('Error generating auto-reply:', error);
        }
      }
    }

    return null; // No matching config found
  }, [getActiveConfigs, generateReply]);

  return {
    // Data
    configs,
    selectedConfig,
    isLoadingConfigs,
    configsError,
    
    // Mutations
    createConfigMutation,
    updateConfigMutation,
    deleteConfigMutation,
    generateReplyMutation,
    toggleConfigMutation,
    
    // Actions
    createConfig,
    updateConfig,
    deleteConfig,
    generateReply,
    toggleConfig,
    selectConfig,
    
    // Helpers
    getConfigById,
    getActiveConfigs,
    addResponseTemplate,
    updateResponseTemplate,
    deleteResponseTemplate,
    processIncomingMessage,
    
    // State
    isCreating: createConfigMutation.isPending,
    isUpdating: updateConfigMutation.isPending,
    isDeleting: deleteConfigMutation.isPending,
    isGenerating: generateReplyMutation.isPending,
    isToggling: toggleConfigMutation.isPending,
  };
}