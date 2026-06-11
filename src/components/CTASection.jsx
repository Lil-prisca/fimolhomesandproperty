import { motion } from "framer-motion";
import gettingland from "../assets/Mangettingland.jpeg";

const WHATSAPP_NUMBER = "2348144169686";
// const PHONE_NUMBER = "+2348144169686";

const whatsappMessage = encodeURIComponent(
  `Hi, I'm interested in Investing in a  Property. Please provide more details.`,
);

export default function CTASection() {
  return (
    <section id="contact" className="py-24 lg:py-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* BG image */}
          <div className="absolute inset-0">
            <img
              // src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85"
              src={gettingland}
              alt="Luxury property"
              className="h-full w-full object-cover object-center"
              // sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020B18]/95 via-[#041629]/80 to-[#0A2A4A]/60" />
          </div>

          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ boxShadow: "inset 0 0 80px rgba(43,156,219,0.1)" }}
          />

          {/* Content */}
          <div className="relative z-10 p-12 lg:p-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-10 bg-blue-400" />
                <span className="section-label">Start Your Journey</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Your Perfect
                <span className="text-gradient block">Property Awaits</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-white/60 text-base lg:text-lg leading-relaxed mb-10"
              >
                Browse our complete catalogue of verified homes, villas, and
                land for sale. And let our experts help you close the deal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#properties"
                  className="btn-primary text-base py-4 px-10 justify-center"
                >
                  Browse All Listings
                  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="tel:+2348001234567"
                  className="btn-outline text-base py-4 px-10 justify-center"
                >
                  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 2h3l1.5 3.5-1.75 1.05A10.5 10.5 0 007.45 9.5L8.5 7.75 12 9.25v2.75C12 13.5 10.5 14 9.75 14 4.75 14 2 9.25 2 4.25 2 3.5 2.5 2 4 2z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Speak to an Agent
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex gap-3 rounded-3xl  px-10 justify-center text-center text-[18px] py-4"
                  style={{
                    background: "linear-gradient(135deg,#25D366,#128C7E)",
                    boxShadow: "0 0 20px rgba(37,211,102,0.25)",
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.11 1.523 5.84L.057 23.426a.75.75 0 00.918.918l5.587-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.967 0-3.806-.536-5.38-1.468l-.386-.23-3.994 1.048 1.048-3.994-.23-.386A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Book Inspection
                </a>
              </motion.div>

              {/* Urgency badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="mt-8 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative w-8 h-8 rounded-full border-2 border-[#041629] overflow-hidden"
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-white/50 text-sm">
                  <span className="text-white font-semibold">150+ clients</span>
                  found their property this month
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
