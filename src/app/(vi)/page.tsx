import Home from "@/components/Home";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata("vi");

export default function Page() {
  return <Home locale="vi" />;
}
