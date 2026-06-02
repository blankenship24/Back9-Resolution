import Link from "next/link";

export const metadata = {
  title: "About — Back Nine Recovery",
  description:
    "Back Nine Recovery was created by golfers who love the game but hate finishing rounds in pain. Learn our story.",
};

const VALUES = [
  {
    title: "Curated Quality",
    description:
      "Every item in every kit has been tested on the course. If it doesn't earn its place, it doesn't ship. No filler, no gimmicks — just the stuff that actually works.",
    icon: "✓",
  },
  {
    title: "Built for Golfers",
    description:
      "We're not a general wellness company that slapped a golf logo on a first-aid kit. We play. We walk. We know which hole your feet start complaining, and we built the kit accordingly.",
    icon: "⛳",
  },
  {
    title: "No Fluff",
    description:
      "Clean formulas, honest pricing, no subscription traps, no upsell gimmicks. You buy what you need, it ships fast, and it works. That's the whole deal.",
    icon: "◎",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A3A2A] py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 border border-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">
            Our Story
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
            We Built This for the Back Nine
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Because the last four holes shouldn&apos;t be a survival exercise.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">
                Where It Began
              </p>
              <h2 className="text-3xl font-bold text-[#0D0D0D] mb-6 leading-tight">
                Born on a Hot Saturday in July
              </h2>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>
                  Back Nine Recovery was created by golfers who love the game
                  but hate finishing rounds feeling like they need a week to
                  recover.
                </p>
                <p>
                  We&apos;ve all been there — blisters on hole 14, cramping on
                  16, sunburned and dehydrated by 18. You limp off the 18th
                  green, vow to never walk 18 again, and then book a tee time
                  for next Saturday because you love this stupid game.
                </p>
                <p>
                  We spent months sourcing and testing every item individually —
                  sunscreen that doesn&apos;t ruin your grip, blister pads that
                  actually stay on through 18 holes, electrolyte mixes that
                  taste like something you&apos;d want to drink — and built
                  curated kits so you can focus on your game, not your pain.
                </p>
                <p>
                  The name? Simple. We built this for the back nine. For hole 14
                  when your feet are burning. For 16 when your legs are shot.
                  For 18 when you still need to make a par to win the match.
                </p>
              </div>
            </div>

            {/* Decorative box */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1A3A2A] to-[#0f2419] rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                  {Array.from({ length: 5 }).map((_, row) =>
                    Array.from({ length: 5 }).map((_, col) => (
                      <div
                        key={`${row}-${col}`}
                        className="absolute w-0.5 h-0.5 bg-white/15 rounded-full"
                        style={{
                          top: `${15 + row * 18}%`,
                          left: `${15 + col * 18}%`,
                        }}
                      />
                    ))
                  )}
                  <div className="absolute top-8 right-8 w-32 h-32 border border-white/10 rounded-full" />
                  <div className="absolute bottom-8 left-8 w-48 h-48 border border-white/5 rounded-full" />
                </div>
                <div className="relative z-10 text-center px-8">
                  <div className="text-6xl mb-6">⛳</div>
                  <p className="text-white font-bold text-xl mb-2">
                    "Finish stronger."
                  </p>
                  <p className="text-white/50 text-sm">
                    That&apos;s the whole mission.
                  </p>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <p className="text-2xl font-bold text-[#1A3A2A]">2,400+</p>
                <p className="text-xs text-[#6B7280]">Golfers recovering smarter</p>
              </div>
              <div className="absolute -top-5 -right-5 bg-[#C9A84C] rounded-2xl shadow-lg p-4">
                <p className="text-2xl font-bold text-black">4.9★</p>
                <p className="text-xs text-black/70">Average rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4">
              Our Values
            </h2>
            <div className="w-12 h-1 bg-[#C9A84C] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <div
                key={i}
                className="bg-[#FAFAF8] rounded-2xl border border-gray-100 p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#1A3A2A] rounded-2xl flex items-center justify-center mb-5 text-white text-xl font-bold">
                  {value.icon}
                </div>
                <h3 className="font-bold text-[#0D0D0D] text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4">
            The Mission
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-6 leading-tight">
            Golf is Hard Enough
          </h2>
          <p className="text-[#6B7280] leading-relaxed text-lg mb-6">
            Physical discomfort shouldn&apos;t be part of the challenge. The
            mental game, the shot-making, the course management — that&apos;s
            the real test. Back Nine Recovery exists so that by hole 14, your
            only problem is reading the green, not managing your blisters.
          </p>
          <p className="text-[#6B7280] leading-relaxed">
            We&apos;ll never stop refining our kits, listening to golfers, and
            finding better products. If you have feedback, a product suggestion,
            or just want to tell us about the round that finally ended
            blister-free — we genuinely want to hear it.
          </p>
          <div className="mt-4">
            <a
              href="mailto:support@backninerecovery.com"
              className="text-[#1A3A2A] font-semibold hover:text-[#C9A84C] transition-colors"
            >
              support@backninerecovery.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#1A3A2A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Finish Stronger?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Find the kit that fits your game — or build your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#featured"
              className="bg-[#C9A84C] text-black font-semibold rounded-full px-8 py-4 hover:bg-[#b8942f] transition-all duration-200"
            >
              Shop Recovery Kits
            </Link>
            <Link
              href="/build-kit"
              className="border-2 border-white/60 text-white font-semibold rounded-full px-8 py-4 hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Build Your Kit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
