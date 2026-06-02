"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  shortDescription: string;
  gradient: string;
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  shortDescription,
  gradient,
}: ProductCardProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({ id, slug, name, price, gradient });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Gradient Image Placeholder */}
      <div
        className={`bg-gradient-to-br ${gradient} h-52 flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-16 h-16 border border-white/30 rounded-full" />
          <div className="absolute bottom-4 right-4 w-24 h-24 border border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="w-12 h-12 mx-auto mb-3 opacity-80">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
              <path d="M24 8 L24 40 M8 24 L40 24" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
            </svg>
          </div>
          <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
            Recovery Kit
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-[#0D0D0D] text-lg leading-tight group-hover:text-[#1A3A2A] transition-colors">
            {name}
          </h3>
          <span className="text-[#1A3A2A] font-bold text-lg ml-3 shrink-0">
            ${price}
          </span>
        </div>
        <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
          {shortDescription}
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href={`/products/${slug}`}
            className="block text-center border border-[#1A3A2A] text-[#1A3A2A] rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-[#1A3A2A] hover:text-white transition-all duration-200"
          >
            View Kit
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#C9A84C] text-black rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-[#b8942f] transition-all duration-200 active:scale-[0.98]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
