"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface OrderItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  items: OrderItem[];
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/orders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 animate-pulse space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto" />
            <div className="h-6 bg-gray-100 rounded-lg w-3/4 mx-auto" />
            <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto" />
            <div className="h-px bg-gray-100 w-full" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
              <div className="h-4 bg-gray-100 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[#0D0D0D] mb-2">Order Not Found</h1>
          <p className="text-[#6B7280] text-sm mb-6">{error || "We couldn't find this order."}</p>
          <Link
            href="/"
            className="bg-[#1A3A2A] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#0f2419] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const firstName = order.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-9 h-9 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] mb-2">Order Confirmed!</h1>
          <p className="text-[#6B7280] mb-4 leading-relaxed">
            Thank you, {firstName}! Your recovery kit is on its way.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#1A3A2A]/5 text-[#1A3A2A] text-sm font-medium px-4 py-2 rounded-full">
            <span className="text-xs text-[#6B7280]">Order</span>
            <span className="font-mono">{order.id.slice(0, 8).toUpperCase()}</span>
          </div>
          <p className="text-xs text-[#6B7280] mt-3">
            A confirmation will be sent to {order.email}
          </p>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-[#0D0D0D] mb-4">Order Details</h2>
          <div className="space-y-3 mb-5">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-[#0D0D0D]">{item.productName}</p>
                  <p className="text-xs text-[#6B7280]">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium text-[#0D0D0D]">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-[#6B7280]">
              <span>Subtotal</span>
              <span className="text-[#0D0D0D]">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#6B7280]">
              <span>Shipping</span>
              {order.shipping === 0 ? (
                <span className="text-green-700 font-medium">Free</span>
              ) : (
                <span className="text-[#0D0D0D]">${order.shipping.toFixed(2)}</span>
              )}
            </div>
            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
              <span className="font-bold text-[#0D0D0D]">Total</span>
              <span className="font-bold text-[#1A3A2A] text-xl">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="font-bold text-[#0D0D0D] mb-3">Shipping To</h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            {order.name}<br />
            {order.address}<br />
            {order.city}, {order.state} {order.zip}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 bg-[#1A3A2A] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#0f2419] transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <Link
            href="/#featured"
            className="flex-1 bg-[#C9A84C] text-black rounded-full px-6 py-3 font-semibold hover:bg-[#b8942f] transition-colors text-center"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
