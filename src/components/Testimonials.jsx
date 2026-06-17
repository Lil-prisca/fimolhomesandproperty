import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Kenneth Obasi",
    role: "",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    text: "Fimol homes and properties is a very professional and highly organized company whose goals and objectives resonate with me. Their ability to deliver value in the Real Estate space is quite commendable. I have been privileged to be a part of the company and have grown with the company in leaps and bounds . The property I enlisted for in their Estate in Ido is high was 1million per plot last year is now worth N3.5million per plot seeing my investment post a very healthy return in less than a year. I am super delighted about the growth opportunity the company presents. I am a big ambassador of the brand and intend to invest more into their upcoming and current estates.",
    rating: 5,
    property: "Land",
  },
  {
    name: "Chinyere Okafor",
    role: "Property Investor, Lagos",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    text: "Fimol Homes & Properties found me a prime land  that I had been searching for over a year. Their team's market knowledge and attention to detail is unmatched. I've since completed three more transactions through them.",
    rating: 5,
    property: "Land",
  },
  {
    name: "Emeka Nwachukwu",
    role: "CEO, TechVenture Group",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    text: "Buying a commercial property is complex, but the Fimol Homes & Properties team made it seamless. From due diligence to title documentation, everything was handled with absolute professionalism. I couldn't be more satisfied.",
    rating: 5,
    property: "Commercial Plaza",
  },
  {
    name: "Adaeze Mensah",
    role: "Architect & Homeowner",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    text: "As an architect, I have very particular taste in properties. Fimol Homes & Properties understood my brief completely and presented options I genuinely loved. My residence exceeded every expectation.",
    rating: 5,
    property: "House, ",
  },
  {
    name: "Biodun Adeleke",
    role: "Finance Director, First National",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    text: "Their investment intelligence reports are exceptional. I was able to evaluate the ROI on three properties before making a decision. Within 18 months, my  home had appreciated by 34%. Phenomenal team.",
    rating: 5,
    property: "House",
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 1l2.163 4.38L15 6.18l-3.5 3.41.826 4.81L8 12.1l-4.326 2.3L4.5 9.59 1 6.18l4.837-.8L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((prev) => (prev + 1) % testimonials.length),
      7000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(27,110,191,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 40%, rgba(43,156,219,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-10 bg-blue-400" />
            <span className="section-label">Client Stories</span>
            <div className="h-px w-10 bg-blue-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-black"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Avatar stack / selector */}
          {/* <div className="lg:col-span-2 flex flex-row lg:flex-col gap-4 overflow-x-auto pb-2 lg:pb-0">
            {testimonials.map((t, i) => (
              <motion.button
                key={t.name}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 flex-shrink-0 text-left ${
                  active === i
                    ? "glass border border-blue-500/40"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className={`object-cover rounded-full transition-all duration-300 ${
                      active === i
                        ? "ring-2 ring-blue-400"
                        : "opacity-60 grayscale"
                    }`}
                    sizes="48px"
                  />
                </div>
                <div className="hidden lg:block min-w-0">
                  <div
                    className={`text-sm font-semibold truncate ${active === i ? "text-white" : "text-white/50"}`}
                  >
                    {t.name}
                  </div>
                  <div className="text-xs text-white/35 truncate">{t.role}</div>
                </div>
                {active === i && (
                  <motion.div
                    layoutId="indicator"
                    className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"
                  />
                )}
              </motion.button>
            ))}
          </div> */}

          {/* Quote card */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-3xl p-8 lg:p-10 relative overflow-hidden"
              >
                {/* Large quote mark */}
                <div className="absolute top-6 right-8 font-display text-[120px] leading-none text-blue-500/10 select-none pointer-events-none">
                  "
                </div>

                <Stars count={testimonials[active].rating} />

                <blockquote className="font-display text-xl lg:text-2xl text-white/90 leading-relaxed mt-5 mb-8 relative">
                  "{testimonials[active].text}"
                </blockquote>

                <div className="flex items-center gap-4">
                  {/* <div className="relative w-14 h-14">
                    <img
                      src={testimonials[active].avatar}
                      alt={testimonials[active].name}
                      fill
                      className="object-cover rounded-full ring-2 ring-blue-400"
                      sizes="56px"
                    />
                  </div> */}
                  <div>
                    <div className="font-semibold text-white text-base">
                      {testimonials[active].name}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">
                      {testimonials[active].role}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <svg
                        className="w-3 h-3 text-blue-400"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6A4.5 4.5 0 0 0 8 1.5zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-blue-300/70 text-xs">
                        {testimonials[active].property}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex gap-2 mt-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === active ? "w-8 bg-blue-400" : "w-2 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
