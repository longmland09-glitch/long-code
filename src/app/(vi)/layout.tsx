import type { Viewport } from "next";
import type { ReactNode } from "react";
import Document from "@/components/Document";

export const viewport: Viewport = { themeColor: "#080F20", colorScheme: "dark" };

export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="vi">{children}</Document>;
}
