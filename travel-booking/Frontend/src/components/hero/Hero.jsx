import { useState } from "react";

/**
 * Hero — "Now Boarding" travel hero
 *
 * Design concept: instead of a generic stock photo + search bar, the
 * hero's signature element is a boarding pass / itinerary ticket —
 * grounded directly in the travel-booking subject. A dotted flight path
 * with a moving plane connects origin and destination, the card has a
 * die-cut perforated edge like a real paper ticket, and a barcode runs
 * along the stub. Stats are reframed as ticket fields (flights, cities,
 * rating) instead of a generic stat row.
 *
 * Palette: deep ocean navy + teal (the "sky/sea" half of travel) against
 * a warm coral accent (the "sun" half) and a paper-white ticket card.
 * Type: Big Shoulders Display (poster/signage, condensed & bold — the
 * kind of face you'd see on an airport departure board) for headlines,
 * Inter for body copy, IBM Plex Mono for all ticket/data fields.
 */

const POPULAR_ROUTES = [
  { code: "BAL", city: "Bali" },
  { code: "PAR", city: "Paris" },
  { code: "TYO", city: "Tokyo" },
  { code: "CPT", city: "Cape Town" },
  { code: "RIO", city: "Rio" },
];

const TICKET_FIELDS = [
  { label: "Destinations", value: "500+" },
  { label: "Travelers", value: "2.1M" },
  { label: "Rating", value: "4.9/5" },
];

function FontImports() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

      .hero-display { font-family: 'Big Shoulders Display', sans-serif; }
      .hero-mono { font-family: 'IBM Plex Mono', monospace; }
      .hero-body { font-family: 'Inter', sans-serif; }

      @keyframes fly-across {
        0%   { left: 4%; opacity: 0; }
        8%   { opacity: 1; }
        92%  { opacity: 1; }
        100% { left: 92%; opacity: 0; }
      }
      .plane-fly {
        animation: fly-across 4.5s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .plane-fly { animation: none; left: 50%; opacity: 1; }
      }
    `}</style>
  );
}

function EyebrowStamp() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#F4B860]/60 bg-white/5 px-4 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B4A]" />
      <span className="hero-mono text-[11px] tracking-[0.25em] text-[#F4B860] uppercase">
        Now Boarding · 500+ Destinations
      </span>
    </div>
  );
}

function DestinationSearch() {
  const [destination, setDestination] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-8 flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-2 backdrop-blur-sm sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3">
        <span className="hero-mono text-xs text-[#8AA3AC]">TO</span>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Where do you want to go?"
          className="hero-body w-full bg-transparent text-sm text-white placeholder:text-[#8AA3AC] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="hero-display shrink-0 rounded-xl bg-[#FF6B4A] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.03] hover:bg-[#ff7d5f] active:scale-[0.98]"
      >
        Search Flights
      </button>
    </form>
  );
}

function PopularRoutes() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="hero-mono text-[11px] uppercase tracking-widest text-[#8AA3AC] mr-1">
        Trending:
      </span>
      {POPULAR_ROUTES.map((r) => (
        <button
          key={r.code}
          className="hero-mono flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#E6ECEE] transition-colors hover:border-[#FF6B4A]/60 hover:text-[#FF6B4A]"
        >
          <span className="text-[#F4B860]">{r.code}</span>
          <span className="text-[#8AA3AC]">·</span>
          {r.city}
        </button>
      ))}
    </div>
  );
}

function Barcode() {
  const bars = Array.from({ length: 38 }, (_, i) => i);
  return (
    <div className="flex h-8 items-end gap-[2px] opacity-70">
      {bars.map((i) => (
        <div
          key={i}
          className="bg-[#0A1F2C]"
          style={{
            width: i % 5 === 0 ? "3px" : "1.5px",
            height: `${40 + ((i * 37) % 60)}%`,
          }}
        />
      ))}
    </div>
  );
}

function BoardingPassCard() {
  return (
    <div className="relative w-full max-w-md">
      {/* perforated edge dots (top) */}
      <div className="absolute -top-2 left-6 right-6 flex justify-between">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="h-3 w-3 rounded-full bg-[#0D2B3E]" />
        ))}
      </div>

      <div className="rounded-[28px] bg-[#F7F4EE] p-6 shadow-2xl shadow-black/40 sm:p-8">
        {/* header */}
        <div className="flex items-center justify-between border-b border-dashed border-[#0A1F2C]/20 pb-4">
          <div>
            <p className="hero-display text-xl font-extrabold uppercase tracking-tight text-[#0A1F2C]">
              Wanderline Air
            </p>
            <p className="hero-mono text-[10px] uppercase tracking-[0.2em] text-[#5C6B70]">
              Boarding Pass · Economy Wander
            </p>
          </div>
          <span className="hero-mono rounded bg-[#0A1F2C] px-2 py-1 text-[10px] uppercase tracking-widest text-[#F4B860]">
            Confirmed
          </span>
        </div>

        {/* route */}
        <div className="relative mt-6 flex items-center justify-between">
          <div>
            <p className="hero-mono text-[11px] uppercase tracking-widest text-[#5C6B70]">
              From
            </p>
            <p className="hero-display text-4xl font-extrabold text-[#0A1F2C]">
              HOME
            </p>
          </div>

          <div className="relative mx-3 h-6 flex-1 overflow-hidden">
            <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-[#0A1F2C]/25" />
            <span className="plane-fly hero-display absolute top-1/2 -translate-y-1/2 text-lg text-[#FF6B4A]">
              ✈
            </span>
          </div>

          <div className="text-right">
            <p className="hero-mono text-[11px] uppercase tracking-widest text-[#5C6B70]">
              To
            </p>
            <p className="hero-display text-4xl font-extrabold text-[#FF6B4A]">
              WILD
            </p>
          </div>
        </div>

        {/* fields */}
        <div className="mt-6 grid grid-cols-3 divide-x divide-dashed divide-[#0A1F2C]/20 border-y border-dashed border-[#0A1F2C]/20 py-4">
          {TICKET_FIELDS.map((f) => (
            <div key={f.label} className="px-2 text-center first:pl-0 last:pr-0">
              <p className="hero-display text-2xl font-bold text-[#0A1F2C]">
                {f.value}
              </p>
              <p className="hero-mono text-[10px] uppercase tracking-widest text-[#5C6B70]">
                {f.label}
              </p>
            </div>
          ))}
        </div>

        {/* stub */}
        <div className="mt-5 flex items-center justify-between">
          <Barcode />
          <p className="hero-mono text-[10px] uppercase tracking-widest text-[#5C6B70]">
            No Baggage
            <br />
            Just Go
          </p>
        </div>
      </div>

      {/* perforated edge dots (bottom) */}
      <div className="absolute -bottom-2 left-6 right-6 flex justify-between">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="h-3 w-3 rounded-full bg-[#0D2B3E]" />
        ))}
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1F2C] via-[#0F3D4E] to-[#0D2B3E] py-16 sm:py-20">
      <FontImports />

      {/* faint dotted world-map texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
          {/* Left content */}
          <div>
            <EyebrowStamp />

            <h1 className="hero-display mt-6 text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl">
              Find Flights,
              <br />
              Stays &amp;{" "}
              <span className="text-[#FF6B4A]">Stories</span>
              <br />
              Worth Telling
            </h1>

            <p className="hero-body mt-6 max-w-lg text-lg leading-relaxed text-[#B9C7CC]">
              Book flights, hotels, and holiday packages at the best prices.
              We handle the logistics — you just show up with a passport.
            </p>

            <DestinationSearch />
            <PopularRoutes />
          </div>

          {/* Right: boarding pass */}
          <div className="flex justify-center lg:justify-end">
            <div className="rotate-[-2deg] transition-transform duration-500 hover:rotate-0">
              <BoardingPassCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;