import React, { useState, useEffect, useRef, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Paper, 
  IconButton, 
  Typography, 
  Chip, 
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  SmartToy as AIIcon,
  DragIndicator as DragIcon,
  Settings as SettingsIcon,
  AutoAwesome as AutoReplyIcon,
  Create as ContentIcon,
  Share as PublishIcon,
  TrendingUp as AnalyticsIcon,
  Visibility as ScreenControlIcon,
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  Expand as ExpandIcon
} from '@mui/icons-material';
import { AIAssistantConfig, ScreenControlAction, AIAnalysisResult } from '../../types';

interface AIAssistantOverlayProps {
  config: AIAssistantConfig;
  onConfigChange: (config: AIAssistantConfig) => void;
  onScreenControl: (action: ScreenControlAction) => void;
  onAutoReply: () => void;
  onContentGeneration: () => void;
  onSocialPublishing: () => void;
  onTopicAnalysis: () => void;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

const FloatingContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  zIndex: 9999,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[8],
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[12],
    transform: 'scale(1.02)',
  },
}));

const DragHandle = styled(Box)(({ theme }) => ({
  cursor: 'grab',
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:active': {
    cursor: 'grabbing',
  },
}));

const ActionButton = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(0.5),
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const StatusIndicator = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

export const AIAssistantOverlay: React.FC<AIAssistantOverlayProps> = ({
  config,
  onConfigChange,
  onScreenControl,
  onAutoReply,
  onContentGeneration,
  onSocialPublishing,
  onTopicAnalysis,
  isVisible = true,
  onToggleVisibility
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAction, setCurrentAction] = useState<string>('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Screen analysis and AI processing
  const [screenAnalysis, setScreenAnalysis] = useState<AIAnalysisResult | null>(null);

  // Handle dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!config.position.isDraggable) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - config.position.x,
      y: e.clientY - config.position.y,
    };
  }, [config.position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;

    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;

    onConfigChange({
      ...config,
      position: { ...config.position, x: newX, y: newY }
    });
  }, [isDragging, config, onConfigChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  // Screen control and AI analysis
  const handleScreenAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setCurrentAction('Đang phân tích màn hình...');
    
    try {
      // Simulate AI analysis of current screen
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysis: AIAnalysisResult = {
        confidence: 0.85,
        suggestedActions: [
          {
            type: 'click',
            coordinates: { x: 100, y: 200 },
            element: { text: 'Đăng bài' }
          },
          {
            type: 'type',
            text: 'Nội dung được tạo bởi AI',
            element: { className: 'content-input' }
          }
        ],
        insights: [
          'Phát hiện form đăng bài Facebook',
          'Có thể tự động điền nội dung',
          'Đề xuất hashtag phù hợp'
        ],
        recommendations: [
          'Sử dụng nội dung đã được tối ưu',
          'Đăng vào thời điểm tối ưu (19:00)',
          'Thêm hình ảnh để tăng engagement'
        ]
      };
      
      setScreenAnalysis(analysis);
    } catch (error) {
      console.error('Screen analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      setCurrentAction('');
    }
  }, []);

  // Auto-execute suggested actions
  const executeSuggestedAction = useCallback((action: ScreenControlAction) => {
    onScreenControl(action);
  }, [onScreenControl]);

  // Effects
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Auto-analysis when screen changes
  useEffect(() => {
    if (config.aiCapabilities.autoReply || config.aiCapabilities.contentGeneration) {
      const interval = setInterval(() => {
        if (!isAnalyzing) {
          handleScreenAnalysis();
        }
      }, 30000); // Analyze every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [config.aiCapabilities, isAnalyzing, handleScreenAnalysis]);

  if (!isVisible) {
    return (
      <Tooltip title="Mở trợ lý AI">
        <Fab
          color="primary"
          size="small"
          onClick={onToggleVisibility}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 9999,
          }}
        >
          <AIIcon />
        </Fab>
      </Tooltip>
    );
  }

  return (
    <FloatingContainer
      ref={containerRef}
      sx={{
        left: config.position.x,
        top: config.position.y,
        width: isMinimized ? 60 : config.size.width,
        height: isMinimized ? 60 : config.size.height,
        opacity: config.appearance.opacity,
        backgroundColor: config.appearance.theme === 'dark' ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      }}
    >
      {!isMinimized && (
        <>
          <DragHandle onMouseDown={handleMouseDown}>
            <Box display="flex" alignItems="center" gap={1}>
              <AIIcon color="primary" />
              <Typography variant="subtitle2" fontWeight="bold">
                AI Marketing Assistant
              </Typography>
              <StatusIndicator />
            </Box>
            <Box>
              <IconButton size="small" onClick={() => setIsMinimized(true)}>
                <MinimizeIcon />
              </IconButton>
              <IconButton size="small" onClick={() => setAnchorEl(containerRef.current)}>
                <SettingsIcon />
              </IconButton>
              <IconButton size="small" onClick={onToggleVisibility}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DragHandle>

          <Box p={2}>
            {isAnalyzing && (
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <CircularProgress size={16} />
                <Typography variant="caption" color="text.secondary">
                  {currentAction}
                </Typography>
              </Box>
            )}

            {screenAnalysis && (
              <Box mb={2}>
                <Typography variant="caption" color="success.main" fontWeight="bold">
                  Phân tích AI hoàn tất ({Math.round(screenAnalysis.confidence * 100)}%)
                </Typography>
                {screenAnalysis.recommendations.slice(0, 2).map((rec, index) => (
                  <Chip
                    key={index}
                    label={rec}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            )}

            <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
              <Tooltip title="Tự động trả lời">
                <ActionButton
                  size="small"
                  color="primary"
                  onClick={onAutoReply}
                  disabled={!config.aiCapabilities.autoReply}
                >
                  <AutoReplyIcon />
                </ActionButton>
              </Tooltip>

              <Tooltip title="Tạo nội dung">
                <ActionButton
                  size="small"
                  color="secondary"
                  onClick={onContentGeneration}
                  disabled={!config.aiCapabilities.contentGeneration}
                >
                  <ContentIcon />
                </ActionButton>
              </Tooltip>

              <Tooltip title="Đăng bài tự động">
                <ActionButton
                  size="small"
                  color="success"
                  onClick={onSocialPublishing}
                  disabled={!config.aiCapabilities.socialPublishing}
                >
                  <PublishIcon />
                </ActionButton>
              </Tooltip>

              <Tooltip title="Phân tích chủ đề">
                <ActionButton
                  size="small"
                  color="info"
                  onClick={onTopicAnalysis}
                  disabled={!config.aiCapabilities.topicAnalysis}
                >
                  <AnalyticsIcon />
                </ActionButton>
              </Tooltip>

              <Tooltip title="Điều khiển màn hình">
                <ActionButton
                  size="small"
                  color="warning"
                  onClick={handleScreenAnalysis}
                  disabled={!config.permissions.screenControl}
                >
                  <ScreenControlIcon />
                </ActionButton>
              </Tooltip>
            </Box>

            {screenAnalysis?.suggestedActions && (
              <Box mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Hành động được đề xuất:
                </Typography>
                {screenAnalysis.suggestedActions.slice(0, 2).map((action, index) => (
                  <Chip
                    key={index}
                    label={`${action.type}: ${action.element?.text || 'Thực hiện'}`}
                    size="small"
                    onClick={() => executeSuggestedAction(action)}
                    sx={{ mr: 0.5, mb: 0.5, cursor: 'pointer' }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </>
      )}

      {isMinimized && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          onMouseDown={handleMouseDown}
        >
          <IconButton onClick={() => setIsMinimized(false)}>
            <ExpandIcon />
          </IconButton>
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cài đặt</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <AnalyticsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Báo cáo hiệu suất</ListItemText>
        </MenuItem>
      </Menu>
    </FloatingContainer>
  );
};