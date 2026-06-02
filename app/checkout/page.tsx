"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

const SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 7.99;

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace("/cart");
    }
  }, [mounted, items.length, router]);

  const shipping = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = cartTotal + shipping;

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.name) newErrors.name = "Full name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.zip) newErrors.zip = "ZIP code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(form.zip))
      newErrors.zip = "Enter a valid ZIP code";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productSlug: item.product.slug,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to place order");
      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((errs) => { const n = { ...errs }; delete n[e.target.name]; return n; });
    }
  }

  if (!mounted || items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1A3A2A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Link href="/cart" className="text-[#6B7280] hover:text-[#1A3A2A] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D]">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-[#0D0D0D] text-lg mb-5">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0D0D0D] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1A3A2A] transition-colors ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0D0D0D] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1A3A2A] transition-colors ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-[#0D0D0D] text-lg mb-5">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0D0D0D] mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Fairway Dr"
                      className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1A3A2A] transition-colors ${
                        errors.address ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0D0D0D] mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Augusta"
                        className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1A3A2A] transition-colors ${
                          errors.city ? "border-red-400" : "border-gray-200"
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0D0D0D] mb-1.5">State</label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1A3A2A] transition-colors bg-white ${
                          errors.state ? "border-red-400" : "border-gray-200"
                        }`}
                      >
                        <option value="">Select state</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <label className="block text-sm font-medium text-[#0D0D0D] mb-1.5">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="30901"
                      maxLength={10}
                      className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1A3A2A] transition-colors ${
                        errors.zip ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm">
                  {submitError}
                </div>
              )}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-[#0D0D0D] text-lg mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0D0D0D] leading-tight">{item.product.name}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-[#0D0D0D] shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-[#6B7280]">
                    <span>Subtotal</span>
                    <span className="text-[#0D0D0D] font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#6B7280]">
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
                  <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
                    <span className="font-bold text-[#0D0D0D]">Total</span>
                    <span className="font-bold text-[#1A3A2A] text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9A84C] text-black rounded-full py-4 font-semibold hover:bg-[#b8942f] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order — $${total.toFixed(2)}`
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
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
        </form>
      </div>
    </div>
  );
}
