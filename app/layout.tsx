import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stoqr",
  description: "Agentic Warehousing & Transport Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
