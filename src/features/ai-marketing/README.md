# AI Marketing Module - Floating Assistant Integration

## Tổng quan

Module AI Marketing là một hệ thống tích hợp AI mạnh mẽ cho trợ lý nổi (floating assistant), cung cấp các tính năng tự động hóa marketing chuyên sâu và cao cấp.

## Tính năng chính

### 🤖 Trợ lý AI Nổi (Floating Assistant)
- **Điều khiển màn hình thông minh**: Phân tích và thao tác trên màn hình như người dùng thật
- **Giao diện nổi**: Có thể di chuyển, thu nhỏ, và tùy chỉnh vị trí
- **Tích hợp phần cứng**: Tận dụng các tính năng thông minh của điện thoại
- **Phân tích ngầm**: Chạy phân tích AI trong nền để đề xuất hành động

### 💬 Tự động trả lời tin nhắn
- **Nhận diện từ khóa**: Tự động phát hiện và trả lời tin nhắn dựa trên từ khóa
- **AI Enhancement**: Cải thiện nội dung trả lời bằng AI
- **Đa nền tảng**: Hỗ trợ Facebook, Instagram, Zalo, Telegram, WhatsApp
- **Tùy chỉnh personality**: Chọn tone trả lời phù hợp với thương hiệu

### 📝 Tạo nội dung tự động
- **AI Content Generation**: Tạo nội dung marketing chất lượng cao
- **Tối ưu theo nền tảng**: Tự động điều chỉnh nội dung cho từng mạng xã hội
- **Phân tích đối tượng**: Tạo nội dung phù hợp với target audience
- **Đa dạng loại nội dung**: Post, Story, Ad, Email, Blog

### 📱 Đăng bài tự động
- **Lên lịch thông minh**: Đăng bài vào thời điểm tối ưu
- **Đa nền tảng**: Đăng đồng thời lên nhiều mạng xã hội
- **Theo dõi hiệu suất**: Phân tích engagement và reach
- **Bulk Publishing**: Đăng hàng loạt bài viết

### 📊 Phân tích chủ đề và xu hướng
- **Trending Topics**: Phát hiện chủ đề đang hot
- **Competitor Analysis**: Phân tích đối thủ cạnh tranh
- **Audience Insights**: Hiểu rõ đối tượng khách hàng
- **Content Suggestions**: Đề xuất nội dung phù hợp

### 📈 Analytics và Báo cáo
- **Real-time Metrics**: Theo dõi hiệu suất marketing real-time
- **Platform Performance**: So sánh hiệu suất giữa các nền tảng
- **Audience Growth**: Phân tích tăng trưởng khách hàng
- **Export Reports**: Xuất báo cáo PDF, Excel, CSV

## Cấu trúc Module

```
src/features/ai-marketing/
├── components/
│   ├── AIAssistantOverlay/     # Trợ lý nổi chính
│   ├── AutoReplyManager/       # Quản lý tự động trả lời
│   ├── ContentGenerator/       # Tạo nội dung
│   ├── SocialMediaPublisher/   # Đăng bài tự động
│   └── TopicAnalyzer/          # Phân tích chủ đề
├── hooks/
│   ├── useAutoReply.ts         # Hook tự động trả lời
│   ├── useContentGeneration.ts # Hook tạo nội dung
│   ├── useSocialPublishing.ts  # Hook đăng bài
│   ├── useTopicAnalysis.ts     # Hook phân tích chủ đề
│   └── useMarketingAnalytics.ts # Hook analytics
├── api/
│   └── aiMarketingApi.ts       # API layer
├── store/
│   └── aiMarketingStore.ts     # State management
├── types/
│   └── index.ts               # TypeScript types
├── pages/
│   └── MarketingDashboard/    # Dashboard chính
└── index.ts                   # Public API exports
```

## Cách sử dụng

### 1. Cài đặt dependencies

```bash
npm install zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### 2. Import và sử dụng module

```typescript
import { 
  AIAssistantOverlay, 
  useAutoReply, 
  useContentGeneration,
  aiMarketingStore 
} from '@/features/ai-marketing';

// Sử dụng trợ lý nổi
function App() {
  const config = aiMarketingStore(state => state.assistantConfig);
  
  return (
    <AIAssistantOverlay
      config={config}
      onConfigChange={(newConfig) => aiMarketingStore.getState().saveAssistantConfig(newConfig)}
      onScreenControl={(action) => aiMarketingStore.getState().executeScreenAction(action)}
      onAutoReply={() => {/* Handle auto reply */}}
      onContentGeneration={() => {/* Handle content generation */}}
      onSocialPublishing={() => {/* Handle social publishing */}}
      onTopicAnalysis={() => {/* Handle topic analysis */}}
    />
  );
}
```

### 3. Sử dụng hooks

```typescript
// Tự động trả lời
const { 
  autoReplyConfigs, 
  createAutoReply, 
  processMessage 
} = useAutoReply();

// Tạo nội dung
const { 
  generateContent, 
  generatedContents 
} = useContentGeneration();

// Đăng bài
const { 
  publishPost, 
  schedulePost 
} = useSocialPublishing();

// Phân tích chủ đề
const { 
  analyzeTopics, 
  getTrendingTopics 
} = useTopicAnalysis();
```

### 4. Cấu hình AI Assistant

```typescript
const assistantConfig: AIAssistantConfig = {
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
```

## API Integration

### OpenAI Integration
Module sử dụng OpenAI API cho các tính năng AI:
- Content Generation
- Topic Analysis
- Screen Analysis
- Auto Reply Enhancement

### Social Media APIs
Tích hợp với các API mạng xã hội:
- Facebook Graph API
- Instagram Basic Display API
- Twitter API v2
- LinkedIn API
- TikTok API

### Environment Variables
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_AI_API_URL=https://api.openai.com/v1
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

## Tính năng nâng cao

### Screen Control
- **Computer Vision**: Phân tích màn hình bằng AI
- **Element Detection**: Tự động phát hiện các element trên màn hình
- **Action Execution**: Thực hiện hành động như click, type, scroll
- **Context Awareness**: Hiểu ngữ cảnh và đề xuất hành động phù hợp

### Smart Scheduling
- **Optimal Timing**: Đăng bài vào thời điểm tối ưu
- **Audience Behavior**: Phân tích thời gian hoạt động của khách hàng
- **Content Performance**: Học từ hiệu suất bài viết trước
- **Cross-platform Coordination**: Đồng bộ lịch đăng bài

### AI Enhancement
- **Content Optimization**: Tối ưu nội dung cho từng nền tảng
- **Hashtag Suggestions**: Đề xuất hashtag phù hợp
- **Image Recommendations**: Gợi ý hình ảnh phù hợp
- **Engagement Prediction**: Dự đoán mức độ tương tác

## Bảo mật và Quyền riêng tư

- **Local Processing**: Xử lý dữ liệu nhạy cảm trên thiết bị
- **Encrypted Storage**: Mã hóa dữ liệu lưu trữ
- **Permission Management**: Quản lý quyền truy cập chi tiết
- **Data Anonymization**: Ẩn danh hóa dữ liệu khi cần thiết

## Performance Optimization

- **Lazy Loading**: Tải components khi cần thiết
- **Caching**: Cache dữ liệu để tăng tốc độ
- **Background Processing**: Xử lý AI trong background
- **Memory Management**: Quản lý bộ nhớ hiệu quả

## Troubleshooting

### Lỗi thường gặp

1. **API Key không hợp lệ**
   - Kiểm tra REACT_APP_OPENAI_API_KEY
   - Đảm bảo API key có đủ quota

2. **Screen Control không hoạt động**
   - Kiểm tra quyền truy cập màn hình
   - Đảm bảo browser hỗ trợ Screen Capture API

3. **Social Media API lỗi**
   - Kiểm tra access tokens
   - Đảm bảo app permissions

### Debug Mode
```typescript
// Bật debug mode
localStorage.setItem('ai-marketing-debug', 'true');

// Xem logs
console.log('AI Marketing Debug:', aiMarketingStore.getState());
```

## Roadmap

### Phase 1 (Hiện tại)
- ✅ Trợ lý nổi cơ bản
- ✅ Tự động trả lời
- ✅ Tạo nội dung
- ✅ Đăng bài tự động

### Phase 2 (Q2 2024)
- 🔄 Video Content Generation
- 🔄 Advanced Analytics
- 🔄 Multi-language Support
- 🔄 Mobile App Integration

### Phase 3 (Q3 2024)
- 📋 AI-powered Campaign Management
- 📋 Predictive Analytics
- 📋 Voice Assistant Integration
- 📋 AR/VR Marketing Tools

## Đóng góp

Module này được phát triển theo tiêu chuẩn Feature-Sliced Design (FSD) và tuân thủ các nguyên tắc clean architecture. Mọi đóng góp đều được chào đón!

## License

MIT License - Xem file LICENSE để biết thêm chi tiết.