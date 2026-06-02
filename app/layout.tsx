import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Back Nine Recovery — Premium Golf Recovery Kits",
  description:
    "Premium recovery kits built for golfers who walk, grind, sweat, and still want to finish strong. Blister prevention, hydration, sun protection, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#FAFAF8] font-sans antialiased">
        <CartProvider>
          {/* Free shipping banner */}
          <div className="bg-[#C9A84C] text-black text-center py-2 px-4 text-xs sm:text-sm font-medium tracking-wide z-50 relative">
            Free shipping on orders over $75 &nbsp;·&nbsp; Use code{" "}
            <span className="font-bold">BACKNINE10</span> for 10% off your first
            order
          </div>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
