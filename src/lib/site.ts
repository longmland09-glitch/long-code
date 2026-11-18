/**
 * Thông tin liên hệ và tên miền — sửa tại đây, toàn bộ website sẽ tự cập nhật.
 * Contact details and domain — edit here; the whole site picks them up.
 */
export const site = {
  name: "HOANG LONG AI",
  /** Tên miền chính thức (không có dấu / ở cuối). */
  url: "https://hoanglongai.com",
  owner: "Hoang Long",

  contact: {
    /** Email nhận yêu cầu hợp tác. */
    email: "contact@hoanglongai.com",
    /** Số điện thoại Zalo, viết liền, ví dụ 0901234567. */
    zaloPhone: "0900000000",
    /** LINE ID (không có @ hay ~). */
    lineId: "hoanglongai",
    /** Đường dẫn trang Facebook. */
    facebook: "https://facebook.com/hoanglongai",
  },

  /**
   * Ảnh chân dung: đặt file vào /public (ví dụ /public/portrait.jpg)
   * rồi ghi "/portrait.jpg" ở đây. Để null thì hiển thị khối chữ ký "H".
   */
  portrait: null as string | null,
} as const;

export const links = {
  zalo: `https://zalo.me/${site.contact.zaloPhone}`,
  line: `https://line.me/ti/p/~${site.contact.lineId}`,
  facebook: site.contact.facebook,
  email: `mailto:${site.contact.email}`,
};
