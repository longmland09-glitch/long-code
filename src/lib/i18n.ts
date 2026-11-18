export const locales = ["vi", "en", "zh-tw"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

/** Locales served under /[lang]; Vietnamese lives at the site root. */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale);

export const htmlLang: Record<Locale, string> = {
  vi: "vi",
  en: "en",
  "zh-tw": "zh-Hant-TW",
};

export const localeLabel: Record<Locale, { short: string; name: string }> = {
  vi: { short: "VI", name: "Tiếng Việt" },
  en: { short: "EN", name: "English" },
  "zh-tw": { short: "中文", name: "繁體中文" },
};

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Path prefix for a locale: "" for Vietnamese, "/en" etc. otherwise. */
export function base(locale: Locale) {
  return locale === defaultLocale ? "" : `/${locale}`;
}

type Item = { title: string; body: string; tags?: string[] };

const vi = {
  meta: {
    title: "HOANG LONG AI — Công nghệ, AI và giải pháp kinh doanh",
    description:
      "Hoang Long ứng dụng trí tuệ nhân tạo, thiết kế 2D/3D, CAD/CAM, lập trình CNC và marketing số để tạo ra giải pháp thực tế cho cá nhân và doanh nghiệp tại Việt Nam và Đài Loan.",
  },
  nav: {
    about: "Về tôi",
    ai: "Giải pháp AI",
    engineering: "Kỹ thuật",
    marketing: "Marketing",
    business: "Hợp tác",
    blog: "Blog",
    contact: "Liên hệ",
    menu: "Mở menu",
    close: "Đóng menu",
    skip: "Bỏ qua, tới nội dung chính",
    language: "Ngôn ngữ",
  },
  hero: {
    tagline: "Technology · Innovation · Business",
    welcome: "Welcome to my digital world",
    lead: "Kết hợp trí tuệ nhân tạo, công nghệ và tư duy kinh doanh để phát triển những giải pháp thực tế.",
    primary: "Khám phá dịch vụ",
    secondary: "Liên hệ hợp tác",
  },
  pillars: [
    { code: "AI", label: "Trí tuệ nhân tạo", href: "#ai" },
    { code: "3D", label: "Thiết kế & kỹ thuật", href: "#engineering" },
    { code: "ADS", label: "Marketing số", href: "#marketing" },
    { code: "B2B", label: "Hợp tác kinh doanh", href: "#business" },
  ],
  about: {
    title: "Công nghệ chỉ có giá trị khi giải quyết được việc thật.",
    story: [
      "HOANG LONG AI bắt đầu từ một câu hỏi: làm sao để một cá nhân hay doanh nghiệp nhỏ dùng được công nghệ mới mà không cần một phòng IT?",
      "Câu trả lời của tôi là đứng ở giữa — hiểu công cụ AI, hiểu bản vẽ kỹ thuật và máy CNC, hiểu cả quảng cáo và bán hàng — để biến một yêu cầu mơ hồ thành sản phẩm cụ thể, có thể dùng ngay.",
    ],
    portraitAlt: "Chân dung Hoàng Minh Long, nhà sáng lập HOANG LONG AI",
    valuesTitle: "Điều khách hàng nhận được",
    values: [
      { title: "Một đầu mối", body: "AI, kỹ thuật và marketing trong cùng một người phụ trách. Không phải chuyển qua nhiều bên." },
      { title: "Giải pháp đo được", body: "Mỗi việc đều có kết quả cụ thể: giờ làm tiết kiệm, bản vẽ hoàn chỉnh, chi phí trên mỗi khách hàng." },
      { title: "Báo giá rõ ràng", body: "Phạm vi, thời gian và chi phí được thống nhất bằng văn bản trước khi bắt đầu." },
      { title: "Việt Nam – Đài Loan", body: "Phục vụ khách hàng và đối tác ở cả hai thị trường." },
    ] as Item[],
    visionTitle: "Định hướng",
    vision:
      "Phát triển HOANG LONG AI từ thương hiệu cá nhân thành một doanh nghiệp công nghệ: dịch vụ chuẩn hóa, mạng lưới cộng tác viên và hệ thống tự động tiếp nhận yêu cầu khách hàng.",
  },
  ai: {
    title: "Giải pháp AI",
    intro: "Đưa AI vào đúng chỗ trong công việc hằng ngày — nơi nó tiết kiệm thời gian nhiều nhất.",
    items: [
      { title: "AI tạo hình ảnh và video", body: "Ảnh sản phẩm, video quảng cáo ngắn và hình ảnh thương hiệu được tạo bằng AI, sau đó tinh chỉnh thủ công để đạt chuẩn đăng tải.", tags: ["Ảnh sản phẩm", "Video ngắn", "Nhận diện"] },
      { title: "AI tự động hóa công việc", body: "Chatbot trả lời khách hàng, tự động nhập liệu, tổng hợp báo cáo và xử lý những quy trình lặp đi lặp lại.", tags: ["Chatbot", "Nhập liệu", "Báo cáo"] },
      { title: "AI hỗ trợ marketing", body: "Lên ý tưởng chiến dịch, viết nội dung, thử nghiệm nhiều phiên bản quảng cáo và đọc số liệu nhanh hơn.", tags: ["Ý tưởng", "Nội dung", "Phân tích"] },
      { title: "Giải pháp nội dung số", body: "Kế hoạch và sản xuất nội dung đều đặn cho website, fanpage và kênh video của doanh nghiệp.", tags: ["Kế hoạch", "Sản xuất", "Đa kênh"] },
    ] as Item[],
  },
  engineering: {
    title: "Thiết kế & kỹ thuật",
    intro: "Từ ý tưởng trên giấy đến chi tiết gia công trên máy — một quy trình liền mạch.",
    pipeline: ["Bản vẽ 2D", "Mô hình 3D", "CAD/CAM", "Gia công CNC"],
    items: [
      { title: "Thiết kế 2D và 3D", body: "Bản vẽ kỹ thuật, mô hình 3D sản phẩm và hình ảnh trình bày cho khách hàng." },
      { title: "CAD/CAM", body: "Dựng mô hình chính xác và tạo đường chạy dao tối ưu cho vật liệu và máy." },
      { title: "Lập trình CNC", body: "Chương trình gia công được kiểm tra mô phỏng trước khi chạy thật, giảm lỗi và hao phí phôi." },
      { title: "Sản phẩm và dự án kỹ thuật", body: "Nhận dự án trọn gói hoặc từng phần: thiết kế, lập trình, tư vấn sản xuất." },
    ] as Item[],
    drawingCaption: "Bản vẽ chi tiết và đường chạy dao",
  },
  marketing: {
    title: "Marketing số",
    intro: "Xây thương hiệu và tìm khách hàng trên những kênh người Việt và người Đài Loan dùng mỗi ngày.",
    items: [
      { title: "Xây dựng thương hiệu", body: "Định vị, logo, bộ nhận diện và giọng nói nhất quán trên mọi kênh." },
      { title: "Quản lý quảng cáo", body: "Thiết lập, theo dõi và tối ưu ngân sách quảng cáo theo chi phí trên mỗi khách hàng." },
      { title: "Phát triển website", body: "Website nhanh, chuẩn SEO, hiển thị tốt trên điện thoại — như chính trang bạn đang xem." },
      { title: "Facebook, TikTok, YouTube", body: "Nội dung và quảng cáo được thiết kế riêng cho cách xem của từng nền tảng." },
    ] as Item[],
    channels: ["Facebook", "TikTok", "YouTube", "Google", "Zalo", "LINE"],
  },
  business: {
    title: "Hợp tác kinh doanh",
    intro: "Có nhiều cách để cùng làm việc — chọn hình thức phù hợp với bạn.",
    items: [
      { title: "Cơ hội hợp tác", body: "Cùng phát triển dự án công nghệ, chia sẻ nguồn lực và khách hàng." },
      { title: "Dịch vụ và sản phẩm", body: "Đặt dịch vụ AI, thiết kế kỹ thuật hoặc marketing theo gói hoặc theo dự án." },
      { title: "Đối tác kinh doanh", body: "Dành cho xưởng sản xuất, agency và doanh nghiệp muốn mở rộng năng lực công nghệ." },
      { title: "Cộng tác viên", body: "Giới thiệu khách hàng hoặc tham gia thực hiện dự án và nhận thù lao minh bạch." },
    ] as Item[],
    joinCta: "Đăng ký cộng tác viên",
    roadmapTitle: "Lộ trình phát triển",
    roadmap: [
      { title: "Xây dựng thương hiệu", body: "Logo, bộ nhận diện, website và hồ sơ năng lực." },
      { title: "Xây dựng dịch vụ", body: "AI, thiết kế 2D/3D, CNC, marketing và giải pháp công nghệ." },
      { title: "Phát triển kinh doanh", body: "Khách hàng Việt Nam và Đài Loan, đối tác và mạng lưới cộng tác viên." },
      { title: "Tự động hóa", body: "Chatbot AI tiếp nhận khách hàng, báo giá và quản lý yêu cầu dịch vụ." },
    ] as Item[],
    stage: "Giai đoạn",
  },
  blog: {
    title: "Blog",
    intro: "Ghi chép về công nghệ mới, ứng dụng AI, kinh doanh và kỹ thuật 2D/3D – CNC.",
    read: "Đọc bài viết",
    back: "Về trang chủ",
    allPosts: "Tất cả bài viết",
    minutes: "phút đọc",
    langNote: "",
  },
  contact: {
    title: "Bắt đầu một dự án",
    intro: "Nhắn trực tiếp qua kênh bạn quen dùng, hoặc gửi yêu cầu bên dưới. Tôi sẽ phản hồi trong vòng một ngày làm việc.",
    channels: { zalo: "Zalo", line: "LINE", facebook: "Facebook", email: "Email" },
    lineHint: "Bấm để chép số, rồi tìm trong LINE",
    copied: "Đã chép số LINE",
    form: {
      name: "Họ và tên",
      reach: "Số điện thoại hoặc email",
      reachHelp: "Để tôi liên hệ lại với bạn.",
      topic: "Bạn cần gì?",
      topics: ["Giải pháp AI", "Thiết kế 2D/3D – CNC", "Marketing & website", "Hợp tác kinh doanh", "Đăng ký cộng tác viên", "Khác"],
      message: "Mô tả ngắn",
      messageHelp: "Mục tiêu, thời gian mong muốn, ngân sách dự kiến (nếu có).",
      submit: "Gửi yêu cầu",
      required: "Vui lòng điền mục này.",
      sent: "Ứng dụng email của bạn đã được mở sẵn nội dung. Bấm Gửi trong email để hoàn tất — hoặc nhắn trực tiếp qua Zalo 0931 268 123.",
      subject: "Yêu cầu hợp tác",
    },
  },
  footer: {
    line: "Technology for the future",
    rights: "Bảo lưu mọi quyền.",
  },
};

export type Dict = typeof vi;

const en: Dict = {
  meta: {
    title: "HOANG LONG AI — Technology, AI and business solutions",
    description:
      "Hoang Long applies artificial intelligence, 2D/3D design, CAD/CAM, CNC programming and digital marketing to build practical solutions for individuals and businesses in Vietnam and Taiwan.",
  },
  nav: {
    about: "About",
    ai: "AI Solutions",
    engineering: "Engineering",
    marketing: "Marketing",
    business: "Partnership",
    blog: "Blog",
    contact: "Contact",
    menu: "Open menu",
    close: "Close menu",
    skip: "Skip to main content",
    language: "Language",
  },
  hero: {
    tagline: "Technology · Innovation · Business",
    welcome: "Welcome to my digital world",
    lead: "Combining artificial intelligence, technology and business thinking to build solutions that work in practice.",
    primary: "Explore services",
    secondary: "Start a partnership",
  },
  pillars: [
    { code: "AI", label: "Artificial Intelligence", href: "#ai" },
    { code: "3D", label: "Design & Engineering", href: "#engineering" },
    { code: "ADS", label: "Digital Marketing", href: "#marketing" },
    { code: "B2B", label: "Business Partnership", href: "#business" },
  ],
  about: {
    title: "Technology only matters when it solves real work.",
    story: [
      "HOANG LONG AI started with one question: how can an individual or a small business use new technology without an IT department?",
      "My answer is to stand in the middle — understanding AI tools, technical drawings and CNC machines, advertising and sales — and turn a vague request into a concrete product you can use right away.",
    ],
    portraitAlt: "Portrait of Hoang Minh Long, founder of HOANG LONG AI",
    valuesTitle: "What clients get",
    values: [
      { title: "One point of contact", body: "AI, engineering and marketing handled by one person. No hand-offs between vendors." },
      { title: "Measurable results", body: "Every job has a concrete outcome: hours saved, finished drawings, cost per customer." },
      { title: "Clear quotes", body: "Scope, timeline and price are agreed in writing before work begins." },
      { title: "Vietnam – Taiwan", body: "Serving clients and partners in both markets." },
    ],
    visionTitle: "Direction",
    vision:
      "Growing HOANG LONG AI from a personal brand into a technology company: standardized services, a network of collaborators and an automated system for handling client requests.",
  },
  ai: {
    title: "AI Solutions",
    intro: "Putting AI in the right places in everyday work — where it saves the most time.",
    items: [
      { title: "AI images and video", body: "Product photos, short ad videos and brand visuals generated with AI, then refined by hand to publishing quality.", tags: ["Product shots", "Short video", "Brand visuals"] },
      { title: "AI workflow automation", body: "Customer-service chatbots, automatic data entry, report generation and the repetitive processes in between.", tags: ["Chatbots", "Data entry", "Reports"] },
      { title: "AI for marketing", body: "Campaign ideas, copywriting, testing many ad variants and reading the numbers faster.", tags: ["Ideas", "Copy", "Analytics"] },
      { title: "Digital content", body: "Planning and producing steady content for your website, fan page and video channels.", tags: ["Planning", "Production", "Multi-channel"] },
    ],
  },
  engineering: {
    title: "Design & Engineering",
    intro: "From an idea on paper to a machined part — one continuous process.",
    pipeline: ["2D drawing", "3D model", "CAD/CAM", "CNC machining"],
    items: [
      { title: "2D and 3D design", body: "Technical drawings, 3D product models and presentation renders for clients." },
      { title: "CAD/CAM", body: "Precise modelling and toolpaths optimized for your material and machine." },
      { title: "CNC programming", body: "Machining programs verified in simulation before they run, reducing errors and wasted stock." },
      { title: "Engineering projects", body: "Full projects or individual stages: design, programming, production advice." },
    ],
    drawingCaption: "Part drawing and toolpath",
  },
  marketing: {
    title: "Digital Marketing",
    intro: "Building brands and finding customers on the channels people in Vietnam and Taiwan use every day.",
    items: [
      { title: "Brand building", body: "Positioning, logo, identity system and a consistent voice across every channel." },
      { title: "Ad management", body: "Setting up, monitoring and optimizing ad budgets around cost per customer." },
      { title: "Website development", body: "Fast, SEO-ready, mobile-first websites — like the one you are reading." },
      { title: "Facebook, TikTok, YouTube", body: "Content and ads designed for how each platform is actually watched." },
    ],
    channels: ["Facebook", "TikTok", "YouTube", "Google", "Zalo", "LINE"],
  },
  business: {
    title: "Business Partnership",
    intro: "There are several ways to work together — pick the one that fits.",
    items: [
      { title: "Partnership opportunities", body: "Co-develop technology projects and share resources and clients." },
      { title: "Services and products", body: "Order AI, engineering or marketing services as packages or per project." },
      { title: "Business partners", body: "For workshops, agencies and companies that want to extend their technology capability." },
      { title: "Collaborators", body: "Refer clients or join project delivery, with transparent compensation." },
    ],
    joinCta: "Apply as a collaborator",
    roadmapTitle: "Roadmap",
    roadmap: [
      { title: "Brand foundation", body: "Logo, identity, website and capability profile." },
      { title: "Service build-out", body: "AI, 2D/3D design, CNC, marketing and technology solutions." },
      { title: "Business growth", body: "Clients in Vietnam and Taiwan, partners and a collaborator network." },
      { title: "Automation", body: "An AI chatbot for client intake, quotes and service-request management." },
    ],
    stage: "Stage",
  },
  blog: {
    title: "Blog",
    intro: "Notes on new technology, applied AI, business and 2D/3D – CNC engineering.",
    read: "Read article",
    back: "Back to home",
    allPosts: "All articles",
    minutes: "min read",
    langNote: "Articles are currently written in Vietnamese.",
  },
  contact: {
    title: "Start a project",
    intro: "Message me on the channel you already use, or send a request below. I reply within one business day.",
    channels: { zalo: "Zalo", line: "LINE", facebook: "Facebook", email: "Email" },
    lineHint: "Tap to copy, then search it in LINE",
    copied: "LINE number copied",
    form: {
      name: "Full name",
      reach: "Phone or email",
      reachHelp: "So I can get back to you.",
      topic: "What do you need?",
      topics: ["AI solutions", "2D/3D design – CNC", "Marketing & website", "Business partnership", "Collaborator application", "Other"],
      message: "Short description",
      messageHelp: "Goals, preferred timeline, expected budget (if any).",
      submit: "Send request",
      required: "Please fill in this field.",
      sent: "Your email app has opened with the request filled in. Press Send there to finish — or message me directly on Zalo or LINE.",
      subject: "Partnership request",
    },
  },
  footer: {
    line: "Technology for the future",
    rights: "All rights reserved.",
  },
};

const zhTW: Dict = {
  meta: {
    title: "HOANG LONG AI — 科技、AI 與商業解決方案",
    description:
      "Hoang Long 結合人工智慧、2D/3D 設計、CAD/CAM、CNC 程式與數位行銷，為越南與台灣的個人及企業打造實用的解決方案。",
  },
  nav: {
    about: "關於我",
    ai: "AI 解決方案",
    engineering: "設計工程",
    marketing: "數位行銷",
    business: "商業合作",
    blog: "部落格",
    contact: "聯絡",
    menu: "開啟選單",
    close: "關閉選單",
    skip: "跳到主要內容",
    language: "語言",
  },
  hero: {
    tagline: "Technology · Innovation · Business",
    welcome: "Welcome to my digital world",
    lead: "結合人工智慧、科技與商業思維，打造真正落地的解決方案。",
    primary: "瀏覽服務",
    secondary: "洽談合作",
  },
  pillars: [
    { code: "AI", label: "人工智慧", href: "#ai" },
    { code: "3D", label: "設計與工程", href: "#engineering" },
    { code: "ADS", label: "數位行銷", href: "#marketing" },
    { code: "B2B", label: "商業合作", href: "#business" },
  ],
  about: {
    title: "科技的價值，在於解決真正的問題。",
    story: [
      "HOANG LONG AI 從一個問題開始：個人或小型企業，如何在沒有 IT 部門的情況下運用新科技？",
      "我的答案是站在中間——懂 AI 工具、懂工程圖與 CNC 機台，也懂廣告與銷售——把模糊的需求變成可以立即使用的具體成果。",
    ],
    portraitAlt: "HOANG LONG AI 創辦人 Hoang Minh Long 個人照",
    valuesTitle: "客戶能得到什麼",
    values: [
      { title: "單一窗口", body: "AI、工程與行銷由同一人負責，不必在多家廠商之間來回溝通。" },
      { title: "成果可衡量", body: "每項工作都有具體成果：節省的工時、完整的圖面、每位客戶的成本。" },
      { title: "報價透明", body: "範圍、時程與費用在開工前以書面確認。" },
      { title: "越南 – 台灣", body: "同時服務兩地市場的客戶與合作夥伴。" },
    ],
    visionTitle: "發展方向",
    vision: "讓 HOANG LONG AI 從個人品牌成長為科技公司：標準化服務、合作夥伴網路，以及自動化的客戶需求處理系統。",
  },
  ai: {
    title: "AI 解決方案",
    intro: "把 AI 放在日常工作中最能節省時間的地方。",
    items: [
      { title: "AI 圖像與影片", body: "以 AI 生成商品照、短影音廣告與品牌視覺，再經人工修飾達到可發布的品質。", tags: ["商品照", "短影音", "品牌視覺"] },
      { title: "AI 流程自動化", body: "客服聊天機器人、自動資料輸入、報表彙整，以及各種重複性流程。", tags: ["聊天機器人", "資料輸入", "報表"] },
      { title: "AI 行銷輔助", body: "更快地發想活動、撰寫文案、測試多版本廣告並解讀數據。", tags: ["發想", "文案", "分析"] },
      { title: "數位內容方案", body: "為網站、粉絲專頁與影音頻道規劃並穩定產出內容。", tags: ["規劃", "製作", "多平台"] },
    ],
  },
  engineering: {
    title: "設計與工程",
    intro: "從紙上的構想到機台上的成品——一條完整的流程。",
    pipeline: ["2D 圖面", "3D 模型", "CAD/CAM", "CNC 加工"],
    items: [
      { title: "2D 與 3D 設計", body: "工程圖、產品 3D 模型與提案用渲染圖。" },
      { title: "CAD/CAM", body: "精準建模，並依材料與機台產生最佳化刀具路徑。" },
      { title: "CNC 程式設計", body: "加工程式先經模擬驗證再上機，減少錯誤與材料浪費。" },
      { title: "工程專案", body: "可承接整案或單一階段：設計、程式、生產諮詢。" },
    ],
    drawingCaption: "零件圖面與刀具路徑",
  },
  marketing: {
    title: "數位行銷",
    intro: "在越南與台灣使用者每天使用的平台上，建立品牌、找到客戶。",
    items: [
      { title: "品牌建立", body: "定位、標誌、識別系統，以及跨平台一致的品牌語氣。" },
      { title: "廣告管理", body: "以每位客戶成本為核心，建置、追蹤並優化廣告預算。" },
      { title: "網站開發", body: "快速、符合 SEO、手機優先的網站——就像您正在瀏覽的這一個。" },
      { title: "Facebook、TikTok、YouTube", body: "依各平台的觀看習慣量身設計內容與廣告。" },
    ],
    channels: ["Facebook", "TikTok", "YouTube", "Google", "Zalo", "LINE"],
  },
  business: {
    title: "商業合作",
    intro: "合作方式不只一種——選擇最適合您的。",
    items: [
      { title: "合作機會", body: "共同開發科技專案，分享資源與客戶。" },
      { title: "服務與產品", body: "以方案或專案方式委託 AI、工程設計或行銷服務。" },
      { title: "企業夥伴", body: "適合希望擴充科技能力的工廠、代理商與企業。" },
      { title: "合作夥伴招募", body: "推薦客戶或參與專案執行，報酬公開透明。" },
    ],
    joinCta: "申請成為合作夥伴",
    roadmapTitle: "發展藍圖",
    roadmap: [
      { title: "品牌建立", body: "標誌、識別系統、網站與能力簡介。" },
      { title: "服務建置", body: "AI、2D/3D 設計、CNC、行銷與科技解決方案。" },
      { title: "業務拓展", body: "越南與台灣客戶、企業夥伴與合作網路。" },
      { title: "自動化", body: "以 AI 聊天機器人處理客戶接洽、報價與服務需求管理。" },
    ],
    stage: "階段",
  },
  blog: {
    title: "部落格",
    intro: "關於新科技、AI 應用、商業經驗與 2D/3D – CNC 技術的筆記。",
    read: "閱讀文章",
    back: "回到首頁",
    allPosts: "所有文章",
    minutes: "分鐘閱讀",
    langNote: "文章目前以越南文撰寫。",
  },
  contact: {
    title: "開始一個專案",
    intro: "透過您慣用的平台直接聯繫，或在下方送出需求。我會在一個工作天內回覆。",
    channels: { zalo: "Zalo", line: "LINE", facebook: "Facebook", email: "Email" },
    lineHint: "點擊複製號碼，再到 LINE 搜尋",
    copied: "已複製 LINE 號碼",
    form: {
      name: "姓名",
      reach: "電話或 Email",
      reachHelp: "方便我回覆您。",
      topic: "您需要什麼？",
      topics: ["AI 解決方案", "2D/3D 設計 – CNC", "行銷與網站", "商業合作", "申請合作夥伴", "其他"],
      message: "簡短說明",
      messageHelp: "目標、希望時程、預估預算（如有）。",
      submit: "送出需求",
      required: "請填寫此欄位。",
      sent: "已開啟您的郵件程式並填好內容，請在郵件中按下傳送即可完成——或直接透過 LINE 聯繫我。",
      subject: "合作需求",
    },
  },
  footer: {
    line: "Technology for the future",
    rights: "版權所有。",
  },
};

export const dictionaries: Record<Locale, Dict> = { vi, en, "zh-tw": zhTW };
