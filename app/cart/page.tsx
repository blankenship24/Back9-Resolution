"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";

const SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 7.99;

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart();

  const shipping = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = cartTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-[#E8E8E4] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0D0D0D] mb-3">Your cart is empty</h1>
          <p className="text-[#6B7280] mb-8 leading-relaxed">
            You haven&apos;t added anything yet. Browse our recovery kits or build a custom one.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#featured"
              className="bg-[#1A3A2A] text-white rounded-full px-8 py-3.5 font-semibold hover:bg-[#0f2419] transition-all"
            >
              Shop Kits
            </Link>
            <Link
              href="/build-kit"
              className="border-2 border-[#1A3A2A] text-[#1A3A2A] rounded-full px-8 py-3.5 font-semibold hover:bg-[#1A3A2A] hover:text-white transition-all"
            >
              Build Your Kit
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D]">
            Your Cart
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-5 items-start"
              >
                {/* Color placeholder */}
                <div
                  className={`bg-gradient-to-br ${item.product.gradient} w-20 h-20 rounded-xl shrink-0 flex items-center justify-center`}
                >
                  <svg className="w-8 h-8 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeOpacity="0.7" />
                    <circle cx="12" cy="12" r="5" strokeWidth="1" strokeOpacity="0.5" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0D0D0D] leading-tight mb-1 text-sm sm:text-base">
                    {item.product.name}
                  </h3>
                  {item.customKit && (
                    <span className="inline-block bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-medium px-2 py-0.5 rounded-full mb-2">
                      Custom Kit
                    </span>
                  )}
                  <p className="text-[#6B7280] text-sm">${item.product.price} each</p>

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                    <QuantitySelector
                      quantity={item.quantity}
                      onDecrease={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      onIncrease={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      min={1}
                      max={10}
                    />
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-[#0D0D0D]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <div className="pt-2">
              <Link
                href="/#featured"
                className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A3A2A] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#0D0D0D] text-lg mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal</span>
                  <span className="text-[#0D0D0D] font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-700 font-medium">Free</span>
                  ) : (
                    <span className="text-[#0D0D0D] font-medium">${SHIPPING_COST.toFixed(2)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#6B7280] bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    Add ${(SHIPPING_THRESHOLD - cartTotal).toFixed(2)} more for free shipping
                  </p>
                )}
                {shipping === 0 && (
                  <p className="text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                    🎉 You qualify for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0D0D0D]">Total</span>
                  <span className="font-bold text-[#1A3A2A] text-xl">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => alert("Checkout coming soon!")}
                className="w-full bg-[#C9A84C] text-black rounded-full py-4 font-semibold hover:bg-[#b8942f] transition-all duration-200 active:scale-[0.98] mb-3"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/#featured"
                className="block w-full text-center border-2 border-gray-200 text-[#6B7280] rounded-full py-3.5 text-sm font-medium hover:border-[#1A3A2A] hover:text-[#1A3A2A] transition-all"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { icon: "🔒", label: "Secure checkout" },
                { icon: "↩️", label: "30-day returns" },
                { icon: "🚚", label: "Fast shipping" },
                { icon: "⛳", label: "Golf-tested" },
              ].map((b, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 px-3 py-2.5 flex items-center gap-2">
                  <span className="text-base">{b.icon}</span>
                  <span className="text-xs text-[#6B7280] font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
