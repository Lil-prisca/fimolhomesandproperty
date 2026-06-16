import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Property Inspection",
    desc: "We mobilize our clients on a guided inspection tour to view their desired property firsthand, ensuring full transparency before any commitment.",
  },
  {
    number: "02",
    title: "Documentation & Verification",
    desc: "Our legal team verifies all title documents and ensures every property meets regulatory standards before proceeding to acquisition.",
  },
  {
    number: "03",
    title: "Payment & Processing",
    desc: "We offer flexible payment plans tailored to your financial situation, with secure processing and full receipts at every stage.",
  },
  {
    number: "04",
    title: "Allocation Event",
    desc: "We organize timely property allocation events for all our projects in batches, where clients are formally allocated to their properties.",
  },
];

const LandAcquisition = () => {
  return (
    <section className=" text-white min-h-screen">
      {/* Hero */}
      <div className="h-[60vh] lg:h-[80vh] relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90"
            alt="Land Acquisition"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-[#020B18]/70 to-[#020B18]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020B18]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-blue-400" />
            <span className="section-label">Land Acquisition</span>
          </motion.div>
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white max-w-3xl mb-6"
          >
            A Remarkable
            <span className="block text-gradient">Acquisition Experience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-white/60 text-lg max-w-xl leading-relaxed mb-10"
          >
            Get a glimpse of how we make property acquisition seamless for our
            clients — right from inspection to allocation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link to="/allproperties?type=Land" className="btn-primary">
              Browse Land Listings
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Steps */}
      <div className=" bg-white max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="  flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-blue-400" />
            <span className="section-label">How It Works</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-black">
            From Inspection to Allocation
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 font-display text-5xl font-bold text-white/5 group-hover:text-white/8 transition-colors">
                {step.number}
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-display font-bold text-sm mb-5">
                {step.number}
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main content — text + video */}
      <div className="bg-white relative py-8">
        <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:justify-around gap-10 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-blue-400" />
                <span className="section-label">Inspection & Allocation</span>
              </div>
              <h2 className="font-display text-4xl font-bold text-black mb-6 leading-tight">
                From Property Inspection
                <span className="block text-gradient">
                  To Allocation Events
                </span>
              </h2>
              <div className="max-w-120 space-y-4 text-black/60 leading-relaxed mb-8">
                <p>
                  We conduct property inspections for all our projects where we
                  mobilize our clients on an inspection tour for a full view of
                  their desired property — no surprises, complete transparency.
                </p>
                <p>
                  We organize timely property allocation events for all our
                  projects in batches, where clients are formally allocated to
                  their properties with all necessary documentation handled on
                  the spot.
                </p>
              </div>
            </motion.div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="glass rounded-2xl overflow-hidden border border-white/10 aspect-6.5/16 max-h-200">
                <iframe
                  src="https://www.tiktok.com/embed/v2/7636363098927942920"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  scrolling="no"
                  className="w-full h-full"
                />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-400/10 rounded-full blur-lg" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className=" mt-15 lg:mt-10"
          >
            <div className=" mx-auto  glass rounded-2xl overflow-hidden border border-white/10 aspect-6.5/16 max-h-200">
              <iframe
                src="https://www.tiktok.com/embed/v2/7582916832546376981"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                scrolling="no"
                className="w-full h-full"
              />
            </div>

            {/* Decorative */}
            {/* <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-400/10 rounded-full blur-lg" /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandAcquisition;
