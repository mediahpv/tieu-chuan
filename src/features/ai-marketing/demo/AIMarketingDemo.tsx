import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  SmartToy as AIIcon,
  Message as MessageIcon,
  Create as CreateIcon,
  Share as ShareIcon,
  TrendingUp as TrendingIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

// Import các component từ module
import { AutoReplyManager } from '../components/AutoReplyManager/AutoReplyManager';
import { ContentGenerator } from '../components/ContentGenerator/ContentGenerator';
import { SocialMediaPublisher } from '../components/SocialMediaPublisher/SocialMediaPublisher';
import { SmartTopicFinder } from '../components/SmartTopicFinder/SmartTopicFinder';
import { MarketingAnalytics } from '../components/MarketingAnalytics/MarketingAnalytics';
import { AISettingsPanel } from '../components/AISettingsPanel/AISettingsPanel';

// Import hooks
import { useAutoReply } from '../hooks/useAutoReply';
import { useContentGeneration } from '../hooks/useContentGeneration';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`ai-marketing-tabpanel-${index}`}
      aria-labelledby={`ai-marketing-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const AIMarketingDemo: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [demoMode, setDemoMode] = useState(true);

  // Demo business context
  const demoBusinessContext = {
    businessName: 'TechStart Vietnam',
    industry: 'Technology',
    targetAudience: ['developers', 'startups', 'enterprises'],
    products: ['AI Platform', 'Cloud Services', 'Consulting'],
    services: ['AI Integration', 'Digital Transformation', 'Training'],
    brandVoice: 'Innovative, Professional, and Customer-focused',
    contactInfo: {
      phone: '+84 123 456 789',
      email: 'contact@techstart.vn',
      website: 'https://techstart.vn',
      address: 'Ho Chi Minh City, Vietnam'
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const features = [
    {
      icon: <MessageIcon />,
      title: 'Tự động trả lời',
      description: 'AI thông minh tự động trả lời tin nhắn khách hàng',
      color: '#2196F3'
    },
    {
      icon: <CreateIcon />,
      title: 'Tạo nội dung',
      description: 'Tạo nội dung marketing chất lượng cao tự động',
      color: '#4CAF50'
    },
    {
      icon: <ShareIcon />,
      title: 'Đăng bài tự động',
      description: 'Lên lịch và đăng bài lên nhiều nền tảng',
      color: '#FF9800'
    },
    {
      icon: <TrendingIcon />,
      title: 'Tìm chủ đề',
      description: 'Phân tích xu hướng và đề xuất chủ đề hot',
      color: '#9C27B0'
    },
    {
      icon: <AnalyticsIcon />,
      title: 'Phân tích marketing',
      description: 'Insights chi tiết về hiệu suất marketing',
      color: '#F44336'
    },
    {
      icon: <SettingsIcon />,
      title: 'Cài đặt AI',
      description: 'Tùy chỉnh và tối ưu AI cho doanh nghiệp',
      color: '#607D8B'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          <AIIcon sx={{ mr: 2, verticalAlign: 'middle', fontSize: '2rem' }} />
          AI Marketing Module Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Trợ lý AI nổi tích hợp marketing thông minh
        </Typography>
        <Alert severity="info" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
          Đây là demo module AI Marketing với đầy đủ tính năng tự động hóa marketing.
          Module được thiết kế để tích hợp với trợ lý nổi có khả năng điều khiển màn hình.
        </Alert>
      </Box>

      {/* Features Overview */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Tính năng chính
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', border: `2px solid ${feature.color}20` }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: feature.color, mb: 2 }}>
                    {React.cloneElement(feature.icon, { sx: { fontSize: '3rem' } })}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Demo Mode Toggle */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Chip
          label={demoMode ? 'Demo Mode: ON' : 'Demo Mode: OFF'}
          color={demoMode ? 'success' : 'default'}
          onClick={() => setDemoMode(!demoMode)}
          sx={{ cursor: 'pointer' }}
        />
        {demoMode && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Dữ liệu demo sẽ được sử dụng. Tắt demo mode để sử dụng dữ liệu thực.
          </Typography>
        )}
      </Box>

      {/* Business Context Display */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Ngữ cảnh doanh nghiệp (Business Context)
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Tên doanh nghiệp:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {demoBusinessContext.businessName}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary">
              Ngành nghề:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {demoBusinessContext.industry}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary">
              Đối tượng mục tiêu:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {demoBusinessContext.targetAudience.map((audience, index) => (
                <Chip key={index} label={audience} size="small" variant="outlined" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Sản phẩm:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {demoBusinessContext.products.map((product, index) => (
                <Chip key={index} label={product} size="small" color="primary" />
              ))}
            </Box>
            
            <Typography variant="subtitle2" color="text.secondary">
              Dịch vụ:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {demoBusinessContext.services.map((service, index) => (
                <Chip key={index} label={service} size="small" color="secondary" />
              ))}
            </Box>
            
            <Typography variant="subtitle2" color="text.secondary">
              Giọng điệu thương hiệu:
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              "{demoBusinessContext.brandVoice}"
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="AI Marketing features"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Tự động trả lời" icon={<MessageIcon />} iconPosition="start" />
            <Tab label="Tạo nội dung" icon={<CreateIcon />} iconPosition="start" />
            <Tab label="Đăng bài" icon={<ShareIcon />} iconPosition="start" />
            <Tab label="Tìm chủ đề" icon={<TrendingIcon />} iconPosition="start" />
            <Tab label="Phân tích" icon={<AnalyticsIcon />} iconPosition="start" />
            <Tab label="Cài đặt AI" icon={<SettingsIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Auto Reply Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom>
            <MessageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Quản lý tự động trả lời
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Cấu hình AI để tự động trả lời tin nhắn khách hàng dựa trên từ khóa và ngữ cảnh.
          </Typography>
          <AutoReplyManager 
            businessContext={demoBusinessContext}
            floatingMode={false}
          />
        </TabPanel>

        {/* Content Generation Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            <CreateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Tạo nội dung tự động
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            AI tạo nội dung marketing chất lượng cao cho các nền tảng social media.
          </Typography>
          <ContentGenerator />
        </TabPanel>

        {/* Social Publishing Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            <ShareIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Đăng bài tự động
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Lên lịch và đăng bài tự động lên nhiều nền tảng social media.
          </Typography>
          <SocialMediaPublisher />
        </TabPanel>

        {/* Topic Finder Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h5" gutterBottom>
            <TrendingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Tìm chủ đề thông minh
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Phân tích xu hướng và đề xuất chủ đề phù hợp với doanh nghiệp.
          </Typography>
          <SmartTopicFinder />
        </TabPanel>

        {/* Analytics Tab */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h5" gutterBottom>
            <AnalyticsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Phân tích marketing
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Insights chi tiết về hiệu suất marketing và đề xuất cải thiện.
          </Typography>
          <MarketingAnalytics />
        </TabPanel>

        {/* AI Settings Tab */}
        <TabPanel value={tabValue} index={5}>
          <Typography variant="h5" gutterBottom>
            <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Cài đặt AI
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Tùy chỉnh và tối ưu cài đặt AI cho doanh nghiệp của bạn.
          </Typography>
          <AISettingsPanel />
        </TabPanel>
      </Paper>

      {/* Floating Assistant Demo */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Trợ lý nổi (Floating Assistant)
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Trợ lý AI nổi có thể điều khiển màn hình và tương tác với các ứng dụng bên thứ 3.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tính năng điều khiển màn hình
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip label="Chụp màn hình" color="primary" />
                  <Chip label="Tương tác với UI" color="primary" />
                  <Chip label="Chuyển đổi ứng dụng" color="primary" />
                  <Chip label="Nhận diện cử chỉ" color="primary" />
                  <Chip label="Chế độ riêng tư" color="secondary" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tích hợp phần cứng
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip label="Camera" color="primary" />
                  <Chip label="Microphone" color="primary" />
                  <Chip label="GPS" color="primary" />
                  <Chip label="Accelerometer" color="primary" />
                  <Chip label="Gyroscope" color="primary" />
                  <Chip label="Biometrics" color="secondary" />
                  <Chip label="NFC" color="secondary" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AIIcon />}
            onClick={() => {
              // Simulate floating assistant activation
              alert('Trợ lý nổi đã được kích hoạt!');
            }}
          >
            Kích hoạt trợ lý nổi
          </Button>
        </Box>
      </Paper>

      {/* Integration Examples */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ví dụ tích hợp
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Facebook Messenger
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Tự động trả lời tin nhắn khách hàng trên Facebook Messenger với AI thông minh.
                </Typography>
                <Button variant="outlined" size="small">
                  Xem demo
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Instagram Stories
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Tạo và đăng stories tự động với nội dung được tối ưu cho Instagram.
                </Typography>
                <Button variant="outlined" size="small">
                  Xem demo
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  LinkedIn Posts
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Tạo nội dung chuyên nghiệp cho LinkedIn với AI phân tích ngành nghề.
                </Typography>
                <Button variant="outlined" size="small">
                  Xem demo
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: 'center', py: 3 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          AI Marketing Module - Powered by Advanced AI Technology
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Tích hợp hoàn hảo với trợ lý nổi để tự động hóa marketing hiệu quả
        </Typography>
      </Box>
    </Container>
  );
};