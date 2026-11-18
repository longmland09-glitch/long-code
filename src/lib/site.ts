/**
 * Thông tin liên hệ và tên miền — sửa tại đây, toàn bộ website sẽ tự cập nhật.
 * Contact details and domain — edit here; the whole site picks them up.
 */
export const site = {
  name: "HOANG LONG AI",
  /** Tên miền chính thức (không có dấu / ở cuối). */
  url: "https://long-code.vercel.app",
  owner: "Hoàng Minh Long",

  contact: {
    /** Email nhận yêu cầu hợp tác. */
    email: "longcode@gmail.com",
    /** Số điện thoại Zalo, viết liền, ví dụ 0901234567. */
    zaloPhone: "0931268123",
    /** Số điện thoại đăng ký LINE (khách tìm bằng số này trong LINE). */
    linePhone: "0928681344",
    /** Đường dẫn trang Facebook. Để trống "" thì nút Facebook được ẩn. */
    facebook: "" as string,
  },

  /**
   * Ảnh chân dung: đặt file vào /public (ví dụ /public/portrait.jpg)
   * rồi ghi "/portrait.jpg" ở đây. Để null thì hiển thị khối chữ ký "H".
   */
  portrait: "/portrait.webp" as string | null,
} as const;

export const links = {
  zalo: `https://zalo.me/${site.contact.zaloPhone}`,
  facebook: site.contact.facebook,
  email: `mailto:${site.contact.email}`,
};
