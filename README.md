# HOANG LONG AI — Website

Website thương hiệu cá nhân và doanh nghiệp công nghệ HOANG LONG AI.
Ba ngôn ngữ: Tiếng Việt (`/`), English (`/en/`), 繁體中文 (`/zh-tw/`).

Công nghệ: Next.js 16 (App Router, xuất tĩnh), React 19, TypeScript. Không cần máy chủ hay cơ sở dữ liệu — chạy được trên Vercel, Netlify, Cloudflare Pages hoặc bất kỳ hosting tĩnh nào.

## Chạy thử trên máy

```bash
npm install
npm run dev        # mở http://localhost:3000
```

## Xuất bản

```bash
npm run build      # tạo thư mục out/ chứa toàn bộ website
```

**Vercel (khuyến nghị):** vào vercel.com → Add New Project → chọn repo này → Deploy. Không cần cấu hình gì thêm. Sau đó thêm tên miền ở mục Settings → Domains.

## Chỉnh nội dung

| Muốn sửa | File |
| --- | --- |
| Email, Zalo, LINE, Facebook, tên miền, ảnh chân dung | `src/lib/site.ts` |
| Mọi chữ trên trang (3 ngôn ngữ) | `src/lib/i18n.ts` |
| Bài viết blog | `src/lib/posts.ts` |
| Sản phẩm 3D (tên, mô tả, thông số) | `src/lib/i18n.ts` → mục `products` |
| Hình dạng mô hình 3D | `src/components/Products3D.tsx` |
| Ảnh đầu trang | `public/hero-portrait.webp` |
| Màu sắc, font, khoảng cách | `src/app/globals.css` (phần *Tokens* ở đầu file) |

**Thêm ảnh chân dung:** chép ảnh vào `public/portrait.jpg` (tỷ lệ 4:5), rồi trong `src/lib/site.ts` đổi `portrait: null` thành `portrait: "/portrait.jpg"`.

## Cần làm trước khi đưa lên mạng

- [ ] Thêm link Facebook vào `src/lib/site.ts` (đang để trống nên nút Facebook bị ẩn).
- [ ] Đọc lại phần "Về tôi" trong `src/lib/i18n.ts` và viết lại theo câu chuyện thật của bạn.
- [ ] Kiểm tra câu "phản hồi trong vòng một ngày làm việc" có đúng với cách bạn làm việc không.
- [ ] Khi có tên miền riêng, đổi `url` trong `src/lib/site.ts`.

## Sản phẩm 3D

Bốn mô hình hiện tại là **mẫu minh họa** được dựng bằng code (bánh răng, gá kẹp, mặt bích, trục bậc) và có nhãn "Mô hình mẫu minh họa" trên trang.
Khi có sản phẩm thật, xuất file `.glb` từ phần mềm CAD, đặt vào `public/models/`, rồi thay hàm dựng mô hình tương ứng bằng `GLTFLoader` của Three.js.

## Giao diện sáng / tối

Nút mặt trời / mặt trăng trên thanh menu. Mặc định là giao diện tối; lựa chọn của khách được lưu trên trình duyệt của họ.
Màu của giao diện sáng nằm trong khối `html[data-theme="light"]` ở đầu `src/app/globals.css`.

## Form liên hệ

Hiện tại form mở ứng dụng email của khách với nội dung đã điền sẵn — không cần máy chủ.
Khi muốn lưu yêu cầu vào cơ sở dữ liệu (ví dụ Supabase) hoặc gửi thông báo, sửa hàm `submit` trong `src/components/ContactForm.tsx`.

## Cấu trúc

```
src/
  app/(vi)/        Trang tiếng Việt (/, /blog/...)
  app/[lang]/      Trang tiếng Anh và tiếng Trung (/en, /zh-tw)
  app/globals.css  Toàn bộ giao diện
  components/      Header, Hero, form, bản vẽ kỹ thuật...
  lib/             Nội dung, ngôn ngữ, cấu hình
design-system/     Ghi chú hệ thống thiết kế
```
