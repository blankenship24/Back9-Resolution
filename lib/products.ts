export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  handicap?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  whatsIncluded: string[];
  whoItsFor: string;
  gradient: string;
  reviews: Review[];
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "weekend-walker-kit",
    name: "The Weekend Walker Kit",
    price: 39,
    shortDescription:
      "Everything you need for a comfortable 18 holes — blister prevention, hydration, and sun protection in one compact kit.",
    description:
      "Designed for the golfer who loves walking the course but always ends up paying for it afterward. The Weekend Walker Kit addresses the most common discomforts of a walking round: blisters, dehydration, and sun damage. Every item was chosen for portability and effectiveness, so you spend more time thinking about your swing and less time thinking about your feet.",
    whatsIncluded: [
      "Blister prevention pads (6 pack)",
      "Cooling towel",
      "Electrolyte packets (3)",
      "SPF 30 sunscreen stick",
      "Hand repair cream",
    ],
    whoItsFor:
      "Casual golfers who walk 9–18 holes on weekends. If you love the walk but hate finishing with sore feet and tired hands, this kit is for you.",
    gradient: "from-green-800 to-green-600",
    category: "recovery",
    reviews: [
      {
        id: "r1-1",
        name: "Mark T.",
        rating: 5,
        date: "March 12, 2025",
        title: "Finally, no more blisters on hole 14",
        body: "I've been a weekend walker for 15 years and blisters were just something I accepted. Used the blister pads from this kit for the first time last Saturday — absolutely zero hot spots through all 18. The cooling towel is also a game changer when it's humid.",
        verified: true,
        handicap: "14 handicap",
      },
      {
        id: "r1-2",
        name: "Sarah K.",
        rating: 5,
        date: "April 3, 2025",
        title: "Perfect all-in-one kit",
        body: "Bought this for my husband and he loves it. He used to just tough it out through blisters and sunburn. Now he actually recovers properly and says his next round feels much better. The electrolyte packets are surprisingly good — not overly sweet.",
        verified: true,
        handicap: "Gift for husband",
      },
      {
        id: "r1-3",
        name: "Dave R.",
        rating: 4,
        date: "May 18, 2025",
        title: "Solid kit for the price",
        body: "Good value at $39. The sunscreen stick is excellent — goes on clean without getting on your grip. Hand cream is quality too. Only reason I didn't give 5 stars is I wish it came with more electrolyte packets, but that's a minor thing. Will buy again.",
        verified: true,
        handicap: "18 handicap",
      },
    ],
  },
  {
    id: "2",
    slug: "tournament-recovery-kit",
    name: "The Tournament Recovery Kit",
    price: 69,
    shortDescription:
      "The complete performance recovery kit for serious players. Everything you need to stay sharp across multi-day events.",
    description:
      "When every stroke counts, recovery isn't optional. The Tournament Recovery Kit was built for competitive players who face the physical demands of back-to-back rounds — tight muscles, worn-down grip, sun exposure, and the kind of fatigue that shows up in your short game by day two. This is the most comprehensive kit we offer, and every item earns its place.",
    whatsIncluded: [
      "Blister prevention pads (12 pack)",
      "Premium cooling towel",
      "Electrolyte packets (6)",
      "SPF 50 sunscreen stick",
      "Muscle recovery balm",
      "Resistance band",
      "Golf grip tape (2 rolls)",
      "Hand repair cream",
      "Mini stretching guide",
    ],
    whoItsFor:
      "Competitive players who grind through long rounds or multi-day tournaments. Built to keep you performing from hole 1 to 18, day after day.",
    gradient: "from-gray-900 to-green-900",
    category: "recovery",
    reviews: [
      {
        id: "r2-1",
        name: "Chris M.",
        rating: 5,
        date: "February 28, 2025",
        title: "Used it through a 54-hole event — incredible",
        body: "Played a 3-day member-guest and used this kit throughout. The muscle recovery balm before bed each night made a noticeable difference by day three. Usually my hands are wrecked by the final round — hand cream fixed that. The resistance band stretching routine in the guide actually helped my hip turn too. Worth every penny.",
        verified: true,
        handicap: "4 handicap",
      },
      {
        id: "r2-2",
        name: "Pete L.",
        rating: 5,
        date: "April 21, 2025",
        title: "Best golf purchase I've made this year",
        body: "I was skeptical about a 'recovery kit' but my buddy swore by his and finally convinced me. The grip tape alone is worth it — my grips were getting slick and the tape gave me confidence back. Everything feels curated and high quality, not drugstore filler.",
        verified: true,
        handicap: "7 handicap",
      },
      {
        id: "r2-3",
        name: "Jennifer W.",
        rating: 5,
        date: "May 2, 2025",
        title: "Bought one for every serious golfer I know",
        body: "This is my third order — I keep buying them as gifts for the golfers in my life. My husband used it through our club championship and said his body felt 10 years younger by the final round. The premium cooling towel is noticeably better than the one in the basic kit. Highly recommend for anyone who plays regularly.",
        verified: true,
        handicap: "12 handicap",
      },
    ],
  },
  {
    id: "3",
    slug: "summer-survival-kit",
    name: "The Summer Survival Kit",
    price: 49,
    shortDescription:
      "Built for hot rounds. Sun protection, hydration, and cooling essentials to help you survive — and thrive — in summer heat.",
    description:
      "Summer golf is a different game. The heat drains you, the sun punishes you, and by the back nine you're fighting your body as much as the course. The Summer Survival Kit focuses on the three things that matter most in summer conditions: sun protection, hydration, and cooling. Everything in this kit is lightweight, portable, and designed for the bag.",
    whatsIncluded: [
      "SPF 50 sunscreen stick",
      "Cooling towel",
      "Electrolyte packets (5)",
      "Blister pads (6 pack)",
      "Lip balm with SPF",
      "Hand repair cream",
    ],
    whoItsFor:
      "Golfers playing in summer heat. If you're battling sun, sweat, and dehydration on hot days, this kit has everything you need to survive and thrive.",
    gradient: "from-amber-700 to-green-700",
    category: "recovery",
    reviews: [
      {
        id: "r3-1",
        name: "Tom B.",
        rating: 5,
        date: "June 5, 2025",
        title: "Absolute lifesaver in the Texas heat",
        body: "Playing golf in July in Texas is brutal. This kit kept me going. Five electrolyte packets meant I was properly hydrated all round. The SPF 50 stick goes on smooth — no greasy hands messing with my grip. Cooling towel around my neck on the back nine was the difference between finishing strong and cramping up on 16.",
        verified: true,
        handicap: "11 handicap",
      },
      {
        id: "r3-2",
        name: "Amy G.",
        rating: 5,
        date: "June 19, 2025",
        title: "The lip balm with SPF is underrated",
        body: "Sounds like a small thing but my lips always get fried on summer rounds. The SPF lip balm in this kit is legitimately good — not waxy, tastes fine, and actually works. Everything else is excellent too but that little detail made me feel like the kit was actually thought through by golfers.",
        verified: true,
        handicap: "22 handicap",
      },
      {
        id: "r3-3",
        name: "Randy H.",
        rating: 4,
        date: "July 7, 2025",
        title: "Great for summer scrambles and member-guests",
        body: "Played a charity scramble last week in 95-degree heat and this kit was in my bag. Cooling towel was a crowd favorite in our foursome. The electrolyte packets kept me sharp on the back nine when everyone else was fading. Knocked one star off only because I wish it had the muscle balm from the tournament kit, but I understand the focus.",
        verified: true,
        handicap: "16 handicap",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
