import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  Button,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Tooltip,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  SmartToy as AIIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import { useAutoReply } from '../../hooks/useAutoReply';
import type { AutoReplyConfig, ResponseTemplate } from '../../types';

interface AutoReplyManagerProps {
  businessContext?: any;
  onReplyGenerated?: (reply: string, config: AutoReplyConfig) => void;
  floatingMode?: boolean;
}

export const AutoReplyManager: React.FC<AutoReplyManagerProps> = ({
  businessContext,
  onReplyGenerated,
  floatingMode = false
}) => {
  const {
    configs,
    selectedConfig,
    isLoadingConfigs,
    createConfig,
    updateConfig,
    deleteConfig,
    generateReply,
    toggleConfig,
    selectConfig,
    addResponseTemplate,
    updateResponseTemplate,
    deleteResponseTemplate,
    isCreating,
    isUpdating,
    isDeleting,
    isGenerating
  } = useAutoReply();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<AutoReplyConfig | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<ResponseTemplate | null>(null);
  const [testMessage, setTestMessage] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');

  // Form state for new/edit config
  const [formData, setFormData] = useState({
    name: '',
    triggerKeywords: [] as string[],
    tone: 'professional' as const,
    language: 'vi' as const,
    autoApprove: false,
    maxResponseLength: 200
  });

  // Form state for template
  const [templateData, setTemplateData] = useState({
    content: '',
    category: 'greeting' as const,
    priority: 1,
    isActive: true
  });

  const handleCreateConfig = async () => {
    try {
      const newConfig = await createConfig({
        ...formData,
        isEnabled: true,
        responseTemplates: [],
        businessContext: businessContext || {}
      });
      
      setIsDialogOpen(false);
      resetForm();
      selectConfig(newConfig);
    } catch (error) {
      console.error('Error creating config:', error);
    }
  };

  const handleUpdateConfig = async () => {
    if (!editingConfig) return;
    
    try {
      const updatedConfig = await updateConfig(editingConfig.id, formData);
      setIsDialogOpen(false);
      resetForm();
      selectConfig(updatedConfig);
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  const handleDeleteConfig = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cấu hình này?')) {
      try {
        await deleteConfig(id);
      } catch (error) {
        console.error('Error deleting config:', error);
      }
    }
  };

  const handleToggleConfig = async (id: string, isEnabled: boolean) => {
    try {
      await toggleConfig(id, isEnabled);
    } catch (error) {
      console.error('Error toggling config:', error);
    }
  };

  const handleTestReply = async () => {
    if (!testMessage.trim() || !selectedConfig) return;
    
    try {
      const reply = await generateReply(testMessage, businessContext || {});
      setGeneratedReply(reply);
    } catch (error) {
      console.error('Error generating test reply:', error);
    }
  };

  const handleAddTemplate = async () => {
    if (!selectedConfig) return;
    
    try {
      await addResponseTemplate(selectedConfig.id, templateData);
      setIsTemplateDialogOpen(false);
      resetTemplateForm();
    } catch (error) {
      console.error('Error adding template:', error);
    }
  };

  const handleUpdateTemplate = async () => {
    if (!selectedConfig || !editingTemplate) return;
    
    try {
      await updateResponseTemplate(selectedConfig.id, editingTemplate.id, templateData);
      setIsTemplateDialogOpen(false);
      resetTemplateForm();
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!selectedConfig) return;
    
    if (window.confirm('Bạn có chắc chắn muốn xóa template này?')) {
      try {
        await deleteResponseTemplate(selectedConfig.id, templateId);
      } catch (error) {
        console.error('Error deleting template:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      triggerKeywords: [],
      tone: 'professional',
      language: 'vi',
      autoApprove: false,
      maxResponseLength: 200
    });
    setEditingConfig(null);
  };

  const resetTemplateForm = () => {
    setTemplateData({
      content: '',
      category: 'greeting',
      priority: 1,
      isActive: true
    });
    setEditingTemplate(null);
  };

  const openEditDialog = (config: AutoReplyConfig) => {
    setEditingConfig(config);
    setFormData({
      name: config.name,
      triggerKeywords: config.triggerKeywords,
      tone: config.tone,
      language: config.language,
      autoApprove: config.autoApprove,
      maxResponseLength: config.maxResponseLength
    });
    setIsDialogOpen(true);
  };

  const openTemplateDialog = (template?: ResponseTemplate) => {
    if (template) {
      setEditingTemplate(template);
      setTemplateData({
        content: template.content,
        category: template.category,
        priority: template.priority,
        isActive: template.isActive
      });
    } else {
      resetTemplateForm();
    }
    setIsTemplateDialogOpen(true);
  };

  if (floatingMode) {
    return (
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        <Tooltip title="Quản lý tự động trả lời">
          <Fab
            color="primary"
            onClick={() => setIsDialogOpen(true)}
            sx={{ position: 'relative' }}
          >
            <MessageIcon />
            {configs.filter(c => c.isEnabled).length > 0 && (
              <Chip
                label={configs.filter(c => c.isEnabled).length}
                size="small"
                color="secondary"
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  minWidth: 20,
                  height: 20,
                  fontSize: '0.75rem'
                }}
              />
            )}
          </Fab>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          <AIIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Quản lý tự động trả lời
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
          disabled={isCreating}
        >
          Tạo cấu hình mới
        </Button>
      </Box>

      {isLoadingConfigs ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : configs.length === 0 ? (
        <Alert severity="info">
          Chưa có cấu hình tự động trả lời nào. Hãy tạo cấu hình đầu tiên!
        </Alert>
      ) : (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {configs.map((config) => (
            <Card key={config.id} sx={{ position: 'relative' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h3">
                    {config.name}
                  </Typography>
                  <Switch
                    checked={config.isEnabled}
                    onChange={(e) => handleToggleConfig(config.id, e.target.checked)}
                    color="primary"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Từ khóa kích hoạt:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {config.triggerKeywords.map((keyword, index) => (
                      <Chip key={index} label={keyword} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Giọng điệu: {config.tone} | Ngôn ngữ: {config.language}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tự động phê duyệt: {config.autoApprove ? 'Có' : 'Không'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => openEditDialog(config)}
                    disabled={isUpdating}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    size="small"
                    startIcon={<SettingsIcon />}
                    onClick={() => selectConfig(config)}
                    variant="outlined"
                  >
                    Templates
                  </Button>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteConfig(config.id)}
                    disabled={isDeleting}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Test Reply Section */}
      {selectedConfig && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Thử nghiệm tự động trả lời
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Tin nhắn thử nghiệm"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Nhập tin nhắn để thử nghiệm..."
              />
              <Button
                variant="contained"
                onClick={handleTestReply}
                disabled={!testMessage.trim() || isGenerating}
                startIcon={isGenerating ? <CircularProgress size={20} /> : <AIIcon />}
              >
                Tạo trả lời
              </Button>
            </Box>
            {generatedReply && (
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Trả lời được tạo:
                </Typography>
                <Typography variant="body2">
                  {generatedReply}
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Response Templates Section */}
      {selectedConfig && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Templates trả lời - {selectedConfig.name}
              </Typography>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => openTemplateDialog()}
              >
                Thêm template
              </Button>
            </Box>
            
            <List>
              {selectedConfig.responseTemplates.map((template) => (
                <ListItem key={template.id} divider>
                  <ListItemText
                    primary={template.content}
                    secondary={`${template.category} | Ưu tiên: ${template.priority}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      onClick={() => openTemplateDialog(template)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Config Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingConfig ? 'Chỉnh sửa cấu hình' : 'Tạo cấu hình mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
            <TextField
              label="Tên cấu hình"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            
            <TextField
              label="Từ khóa kích hoạt (phân cách bằng dấu phẩy)"
              value={formData.triggerKeywords.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                triggerKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
              })}
              fullWidth
              helperText="Các từ khóa sẽ kích hoạt tự động trả lời khi xuất hiện trong tin nhắn"
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Giọng điệu</InputLabel>
                <Select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                  label="Giọng điệu"
                >
                  <MenuItem value="professional">Chuyên nghiệp</MenuItem>
                  <MenuItem value="friendly">Thân thiện</MenuItem>
                  <MenuItem value="casual">Thân mật</MenuItem>
                  <MenuItem value="formal">Trang trọng</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Ngôn ngữ</InputLabel>
                <Select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
                  label="Ngôn ngữ"
                >
                  <MenuItem value="vi">Tiếng Việt</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              label="Độ dài tối đa trả lời"
              type="number"
              value={formData.maxResponseLength}
              onChange={(e) => setFormData({ ...formData, maxResponseLength: parseInt(e.target.value) })}
              fullWidth
            />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Switch
                checked={formData.autoApprove}
                onChange={(e) => setFormData({ ...formData, autoApprove: e.target.checked })}
                color="primary"
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Tự động phê duyệt trả lời
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Hủy</Button>
          <Button
            onClick={editingConfig ? handleUpdateConfig : handleCreateConfig}
            variant="contained"
            disabled={!formData.name.trim() || isCreating || isUpdating}
          >
            {editingConfig ? 'Cập nhật' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Template Dialog */}
      <Dialog open={isTemplateDialogOpen} onClose={() => setIsTemplateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingTemplate ? 'Chỉnh sửa template' : 'Thêm template mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
            <TextField
              label="Nội dung template"
              value={templateData.content}
              onChange={(e) => setTemplateData({ ...templateData, content: e.target.value })}
              fullWidth
              multiline
              rows={4}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  value={templateData.category}
                  onChange={(e) => setTemplateData({ ...templateData, category: e.target.value as any })}
                  label="Danh mục"
                >
                  <MenuItem value="greeting">Chào hỏi</MenuItem>
                  <MenuItem value="inquiry">Tư vấn</MenuItem>
                  <MenuItem value="complaint">Khiếu nại</MenuItem>
                  <MenuItem value="sale">Bán hàng</MenuItem>
                  <MenuItem value="support">Hỗ trợ</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Mức ưu tiên"
                type="number"
                value={templateData.priority}
                onChange={(e) => setTemplateData({ ...templateData, priority: parseInt(e.target.value) })}
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Switch
                checked={templateData.isActive}
                onChange={(e) => setTemplateData({ ...templateData, isActive: e.target.checked })}
                color="primary"
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Kích hoạt template
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTemplateDialogOpen(false)}>Hủy</Button>
          <Button
            onClick={editingTemplate ? handleUpdateTemplate : handleAddTemplate}
            variant="contained"
            disabled={!templateData.content.trim()}
          >
            {editingTemplate ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};