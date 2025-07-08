# 📥 Hướng Dẫn Sử Dụng Script Tải Windows

## 🚀 Cách chạy script

### Cách 1: Sử dụng file batch (Đơn giản nhất)
1. **Double-click** vào file `run_windows_download.bat`
2. Script sẽ tự động chạy với quyền phù hợp

### Cách 2: Chạy trực tiếp PowerShell script
1. **Chuột phải** vào file `windows_download_fixed.ps1`
2. Chọn **"Run with PowerShell"**
3. Nếu có thông báo về Security, chọn **"Run once"**

### Cách 3: Chạy từ PowerShell (Nâng cao)
1. Mở **PowerShell** với quyền Administrator:
   - Nhấn `Windows + X`
   - Chọn **"Windows PowerShell (Admin)"**
   
2. Di chuyển đến thư mục chứa script:
   ```powershell
   cd "đường\dẫn\đến\thư\mục"
   ```

3. Chạy lệnh:
   ```powershell
   .\windows_download_fixed.ps1
   ```

## ❗ Khắc phục lỗi thường gặp

### Lỗi "cannot be loaded because running scripts is disabled"
**Nguyên nhân:** Windows chặn chạy script PowerShell

**Cách sửa:**
- Sử dụng file `run_windows_download.bat` (đã bypass tự động)
- Hoặc mở PowerShell Admin và chạy:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### Lỗi không tạo được thư mục
**Nguyên nhân:** Không có quyền ghi vào ổ đĩa

**Cách sửa:**
- Script đã được cập nhật để tạo thư mục trong `Downloads` của user
- Không cần quyền Administrator

### Lỗi download thất bại
**Nguyên nhân:** Kết nối mạng hoặc firewall

**Cách sửa:**
- Kiểm tra kết nối internet
- Tạm thời tắt Windows Defender hoặc antivirus
- Script sẽ tự động mở trình duyệt nếu download thất bại

## 📋 Tính năng của script

1. **Tự động tải Media Creation Tool** từ Microsoft
2. **Tạo thư mục lưu trữ** riêng cho file ISO
3. **Hỗ trợ cả Windows 10 và 11**
4. **Tự động mở Media Creation Tool** sau khi tải
5. **Hướng dẫn chi tiết** các bước tiếp theo

## 💡 Lưu ý quan trọng

- Script chỉ tải **Media Creation Tool** chính thức từ Microsoft
- File ISO Windows sẽ được tải thông qua Media Creation Tool
- Kích thước ISO khoảng **4-5 GB**, cần đủ dung lượng đĩa
- Thời gian tải phụ thuộc vào tốc độ internet

## 🔧 Yêu cầu hệ thống

- Windows 7 trở lên
- PowerShell 3.0 trở lên (có sẵn trong Windows)
- Kết nối internet ổn định
- Ít nhất 8GB dung lượng trống

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Chụp màn hình lỗi
2. Ghi lại thông báo lỗi cụ thể
3. Kiểm tra phiên bản Windows hiện tại

---
*Script được phát triển để đơn giản hóa việc tải Windows chính thức từ Microsoft*