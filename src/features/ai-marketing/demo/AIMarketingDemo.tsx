import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  SmartToy as AIIcon,
  AutoAwesome as AutoReplyIcon,
  Create as ContentIcon,
  Share as PublishIcon,
  TrendingUp as AnalyticsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

import { 
  AIAssistantOverlay,
  useAutoReply,
  useContentGeneration,
  useSocialPublishing,
  useTopicAnalysis,
  useMarketingAnalytics,
  aiMarketingStore,
  AIAssistantConfig,
  ContentGenerationRequest
} from '../index';

export const AIMarketingDemo: React.FC = () => {
  const [isAssistantVisible, setIsAssistantVisible] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('overview');

  // Hooks
  const autoReply = useAutoReply();
  const contentGeneration = useContentGeneration();
  const socialPublishing = useSocialPublishing();
  const topicAnalysis = useTopicAnalysis();
  const analytics = useMarketingAnalytics();

  // Store state
  const assistantConfig = aiMarketingStore(state => state.assistantConfig);
  const isLoading = aiMarketingStore(state => state.isLoading);

  // Demo data
  const [demoContent, setDemoContent] = useState<ContentGenerationRequest>({
    businessType: 'Công nghệ',
    targetAudience: ['Doanh nhân', 'Startup'],
    contentType: 'post',
    platform: 'facebook',
    tone: 'professional',
    keywords: ['AI', 'Marketing', 'Công nghệ'],
    language: 'vi'
  });

  useEffect(() => {
    // Load initial data
    if (demoMode) {
      loadDemoData();
    }
  }, [demoMode]);

  const loadDemoData = async () => {
    try {
      // Simulate loading demo data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate demo content
      const content = await contentGeneration.generateContent(demoContent);
      console.log('Demo content generated:', content);
      
      // Analyze topics
      const analysis = await topicAnalysis.analyzeTopics('Công nghệ', ['AI', 'Marketing']);
      console.log('Demo topic analysis:', analysis);
      
    } catch (error) {
      console.error('Demo data loading failed:', error);
    }
  };

  const handleAssistantConfigChange = (newConfig: AIAssistantConfig) => {
    aiMarketingStore.getState().saveAssistantConfig(newConfig);
  };

  const handleScreenControl = (action: any) => {
    console.log('Screen control action:', action);
    // In real app, this would execute the action
  };

  const handleAutoReply = () => {
    setSelectedFeature('auto-reply');
    // Simulate auto reply processing
    autoReply.processMessage('Xin chào, tôi muốn biết thêm về sản phẩm', 'facebook');
  };

  const handleContentGeneration = () => {
    setSelectedFeature('content-generation');
    contentGeneration.generateContent(demoContent);
  };

  const handleSocialPublishing = () => {
    setSelectedFeature('social-publishing');
    // Simulate publishing
    socialPublishing.publishPost({
      platform: 'facebook',
      content: 'Nội dung demo được tạo bởi AI',
      mediaUrls: [],
      hashtags: ['#demo', '#ai', '#marketing']
    });
  };

  const handleTopicAnalysis = () => {
    setSelectedFeature('topic-analysis');
    topicAnalysis.analyzeTopics('Công nghệ', ['AI', 'Marketing', 'Startup']);
  };

  const renderFeatureDemo = () => {
    switch (selectedFeature) {
      case 'auto-reply':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AutoReplyIcon /> Tự động trả lời
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Tự động phát hiện và trả lời tin nhắn dựa trên từ khóa
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Nền tảng</InputLabel>
                    <Select value="facebook" label="Nền tảng">
                      <MenuItem value="facebook">Facebook</MenuItem>
                      <MenuItem value="instagram">Instagram</MenuItem>
                      <MenuItem value="zalo">Zalo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tone trả lời</InputLabel>
                    <Select value="professional" label="Tone trả lời">
                      <MenuItem value="professional">Chuyên nghiệp</MenuItem>
                      <MenuItem value="friendly">Thân thiện</MenuItem>
                      <MenuItem value="casual">Thân mật</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Mẫu trả lời"
                    defaultValue="Cảm ơn bạn đã quan tâm! Chúng tôi sẽ liên hệ lại sớm nhất."
                  />
                </Grid>
              </Grid>
              
              <Box mt={2}>
                <FormControlLabel
                  control={<Switch checked={true} />}
                  label="Bật AI Enhancement"
                />
              </Box>
            </CardContent>
          </Card>
        );

      case 'content-generation':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ContentIcon /> Tạo nội dung
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Tạo nội dung marketing chất lượng cao bằng AI
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Loại doanh nghiệp"
                    value={demoContent.businessType}
                    onChange={(e) => setDemoContent({...demoContent, businessType: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Nền tảng</InputLabel>
                    <Select 
                      value={demoContent.platform} 
                      label="Nền tảng"
                      onChange={(e) => setDemoContent({...demoContent, platform: e.target.value as any})}
                    >
                      <MenuItem value="facebook">Facebook</MenuItem>
                      <MenuItem value="instagram">Instagram</MenuItem>
                      <MenuItem value="tiktok">TikTok</MenuItem>
                      <MenuItem value="linkedin">LinkedIn</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Từ khóa"
                    value={demoContent.keywords.join(', ')}
                    onChange={(e) => setDemoContent({...demoContent, keywords: e.target.value.split(', ')})}
                    helperText="Phân cách bằng dấu phẩy"
                  />
                </Grid>
              </Grid>
              
              <Box mt={2}>
                <Button 
                  variant="contained" 
                  onClick={handleContentGeneration}
                  disabled={contentGeneration.isGenerating}
                  startIcon={contentGeneration.isGenerating ? <CircularProgress size={20} /> : <ContentIcon />}
                >
                  {contentGeneration.isGenerating ? 'Đang tạo...' : 'Tạo nội dung'}
                </Button>
              </Box>
              
              {contentGeneration.generatedContents.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Nội dung đã tạo:
                  </Typography>
                  {contentGeneration.generatedContents.slice(-3).map((content, index) => (
                    <Card key={index} variant="outlined" sx={{ mb: 1 }}>
                      <CardContent>
                        <Typography variant="body2">{content.content.substring(0, 100)}...</Typography>
                        <Box mt={1}>
                          {content.hashtags.slice(0, 3).map((tag, tagIndex) => (
                            <Chip key={tagIndex} label={tag} size="small" sx={{ mr: 0.5 }} />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        );

      case 'social-publishing':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <PublishIcon /> Đăng bài tự động
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Lên lịch và đăng bài tự động lên các mạng xã hội
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Nền tảng</InputLabel>
                    <Select value="facebook" label="Nền tảng">
                      <MenuItem value="facebook">Facebook</MenuItem>
                      <MenuItem value="instagram">Instagram</MenuItem>
                      <MenuItem value="tiktok">TikTok</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Thời gian đăng"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Nội dung bài viết"
                    defaultValue="Nội dung demo được tạo bởi AI Marketing Assistant..."
                  />
                </Grid>
              </Grid>
              
              <Box mt={2}>
                <Button 
                  variant="contained" 
                  onClick={handleSocialPublishing}
                  disabled={socialPublishing.isPublishing}
                  startIcon={socialPublishing.isPublishing ? <CircularProgress size={20} /> : <PublishIcon />}
                >
                  {socialPublishing.isPublishing ? 'Đang đăng...' : 'Đăng bài'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        );

      case 'topic-analysis':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AnalyticsIcon /> Phân tích chủ đề
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Phân tích xu hướng và chủ đề hot trong ngành
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ngành nghề"
                    defaultValue="Công nghệ"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Từ khóa"
                    defaultValue="AI, Marketing, Startup"
                    helperText="Phân cách bằng dấu phẩy"
                  />
                </Grid>
              </Grid>
              
              <Box mt={2}>
                <Button 
                  variant="contained" 
                  onClick={handleTopicAnalysis}
                  disabled={topicAnalysis.isAnalyzing}
                  startIcon={topicAnalysis.isAnalyzing ? <CircularProgress size={20} /> : <AnalyticsIcon />}
                >
                  {topicAnalysis.isAnalyzing ? 'Đang phân tích...' : 'Phân tích chủ đề'}
                </Button>
              </Box>
              
              {topicAnalysis.analysisResults.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Kết quả phân tích:
                  </Typography>
                  {topicAnalysis.analysisResults.slice(-1).map((result, index) => (
                    <Box key={index}>
                      <Typography variant="body2" color="primary">
                        Chủ đề trending: {result.trendingTopics[0]?.topic}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Độ liên quan: {Math.round((result.trendingTopics[0]?.relevanceScore || 0) * 100)}%
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AIIcon /> AI Marketing Assistant
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Chào mừng bạn đến với AI Marketing Assistant! Đây là trợ lý AI nổi giúp bạn tự động hóa các tác vụ marketing.
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Tính năng chính:</strong>
                </Typography>
                <ul>
                  <li>🤖 Trợ lý AI nổi với điều khiển màn hình thông minh</li>
                  <li>💬 Tự động trả lời tin nhắn trên đa nền tảng</li>
                  <li>📝 Tạo nội dung marketing bằng AI</li>
                  <li>📱 Đăng bài tự động với lên lịch thông minh</li>
                  <li>📊 Phân tích chủ đề và xu hướng</li>
                  <li>📈 Analytics và báo cáo chi tiết</li>
                </ul>
              </Alert>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AutoReplyIcon />}
                    onClick={() => setSelectedFeature('auto-reply')}
                  >
                    Tự động trả lời
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ContentIcon />}
                    onClick={() => setSelectedFeature('content-generation')}
                  >
                    Tạo nội dung
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PublishIcon />}
                    onClick={() => setSelectedFeature('social-publishing')}
                  >
                    Đăng bài
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AnalyticsIcon />}
                    onClick={() => setSelectedFeature('topic-analysis')}
                  >
                    Phân tích
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          AI Marketing Assistant Demo
        </Typography>
        <Box>
          <FormControlLabel
            control={
              <Switch 
                checked={demoMode} 
                onChange={(e) => setDemoMode(e.target.checked)}
              />
            }
            label="Demo Mode"
          />
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={() => setIsAssistantVisible(!isAssistantVisible)}
            sx={{ ml: 2 }}
          >
            {isAssistantVisible ? 'Ẩn' : 'Hiện'} Trợ lý
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          {renderFeatureDemo()}
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trạng thái hệ thống
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Trợ lý AI: {isAssistantVisible ? 'Đang hoạt động' : 'Đã ẩn'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Demo Mode: {demoMode ? 'Bật' : 'Tắt'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Đang tải: {isLoading ? 'Có' : 'Không'}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Thống kê nhanh:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Nội dung đã tạo: {contentGeneration.generatedContents.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Bài viết đã đăng: {socialPublishing.posts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Phân tích chủ đề: {topicAnalysis.analysisResults.length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Assistant Overlay */}
      {isAssistantVisible && assistantConfig && (
        <AIAssistantOverlay
          config={assistantConfig}
          onConfigChange={handleAssistantConfigChange}
          onScreenControl={handleScreenControl}
          onAutoReply={handleAutoReply}
          onContentGeneration={handleContentGeneration}
          onSocialPublishing={handleSocialPublishing}
          onTopicAnalysis={handleTopicAnalysis}
          isVisible={isAssistantVisible}
          onToggleVisibility={() => setIsAssistantVisible(false)}
        />
      )}
    </Box>
  );
};