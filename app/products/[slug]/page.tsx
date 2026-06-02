"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import StarRating from "@/components/StarRating";
import QuantitySelector from "@/components/QuantitySelector";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: ReturnType<typeof getProductBySlug> & object }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  function handleAddToCart() {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        gradient: product.gradient,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#1A3A2A] transition-colors">
              Home
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#featured" className="hover:text-[#1A3A2A] transition-colors">
              Shop
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#0D0D0D] font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <section className="py-12 sm:py-16 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div>
              <div
                className={`bg-gradient-to-br ${product.gradient} rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden`}
              >
                {/* Decorative */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute top-8 left-8 w-32 h-32 border border-white/30 rounded-full" />
                  <div className="absolute bottom-8 right-8 w-48 h-48 border border-white/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full" />
                </div>
                <div className="relative z-10 text-center px-8">
                  <div className="w-20 h-20 mx-auto mb-5 opacity-70">
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="40" cy="40" r="34" stroke="white" strokeWidth="2" strokeOpacity="0.6" />
                      <circle cx="40" cy="40" r="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
                      <path d="M40 10 L40 70 M10 40 L70 40" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                      <circle cx="40" cy="40" r="6" fill="white" fillOpacity="0.5" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-base font-semibold tracking-wide uppercase">
                    Recovery Kit
                  </span>
                  <p className="text-white/50 text-sm mt-2">{product.name}</p>
                </div>
              </div>

              {/* What's included */}
              <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-[#0D0D0D] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#1A3A2A] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  What&apos;s Included
                </h3>
                <ul className="space-y-2.5">
                  {product.whatsIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#6B7280]">
                      <svg
                        className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="flex items-start gap-4 mb-3">
                <StarRating rating={avgRating} size="sm" />
                <span className="text-xs text-[#6B7280]">
                  ({product.reviews.length} reviews)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-3">
                {product.name}
              </h1>

              <div className="text-3xl font-bold text-[#1A3A2A] mb-5">
                ${product.price}
                <span className="text-sm font-normal text-[#6B7280] ml-2">
                  per kit
                </span>
              </div>

              <p className="text-[#6B7280] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Who it's for */}
              <div className="bg-[#1A3A2A]/5 border border-[#1A3A2A]/10 rounded-2xl p-5 mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1A3A2A] mb-2">
                  Who It&apos;s For
                </p>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {product.whoItsFor}
                </p>
              </div>

              {/* Quantity + Add to cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
                    Quantity
                  </label>
                  <QuantitySelector
                    quantity={quantity}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                    onIncrease={() => setQuantity((q) => Math.min(10, q + 1))}
                    min={1}
                    max={10}
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`w-full rounded-full py-4 font-semibold text-base transition-all duration-200 active:scale-[0.98] ${
                    added
                      ? "bg-[#1A3A2A] text-white"
                      : "bg-[#C9A84C] text-black hover:bg-[#b8942f]"
                  }`}
                >
                  {added ? "✓ Added to Cart!" : `Add to Cart — $${product.price * quantity}`}
                </button>
                <Link
                  href="/cart"
                  className="block w-full text-center border-2 border-[#1A3A2A] text-[#1A3A2A] rounded-full py-3.5 font-semibold hover:bg-[#1A3A2A] hover:text-white transition-all duration-200"
                >
                  View Cart
                </Link>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-gray-100">
                {[
                  { icon: "🚚", label: "Free shipping", sub: "Orders over $75" },
                  { icon: "↩️", label: "30-day returns", sub: "No questions asked" },
                  { icon: "⛳", label: "Made for golf", sub: "By golfers" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <p className="text-xs font-semibold text-[#0D0D0D]">{item.label}</p>
                    <p className="text-xs text-[#6B7280]">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-3">
              <StarRating rating={avgRating} size="md" />
              <span className="font-semibold text-[#0D0D0D]">{avgRating.toFixed(1)} out of 5</span>
              <span className="text-[#6B7280] text-sm">({product.reviews.length} reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#FAFAF8] rounded-2xl border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <StarRating rating={review.rating} size="sm" />
                  {review.verified && (
                    <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full font-medium">
                      Verified
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-[#0D0D0D] mb-2">{review.title}</h4>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{review.body}</p>
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0D0D0D]">{review.name}</p>
                    {review.handicap && (
                      <p className="text-xs text-[#6B7280]">{review.handicap}</p>
                    )}
                  </div>
                  <p className="text-xs text-[#6B7280]">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other kits */}
      <section className="py-16 bg-[#FAFAF8] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-6">More Recovery Kits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className={`bg-gradient-to-br ${p.gradient} h-24 rounded-xl mb-4`} />
                <h3 className="font-semibold text-[#0D0D0D] group-hover:text-[#1A3A2A] transition-colors text-sm mb-1">
                  {p.name}
                </h3>
                <p className="text-[#1A3A2A] font-bold">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
