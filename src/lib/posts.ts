/**
 * Bài viết blog. Thêm bài mới bằng cách thêm một phần tử vào mảng `posts`.
 * Mỗi đoạn trong `body` là một đoạn văn; dòng bắt đầu bằng "## " là tiêu đề phụ.
 */
export type Post = {
  slug: string;
  title: string;
  /** Tiêu đề hiển thị ở bản tiếng Anh / tiếng Trung của trang chủ. */
  titleEn: string;
  titleZh: string;
  category: string;
  date: string; // YYYY-MM-DD
  minutes: number;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "tu-dong-hoa-bang-ai-bat-dau-tu-dau",
    title: "Tự động hóa bằng AI: bắt đầu từ đâu?",
    titleEn: "AI automation: where to start",
    titleZh: "AI 自動化：從哪裡開始？",
    category: "Ứng dụng AI",
    date: "2026-11-10",
    minutes: 4,
    excerpt:
      "Đừng bắt đầu bằng công cụ. Hãy bắt đầu bằng việc lặp lại nhiều nhất trong tuần của bạn.",
    body: [
      "Phần lớn doanh nghiệp nhỏ thất bại với AI không phải vì công cụ kém, mà vì chọn sai việc để tự động hóa. Một chatbot đẹp nhưng không ai hỏi thì vẫn là chi phí.",
      "## Bước 1: Ghi lại một tuần làm việc",
      "Trong năm ngày, ghi lại mọi việc bạn hoặc nhân viên làm quá ba lần: trả lời cùng một câu hỏi của khách, chép số liệu từ tin nhắn sang bảng tính, soạn báo giá theo mẫu. Đây là danh sách ứng viên.",
      "## Bước 2: Chấm điểm theo thời gian và rủi ro",
      "Với mỗi việc, ước lượng số giờ mỗi tháng và hậu quả nếu làm sai. Việc tốn nhiều giờ nhưng sai một chút cũng không sao — như phân loại tin nhắn, tóm tắt cuộc họp — là nơi nên bắt đầu.",
      "## Bước 3: Làm một bản thử trong hai tuần",
      "Chọn đúng một việc. Dựng phiên bản đơn giản nhất, cho người thật dùng và đo lại số giờ. Nếu không tiết kiệm được ít nhất 30%, hãy dừng và chọn việc khác thay vì cố hoàn thiện.",
      "Tự động hóa tốt thường không gây ấn tượng. Nó chỉ làm cho một việc nhàm chán biến mất.",
    ],
  },
  {
    slug: "tu-ban-ve-2d-den-chi-tiet-cnc",
    title: "Từ bản vẽ 2D đến chi tiết CNC: quy trình 4 bước",
    titleEn: "From 2D drawing to CNC part: a 4-step process",
    titleZh: "從 2D 圖面到 CNC 零件：四個步驟",
    category: "Hướng dẫn 2D/3D & CNC",
    date: "2026-10-28",
    minutes: 5,
    excerpt:
      "Phần lớn lỗi gia công bắt nguồn từ bản vẽ, không phải từ máy. Đây là cách giữ cho dữ liệu sạch từ đầu đến cuối.",
    body: [
      "Khi một chi tiết gia công bị sai, người ta thường nghi máy hoặc dao. Nhưng rất nhiều lần, lỗi đã nằm sẵn trong bản vẽ từ đầu: thiếu dung sai, kích thước trùng lặp, hoặc gốc tọa độ không rõ ràng.",
      "## 1. Bản vẽ 2D có chủ đích",
      "Chọn một mặt chuẩn và ghi kích thước từ đó. Mỗi kích thước chỉ xuất hiện một lần. Ghi rõ dung sai ở những chỗ thật sự cần lắp ghép.",
      "## 2. Mô hình 3D làm nguồn dữ liệu duy nhất",
      "Dựng mô hình 3D từ bản vẽ và coi mô hình là bản gốc. Mọi chỉnh sửa sau này đều sửa trên mô hình, rồi xuất lại bản vẽ — không sửa tay trên bản in.",
      "## 3. CAM: chọn chiến lược trước, thông số sau",
      "Quyết định thứ tự gia công — phá thô, bán tinh, tinh — và cách kẹp phôi trước khi chỉnh tốc độ hay bước tiến. Một chiến lược sai không thể cứu bằng thông số tốt.",
      "## 4. Mô phỏng trước khi chạy thật",
      "Chạy mô phỏng toàn bộ chương trình, kiểm tra va chạm với đồ gá và phần vật liệu còn sót. Vài phút mô phỏng rẻ hơn rất nhiều so với một phôi hỏng hay một con dao gãy.",
    ],
  },
  {
    slug: "quang-cao-tiktok-doanh-nghiep-nho-nen-do-gi",
    title: "Quảng cáo TikTok cho doanh nghiệp nhỏ: nên đo những gì?",
    titleEn: "TikTok ads for small businesses: what to measure",
    titleZh: "小型企業的 TikTok 廣告：該追蹤哪些數字？",
    category: "Kinh nghiệm kinh doanh",
    date: "2026-10-12",
    minutes: 4,
    excerpt:
      "Lượt xem cao không trả tiền thuê nhà. Ba con số quyết định một chiến dịch có đáng chạy tiếp hay không.",
    body: [
      "TikTok dễ khiến người mới hài lòng với những con số lớn: hàng chục nghìn lượt xem, hàng nghìn lượt thích. Nhưng doanh nghiệp nhỏ chỉ cần quan tâm đến những con số dẫn tới đơn hàng.",
      "## Tỷ lệ xem hết 3 giây đầu",
      "Nếu người xem lướt qua ngay, phần còn lại của video không còn ý nghĩa. Thử nhiều câu mở đầu khác nhau cho cùng một nội dung trước khi tăng ngân sách.",
      "## Chi phí cho mỗi tin nhắn hoặc mỗi lượt để lại thông tin",
      "Đây là con số gần với doanh thu nhất mà nền tảng đo được. So sánh nó với lợi nhuận trung bình của một đơn hàng để biết mức trần bạn chấp nhận được.",
      "## Tỷ lệ chốt đơn từ tin nhắn",
      "Con số này nằm ngoài TikTok — trong Zalo, LINE hay sổ bán hàng của bạn. Một chiến dịch rẻ nhưng mang về khách không mua vẫn là chiến dịch đắt.",
      "Ghi ba con số này mỗi tuần vào một bảng tính đơn giản. Sau một tháng, bạn sẽ biết nên tăng, giữ hay dừng.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
