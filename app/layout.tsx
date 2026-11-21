import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Note Flow",
  description: "Manage your developer notes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <div className="p-8">{children}</div>
      </body>
    </html>
  );
}
