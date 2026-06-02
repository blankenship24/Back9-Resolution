"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";
  const transparent = isHomePage && !scrolled && !menuOpen;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#featured", label: "Shop" },
    { href: "/build-kit", label: "Build Your Kit" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className={`text-base font-bold tracking-[0.15em] uppercase transition-colors ${
                transparent ? "text-white" : "text-[#1A3A2A]"
              }`}
            >
              Back Nine
            </span>
            <span
              className={`text-[10px] font-medium tracking-[0.25em] uppercase transition-colors ${
                transparent ? "text-white/70" : "text-[#C9A84C]"
              }`}
            >
              Recovery
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#C9A84C] ${
                  transparent
                    ? "text-white/90"
                    : pathname === link.href
                    ? "text-[#1A3A2A]"
                    : "text-[#6B7280]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Cart + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 rounded-full transition-colors hover:bg-black/10"
              aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  transparent ? "text-white" : "text-[#1A3A2A]"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C9A84C] text-black text-[10px] font-bold w-4.5 h-4.5 min-w-[1.1rem] min-h-[1.1rem] flex items-center justify-center rounded-full leading-none px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className={`md:hidden p-2 rounded-md transition-colors ${
                transparent ? "text-white" : "text-[#1A3A2A]"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#1A3A2A]/5 text-[#1A3A2A]"
                    : "text-[#6B7280] hover:text-[#1A3A2A] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="px-3 py-3 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#1A3A2A] hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              Cart
              {cartCount > 0 && (
                <span className="bg-[#C9A84C] text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
