import "./globals.css";
import Header from "@/components/common/Header";
import FloatingCta from "@/components/common/FloatingCta";

export const metadata = {
  title: "Sellability",
  description: "Real Estate Frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body cz-shortcut-listen="true">
        <Header />
        {children}
        <FloatingCta />
        </body>
      
    </html>
  );
}