import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WHATSAPP_NUMBER = "2348144169686";
const PHONE_NUMBER = "+2348144169686";
const PHONE_NUMBER2 = "+2348119692684";
const PHONE_NUMBER3 = "+2347045149357";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Email",
    value: "info@fimolhome.ng",
    href: "mailto:info@fimolhome.ng",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Phone",
    value: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER}`,
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Office",
    value: "Lagos, Nigeria",
    href: null,
  },
];

const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error } = await supabase.from("enquiries").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      status: "new",
    });

    if (error) {
      console.error("Enquiry error:", error.message);
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  const whatsappMessage = encodeURIComponent(
    "Hi, I found you on your website and I'd like to make an enquiry about your properties.",
  );

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />

      {/* Hero */}
      <section className="  relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=90"
            alt="Contact Us"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-[#020B18]/70 to-[#020B18]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020B18]/80 via-transparent to-transparent" />
        </div>

        <div className="  relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-blue-400" />
            <span className="section-label">Get In Touch</span>
          </motion.div>
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white max-w-2xl"
          >
            Let's Start a
            <span className="block text-gradient">Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-white/60 text-lg max-w-xl leading-relaxed mt-6"
          >
            Whether you're buying, selling, or simply exploring — our team is
            ready to help you find exactly what you need.
          </motion.p>
        </div>
      </section>

      {/* Contact info cards */}
      <div className="  max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                {item.icon}
              </div>
              <div className="text-white/40 text-xs mb-1">{item.label}</div>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-white font-medium text-sm hover:text-blue-300 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <div className="text-white font-medium text-sm">
                  {item.value}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-blue-400" />
              <span className="section-label">Reach Us Directly</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-black mb-6 leading-tight">
              We're Just a
              <span className="block text-gradient">Message Away</span>
            </h2>
            <p className="text-black leading-relaxed mb-8">
              Our team of property experts is available to answer your
              questions, schedule viewings, and guide you through every step of
              your real estate journey.
            </p>

            {/* Phone numbers */}
            <div className="glass rounded-2xl p-6 border border-white/10 mb-6">
              <div className="text-white/40 text-xs font-semibold tracking-wide uppercase mb-4">
                Phone Lines
              </div>
              <div className="space-y-3">
                {[PHONE_NUMBER, PHONE_NUMBER2, PHONE_NUMBER3].map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 2h3l1.5 3.5-1.75 1.05A10.5 10.5 0 007.45 9.5L8.5 7.75 12 9.25v2.75C12 13.5 10.5 14 9.75 14 4.75 14 2 9.25 2 4.25 2 3.5 2.5 2 4 2z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{phone}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full py-4 px-6 rounded-2xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#25D366,#128C7E)",
                boxShadow: "0 0 30px rgba(37,211,102,0.2)",
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.11 1.523 5.84L.057 23.426a.75.75 0 00.918.918l5.587-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.967 0-3.806-.536-5.38-1.468l-.386-.23-3.994 1.048 1.048-3.994-.23-.386A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Chat with us on WhatsApp
              <svg className="w-4 h-4 ml-auto" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-white/45 text-sm mb-6">
                Fill in the form and we'll get back to you within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-display text-xl text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-white/50 text-sm">
                    We'll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        message: "",
                      });
                    }}
                    className="mt-6 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-2 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Adeyinka Oluwadarasimi"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-2 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-2 block">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us what you're looking for…"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                    {!submitting && (
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
