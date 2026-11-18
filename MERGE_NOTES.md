# TANCA COFFEE — Bản tích hợp ST1 + ST2

Nguồn: `SPCK(4).rar` (bản nền cục bộ) và `TANCA_COFFEE_AUTOMATIC_MENU_SYSTEM-main.zip` (GitHub main, snapshot aeb8fc7e201a90a5a5ad7d5b5bc9167622c9be43).

## Những phần được giữ
- ST1: giữ nguyên hình ảnh, Intro, HomeBanner, CatChatbot, PageFlipTransition và Header (bản local có logo placeholder). HomePage chỉ lấy phần quản lý giỏ hàng từ main; các component hiển thị ST1 không bị thay thế.
- ST2.1: giữ MenuOverview, nền sakura, font Dancing Script, 5 nút danh mục, Best Seller (3 banner, màu và bố cục), ZoomTransition 750ms + crossfade 550ms.
- Khôi phục Slider ngang vì bản local có component Fade nhưng hook Slide. Giữ chu kỳ bắt đầu chuyển 2000ms và thời gian lướt 1500ms (khoảng 500ms đứng yên giữa hai lần lướt khi chạy tự động). Hover tạm dừng timer, giữ dấu chấm và vòng lặp bằng clone ảnh đầu. Thứ tự ảnh thực tế: matcha dâu, trà đào, cà phê.
- ST2.2/2.3: lấy CategoryPage, CategoryBackground, DrinkDetailPage, các component sản phẩm, hook tùy chỉnh và 15 món / 5 nhóm của main. Giữ bố cục danh mục và chi tiết của thành viên 2, kết nối nút quay lại và Zoom; dùng font viết tay cho các tiêu đề mới phù hợp quy chuẩn đã chốt.
- Giỏ hàng: lấy logic và popup của main, tính số lượng và tổng tiền theo từng lựa chọn; không thay đổi giá và công thức tùy chỉnh do thành viên 2 cung cấp. Lưu thêm dữ liệu tùy chỉnh có cấu trúc và chuẩn hóa thứ tự topping trong khóa dòng giỏ hàng.

## Những điểm tích hợp quan trọng
- `MenuPage.jsx` quản lý 4 màn hình: overview, best-seller, category, drink. Kết hợp dữ liệu danh mục local (theme, title, japanese) với hình nền, accentColor, panelBg và dữ liệu main theo cùng ID.
- `BestSellerPage.jsx` giữ tên/ảnh quảng cáo, ánh xạ vào danh mục sản phẩm main: Strawberry Matcha -> `trend-1` (Matcha Dâu Tây Kem Sữa); Signature Coffee -> `coffee-2` (Cà Phê Sữa Đá TANCA, được đánh dấu Signature); Peach Tea -> `fruit-1` (Trà Đào Cam Sả). Đây là ánh xạ tạm chọn theo tên và dữ liệu có sẵn, cần nhóm xác nhận món cà phê phù hợp; chưa có số liệu doanh số để xác định Best Seller thực tế. Trang chi tiết hiển thị tên, ảnh, nguyên liệu và giá chính thức trong dữ liệu main.
- Từ Best Seller, nút quay lại trở về Best Seller; từ danh mục trở về danh mục; từ danh mục/Best Seller trở về Overview. Không thêm Reverse Zoom chưa chốt.
- Header giữ logo placeholder local thay vì icon Coffee từ main vì chưa có yêu cầu đổi thiết kế Header. Thêm giỏ hàng theo yêu cầu tích hợp.
- CSS animation import theo vị trí thật `./components/styles/menu-animation.css`.
- Giữ package.json và package-lock.json local (hai package.json có cùng nội dung sau chuẩn hóa xuống dòng), Tailwind v3. Không thêm dependency.

## Kiểm tra và chạy
Đã kiểm tra cú pháp JS/JSX qua TypeScript (transpile), 53 import tương đối và sự tồn tại của ảnh đang sử dụng; 15 món có ID riêng, 5 nhóm đều có đúng 3 món, 3 ID Best Seller hợp lệ. Chưa build hoặc kiểm tra tương tác trình duyệt thành công: npm ci thất bại vì registry.npmjs.org lỗi DNS EAI_AGAIN trong môi trường kiểm tra; không có Vite cài đặt trên Linux. Không nên coi bản này đã nghiệm thu hoàn toàn.

Giải nén, mở Terminal trong thư mục SPCK_MERGED, chạy:

```powershell
npm ci
npm run build
npm run dev
```

Kiểm thử trên trình duyệt:
- Intro -> START -> Home -> Menu; Header không đổi giao diện.
- Slider chạy hơn 3 vòng, hover dừng và click dấu chấm; click banner mở Best Seller.
- Tất cả 5 danh mục: Zoom đúng nút, background theo nhóm, hiện đúng 3 món.
- Từng món -> chi tiết: thay size, độ ngọt, đá, topping, tại chỗ/mang về, số lượng, ghi chú. Kiểm tra tổng tiền khi thêm vào giỏ và khi thêm lại cùng tùy chỉnh.
- Best Seller -> từng món -> quay lại đúng trang; đổi nhanh món trong detail.
- Test mobile và desktop. Trang danh mục của main có thể cần thêm cuộn tùy màn hình; giữ thiết kế nguồn, chưa nghiệm thu responsive/no-scroll.

Chức năng ST3/ST4 đầy đủ, thanh toán và dữ liệu backend chưa triển khai. Giỏ hàng hiện là state React trong phiên, không đảm bảo lưu qua reload. Ảnh banner AI hiện giữ nguyên theo bản của bạn; không xác minh nguồn/quyền sử dụng ảnh đồ uống của main.

## Đưa lên GitHub an toàn
Không force-push main, không reset --hard. Giữ nguyên thư mục cũ làm backup. Clone repo thật vào thư mục mới, tạo branch `feature/st2-integrated` từ main, chép nội dung bản gộp vào thư mục clone (KHÔNG chép đè/xóa thư mục .git). Kiểm tra `git diff`, chạy build, rồi commit/push branch và dùng Pull Request. Kiểm tra main chưa có commit mới ngoài snapshot đã gửi; nếu đã có, đối chiếu những thay đổi đó trước khi chép đè.

Bản ZIP không chứa node_modules, dist, .git, .env, .mcp.json, opencode.jsonc; các thiết lập riêng của IDE/AI không liên quan đến runtime nên không đưa vào bản chia sẻ. Không xóa các cấu hình đó trong repo của bạn khi thực hiện copy.
