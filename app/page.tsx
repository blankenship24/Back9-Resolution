"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import StarRating from "@/components/StarRating";

const BENEFITS = [
  {
    emoji: "🩹",
    title: "Prevent Blisters",
    description:
      "Medical-grade blister prevention pads protect the hot spots every walker knows too well — before they become a problem.",
  },
  {
    emoji: "💧",
    title: "Stay Hydrated",
    description:
      "Electrolyte packets keep you sharp on the back nine when fatigue and heat start creeping in. Crisp flavors, no sugar crash.",
  },
  {
    emoji: "💪",
    title: "Reduce Soreness",
    description:
      "Muscle recovery balm and resistance band stretching target the hips, back, and legs that bear the load of a full walking round.",
  },
  {
    emoji: "☀️",
    title: "Protect Your Skin",
    description:
      "Clean-formula SPF sticks go on without greasing your grip. Because sun damage shouldn't be the price of a great round.",
  },
  {
    emoji: "🤝",
    title: "Improve Comfort",
    description:
      "Hand repair cream, grip tape, and cooling towels add up to a round where you're thinking about golf — not your body.",
  },
];

const TESTIMONIALS = [
  {
    name: "Brian C.",
    detail: "12 handicap · Walks 3x per week",
    stars: 5,
    text: "I've tried putting together my own recovery bag for years — a tube of this, a packet of that rolling around the bottom of my bag. The Weekend Walker Kit is exactly what I wish existed ten years ago. Everything fits, everything works, and my feet actually feel fine the next morning.",
  },
  {
    name: "Lisa M.",
    detail: "Bought as a gift for husband",
    stars: 5,
    text: "My husband is obsessed. He played a 36-hole day at a golf trip in Scottsdale using the Tournament Kit and said it was the first time he felt genuinely recovered by dinner. He's already on his second order. I'm getting one for my dad next.",
  },
  {
    name: "Carlos R.",
    detail: "7 handicap · Club competitor",
    stars: 5,
    text: "The grip tape alone changed my game during a wet stretch of weather. My grips were shot and I was losing confidence at impact. Two rolls later, problem solved. The muscle balm before bed after a tournament round is also legit — woke up without the usual hip stiffness. These guys clearly play golf.",
  },
];

const FAQS = [
  {
    q: "What's in the kits?",
    a: "Each kit is curated around a specific type of round. The Weekend Walker covers blisters, hydration, and sun protection. The Tournament Kit adds muscle recovery, grip tape, a resistance band, and a stretching guide. The Summer Survival Kit doubles down on heat management — extra electrolytes, SPF 50, cooling, and lip protection. Every item is chosen for portability and effectiveness — nothing filler.",
  },
  {
    q: "Can I customize my kit?",
    a: 'Absolutely. Head to our "Build Your Kit" page to handpick exactly the items you need. Choose from blister pads, cooling towels, electrolyte packets, sunscreen, muscle balm, resistance bands, grip tape, hand cream, and more. Your custom kit ships together in our signature packaging.',
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–5 business days. Orders over $75 ship free. We process same-day on orders placed before 2pm EST Monday–Friday. Expedited 2-day shipping is available at checkout for time-sensitive orders.",
  },
  {
    q: "Do you offer bulk or team orders?",
    a: "Yes! We work with golf clubs, tournament directors, and corporate outings regularly. Team orders of 10+ kits receive volume pricing. Email support@backninerecovery.com with your quantity and we'll send a custom quote within 24 hours.",
  },
  {
    q: "What's your return policy?",
    a: "We stand behind every kit. If you're not satisfied for any reason within 30 days of purchase, we'll refund you — no questions asked. Just reach out to support@backninerecovery.com. We only ask that you let us know what didn't work so we can keep improving.",
  },
];

export default function HomePage() {
  const [emailValue, setEmailValue] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (emailValue.trim()) {
      setSubscribed(true);
      setEmailValue("");
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1A3A2A] min-h-[85vh] flex items-center overflow-hidden">
        {/* Decorative golf-course pattern */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A2A] via-[#1e4a35] to-[#0f2419]" />
          {/* Fairway lines */}
          <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10">
            <div className="h-full bg-gradient-to-t from-green-400/30 to-transparent" />
          </div>
          {/* Circles — flag/hole motif */}
          <div className="absolute top-12 right-12 w-80 h-80 border border-white/5 rounded-full" />
          <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full" />
          <div className="absolute top-28 right-28 w-48 h-48 border border-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-96 h-96 border border-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-72 h-72 border border-white/5 rounded-full" />
          {/* Grid dots */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className="absolute w-0.5 h-0.5 bg-white/10 rounded-full"
                style={{
                  top: `${10 + row * 12}%`,
                  left: `${5 + col * 8}%`,
                }}
              />
            ))
          )}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/20 border border-[#C9A84C]/40 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
              Premium Golf Recovery
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
            Recover Better.{" "}
            <span className="text-[#C9A84C]">Play the Back Nine</span>{" "}
            Stronger.
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            Premium recovery kits built for golfers who walk, grind, sweat, and
            still want to finish strong.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#featured"
              className="bg-[#C9A84C] text-black font-semibold rounded-full px-8 py-4 hover:bg-[#b8942f] transition-all duration-200 active:scale-[0.98] text-base"
            >
              Shop Kits
            </Link>
            <Link
              href="/build-kit"
              className="border-2 border-white/60 text-white font-semibold rounded-full px-8 py-4 hover:bg-white/10 hover:border-white transition-all duration-200 text-base"
            >
              Build Your Kit
            </Link>
          </div>
          {/* Social proof */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {["bg-amber-500", "bg-green-600", "bg-blue-600"].map((c, i) => (
                  <div key={i} className={`w-7 h-7 ${c} rounded-full border-2 border-[#1A3A2A]`} />
                ))}
              </div>
              <span>2,400+ golfers recovering smarter</span>
            </div>
            <span className="hidden sm:block text-white/20">·</span>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>4.9 average rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section id="featured" className="py-20 sm:py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4">
              Our Recovery Kits
            </h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto rounded-full" />
            <p className="text-[#6B7280] mt-5 max-w-xl mx-auto leading-relaxed">
              Each kit is curated for a specific kind of golfer and a specific
              kind of round. No filler, no guesswork.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                shortDescription={product.shortDescription}
                gradient={product.gradient}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/build-kit"
              className="inline-flex items-center gap-2 text-[#1A3A2A] font-semibold hover:text-[#C9A84C] transition-colors text-sm"
            >
              Want something custom? Build your own kit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3">
              Why It Matters
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4">
              Built for Every Round
            </h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="bg-[#FAFAF8] rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{b.emoji}</div>
                <h3 className="font-semibold text-[#0D0D0D] mb-2 group-hover:text-[#1A3A2A] transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 sm:py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3">
              Real Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4">
              What Golfers Are Saying
            </h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <StarRating rating={t.stars} size="sm" />
                <p className="text-[#0D0D0D] text-sm leading-relaxed mt-4 mb-6 italic">
                  "{t.text}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-[#0D0D0D] text-sm">{t.name}</p>
                  <p className="text-[#6B7280] text-xs mt-0.5">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email Signup ── */}
      <section className="py-20 sm:py-24 bg-[#1A3A2A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">
            Exclusive Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get 10% Off Your First Kit
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Join thousands of golfers recovering smarter. Get the discount code,
            early access to new kits, and golf recovery tips straight to your
            inbox.
          </p>
          {subscribed ? (
            <div className="bg-[#C9A84C]/20 border border-[#C9A84C]/40 rounded-2xl px-8 py-6">
              <div className="text-3xl mb-3">🎉</div>
              <p className="text-white font-semibold mb-1">You're in!</p>
              <p className="text-white/70 text-sm">
                Check your inbox for your 10% discount code.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A84C] focus:bg-white/15 transition-all text-sm"
              />
              <button
                type="submit"
                className="bg-[#C9A84C] text-black font-semibold rounded-full px-7 py-3.5 hover:bg-[#b8942f] transition-all duration-200 active:scale-[0.98] text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-white/30 text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4">
              FAQ
            </h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto rounded-full" />
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#0D0D0D] pr-4">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#1A3A2A] shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[#6B7280] leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
