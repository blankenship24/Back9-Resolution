"use client";

import { useState, useEffect } from "react";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  total: number;
  status: string;
  items: OrderItem[];
}

interface Stats {
  orderCount: number;
  revenue: number;
  recentOrders: Order[];
  subscriberCount: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "back9admin") {
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password.");
    }
  }

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="flex flex-col leading-none mb-4 items-center">
              <span className="text-lg font-bold tracking-[0.15em] uppercase text-[#1A3A2A]">Back Nine</span>
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[#C9A84C]">Admin</span>
            </div>
            <p className="text-sm text-[#6B7280]">Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1A3A2A]"
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-[#1A3A2A] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#0f2419] transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0D0D0D]">Admin Dashboard</h1>
            <p className="text-sm text-[#6B7280]">Back Nine Recovery</p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="text-sm text-[#6B7280] hover:text-[#0D0D0D] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#1A3A2A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : stats ? (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { label: "Total Orders", value: stats.orderCount.toString(), color: "text-[#1A3A2A]" },
                { label: "Total Revenue", value: `$${stats.revenue.toFixed(2)}`, color: "text-[#C9A84C]" },
                { label: "Email Subscribers", value: stats.subscriberCount.toString(), color: "text-blue-600" },
                { label: "Avg. Order Value", value: stats.orderCount ? `$${(stats.revenue / stats.orderCount).toFixed(2)}` : "—", color: "text-purple-600" },
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">{card.label}</p>
                  <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Orders table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="font-bold text-[#0D0D0D]">Recent Orders</h2>
              </div>
              {stats.recentOrders.length === 0 ? (
                <div className="px-6 py-12 text-center text-[#6B7280] text-sm">No orders yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Order ID</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Date</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Customer</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Email</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Items</th>
                        <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Total</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map((order, i) => (
                        <tr key={order.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                          <td className="px-6 py-4 font-mono text-xs text-[#6B7280]">{order.id.slice(0, 8).toUpperCase()}</td>
                          <td className="px-6 py-4 text-[#6B7280]">
                            {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                          <td className="px-6 py-4 font-medium text-[#0D0D0D]">{order.name}</td>
                          <td className="px-6 py-4 text-[#6B7280]">{order.email}</td>
                          <td className="px-6 py-4 text-[#6B7280]">{order.items.reduce((s, item) => s + item.quantity, 0)}</td>
                          <td className="px-6 py-4 text-right font-semibold text-[#0D0D0D]">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              order.status === "fulfilled"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-[#6B7280]">Failed to load stats.</div>
        )}
      </div>
    </div>
  );
}
