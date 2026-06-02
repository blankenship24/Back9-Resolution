"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface KitItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
}

const KIT_ITEMS: KitItem[] = [
  {
    id: "ki-blister",
    name: "Blister Prevention Pads",
    description: "Medical-grade cushioning pads for hot spots and friction zones.",
    price: 4,
    emoji: "🩹",
  },
  {
    id: "ki-towel",
    name: "Cooling Towel",
    description: "Instant-cooling microfiber towel — stays cold for up to 2 hours.",
    price: 8,
    emoji: "🌊",
  },
  {
    id: "ki-electrolyte",
    name: "Electrolyte Packets",
    description: "3-pack of low-sugar electrolyte mix. Crisp, not sweet.",
    price: 6,
    emoji: "⚡",
  },
  {
    id: "ki-sunscreen",
    name: "Sunscreen Stick (SPF 50)",
    description: "No-drip, grip-safe SPF 50 stick for face, neck, and ears.",
    price: 7,
    emoji: "☀️",
  },
  {
    id: "ki-balm",
    name: "Muscle Recovery Balm",
    description: "Deep-penetrating balm for sore hips, lower back, and calves.",
    price: 9,
    emoji: "💪",
  },
  {
    id: "ki-band",
    name: "Resistance Band",
    description: "Light resistance band for pre- and post-round stretching.",
    price: 10,
    emoji: "🔄",
  },
  {
    id: "ki-tape",
    name: "Golf Grip Tape (2 rolls)",
    description: "Re-grip tape for worn clubs. Easy peel-and-apply application.",
    price: 5,
    emoji: "🏌️",
  },
  {
    id: "ki-handcream",
    name: "Hand Repair Cream",
    description: "Fast-absorbing cream that repairs grip-worn hands overnight.",
    price: 8,
    emoji: "🤲",
  },
  {
    id: "ki-guide",
    name: "Mini Stretching Guide",
    description: "Illustrated 8-card guide of golf-specific recovery stretches.",
    price: 4,
    emoji: "📋",
  },
];

export default function BuildKitPage() {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [added, setAdded] = useState(false);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedItems = KIT_ITEMS.filter((item) => selected.has(item.id));
  const subtotal = selectedItems.reduce((s, item) => s + item.price, 0);

  function handleAddToCart() {
    if (selectedItems.length === 0) return;
    const kitName = `Custom Kit (${selectedItems.map((i) => i.name).join(", ")})`;
    addToCart({
      id: `custom-kit-${Date.now()}`,
      slug: "build-kit",
      name: kitName,
      price: subtotal,
      gradient: "from-green-800 to-green-600",
    }, true);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelected(new Set());
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Page header */}
      <div className="bg-[#1A3A2A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3">
            Customize
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Build Your Perfect Recovery Kit
          </h1>
          <p className="text-white/60 max-w-lg mx-auto leading-relaxed">
            Select the items you need. We&apos;ll handle the rest.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Items grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {KIT_ITEMS.map((item) => {
                const isSelected = selected.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-[#C9A84C] bg-[#C9A84C]/5 shadow-sm"
                        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    {/* Checkmark */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#C9A84C] rounded-full flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="text-2xl mb-3">{item.emoji}</div>
                    <h3 className="font-semibold text-[#0D0D0D] mb-1 pr-6">{item.name}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <p className={`font-bold text-sm ${isSelected ? "text-[#C9A84C]" : "text-[#1A3A2A]"}`}>
                      +${item.price}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-[#0D0D0D] text-lg mb-1">Your Kit</h2>
              <p className="text-xs text-[#6B7280] mb-5">
                {selectedItems.length === 0
                  ? "Select at least one item to get started."
                  : `${selectedItems.length} item${selectedItems.length !== 1 ? "s" : ""} selected`}
              </p>

              {selectedItems.length === 0 ? (
                <div className="text-center py-8 text-[#6B7280] text-sm border-2 border-dashed border-gray-100 rounded-xl">
                  <div className="text-3xl mb-2">🛍️</div>
                  <p>No items selected yet</p>
                  <p className="text-xs mt-1 text-gray-400">Click items on the left to add them</p>
                </div>
              ) : (
                <ul className="space-y-2 mb-5">
                  {selectedItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[#0D0D0D] flex items-center gap-2">
                        <span>{item.emoji}</span>
                        <span className="leading-snug">{item.name}</span>
                      </span>
                      <span className="text-[#6B7280] ml-3 shrink-0">${item.price}</span>
                    </li>
                  ))}
                </ul>
              )}

              {selectedItems.length > 0 && (
                <>
                  <div className="border-t border-gray-100 pt-4 mb-5">
                    <div className="flex justify-between items-center font-bold text-[#0D0D0D]">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    {subtotal >= 75 ? (
                      <p className="text-xs text-green-700 mt-1">🎉 You qualify for free shipping!</p>
                    ) : (
                      <p className="text-xs text-[#6B7280] mt-1">
                        Add ${75 - subtotal} more for free shipping
                      </p>
                    )}
                  </div>
                </>
              )}

              <button
                onClick={handleAddToCart}
                disabled={selectedItems.length === 0}
                className={`w-full rounded-full py-3.5 font-semibold text-sm transition-all duration-200 active:scale-[0.98] ${
                  added
                    ? "bg-[#1A3A2A] text-white"
                    : selectedItems.length === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#C9A84C] text-black hover:bg-[#b8942f]"
                }`}
              >
                {added
                  ? "✓ Kit Added to Cart!"
                  : selectedItems.length === 0
                  ? "Select at least one item"
                  : `Add Kit to Cart — $${subtotal}`}
              </button>
            </div>

            {/* Info card */}
            <div className="mt-4 bg-[#1A3A2A]/5 border border-[#1A3A2A]/10 rounded-2xl p-5">
              <p className="text-xs font-semibold text-[#1A3A2A] uppercase tracking-widest mb-2">
                How It Works
              </p>
              <ul className="space-y-2 text-xs text-[#6B7280]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C] font-bold mt-0.5">1.</span>
                  Select the recovery items you need
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C] font-bold mt-0.5">2.</span>
                  Review your kit summary
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C] font-bold mt-0.5">3.</span>
                  Add to cart and checkout — shipped together
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
