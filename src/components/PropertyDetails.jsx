import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { supabase } from "../supabase";

const WHATSAPP_NUMBER = "2348144169686";
// const WHATSAPP_NUMBER = "2348119692684";

const PHONE_NUMBER = "+2348144169686";
// const PHONE_NUMBER = "+2348119692684";

export default function PropertyDetail({ property, related }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in ${property.title}. Please get in touch with me.`,
  });

  const images = property.property_images?.length
    ? property.property_images
        .sort((a, b) => a.display_order - b.display_order)
        .map((img) => img.url)
    : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85"];

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("enquiries").insert({
      property_id: property.id,
      property_title: property.title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      status: "new",
    });

    if (error) {
      console.error("Enquiry error:", error.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in *${property.title}* listed at ${property.price} in ${property.location}. Please provide more details.`,
  );

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage((p) => (p - 1 + images.length) % images.length);
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4l-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[activeImage]}
                alt={property.title}
                fill
                className="h-full w-full object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage((p) => (p + 1) % images.length);
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeImage ? "w-8 bg-blue-400" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
          <div className="flex items-center gap-2 text-sm text-white/40 flex-wrap">
            <Link
              to="/"
              className="text-black hover:text-white/70 transition-colors"
            >
              Home
            </Link>
            <span className="text-black">/</span>
            <Link
              to="/allproperties"
              className="text-black hover:text-white/70 transition-colors"
            >
              Properties
            </Link>
            <span className="text-black">/</span>
            <Link
              to={`/allproperties?type=${encodeURIComponent(property.type)}`}
              className="text-black hover:text-black/70 transition-colors"
            >
              {property.type}
            </Link>
            <span className="text-black">/</span>
            <span className="text-black truncate max-w-50">
              {property.title}
            </span>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
          <div
            className={`grid gap-2 h-105 lg:h-130 rounded-2xl overflow-hidden ${images.length > 1 ? "grid-cols-4 grid-rows-2" : "grid-cols-1"}`}
          >
            <motion.div
              className={`relative cursor-pointer group ${images.length > 1 ? "col-span-4 lg:col-span-2 row-span-2" : "col-span-4 row-span-2"}`}
              onClick={() => {
                setActiveImage(0);
                setLightboxOpen(true);
              }}
            >
              <img
                src={images[0]}
                alt={property.title}
                className=" h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {property.badge && (
                <span
                  className={`absolute top-4 left-4 ${property.badgeColor || "bg-blue-500"} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {property.badge}
                </span>
              )}
            </motion.div>
            {images.slice(1, 5).map((img, i) => (
              <motion.div
                key={i}
                className="relative cursor-pointer group overflow-hidden"
                onClick={() => {
                  setActiveImage(i + 1);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`${property.title} ${i + 2}`}
                  fill
                  className=" h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {i === 2 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      +{images.length - 4} photos
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="section-label">{property.type}</span>
                  <span className="text-black/20">·</span>
                  <span className="text-black/50 text-xs flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5 text-blue-400"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6A4.5 4.5 0 0 0 8 1.5zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                        fill="currentColor"
                      />
                    </svg>
                    {property.location}
                  </span>
                </div>
                <h1 className="font-display text-3xl lg:text-5xl font-bold text-black mb-4 leading-tight">
                  {property.title}
                </h1>
                <div className="font-display text-3xl font-bold text-[#020b18] ">
                  {property.price_label}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {property.beds !== null && (
                  <>
                    <div className="glassdetails rounded-2xl p-4 text-center">
                      <div className="text-2xl font-display font-bold text-white mb-1">
                        {property.beds}
                      </div>
                      <div className="text-xs text-white/45">Bedrooms</div>
                    </div>
                    <div className="glassdetails rounded-2xl p-4 text-center">
                      <div className="text-2xl font-display font-bold text-white mb-1">
                        {property.baths}
                      </div>
                      <div className="text-xs text-white/45">Bathrooms</div>
                    </div>
                  </>
                )}
                {property.sqft && (
                  <div className="glassdetails rounded-2xl p-4 text-center">
                    <div className="text-2xl font-display font-bold text-white mb-1">
                      {property.sqft}
                    </div>
                    <div className="text-xs text-white/45">Square Feet</div>
                  </div>
                )}
                {property.documents !== null && (
                  <div className="glassdetails rounded-2xl p-4 text-center">
                    <div className="text-2xl font-display font-bold text-white mb-1">
                      {property.documents}
                    </div>
                    <div className="text-xs text-white/45">Title</div>
                  </div>
                )}
              </motion.div>

              {/* Description */}
              {property.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="glassdetails rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-display text-xl font-semibold text-white mb-4">
                    About this Property
                  </h2>
                  <p className="text-white/60 leading-relaxed text-base">
                    {property.description}
                  </p>
                </motion.div>
              )}

              {/* Details table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glassdetails rounded-2xl p-6 lg:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-white mb-6">
                  Property Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: "Property Type", value: property.type },
                    { label: "Location", value: property.location },
                    { label: "State", value: property.state },
                    { label: "City", value: property.city },
                    ...(property.sqft
                      ? [
                          {
                            label: "Land Size",
                            value: `${property.sqft} sqft Land`,
                          },
                        ]
                      : []),
                    { label: "Status", value: property.badge },
                    ...(property.beds !== null
                      ? [
                          { label: "Bedrooms", value: String(property.beds) },
                          { label: "Bathrooms", value: String(property.baths) },
                        ]
                      : []),
                    ...(property.documents !== null
                      ? [{ label: "Title Document", value: property.documents }]
                      : []),
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3 border-b border-white/8"
                    >
                      <span className="text-white text-sm">{item.label}</span>
                      <span className="max-w-55 text-white text-sm text-end font-medium">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Contact sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glassdetails rounded-2xl p-6 sticky top-24"
              >
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  Interested in this property?
                </h3>
                <p className="text-white/45 text-sm mb-6">
                  Send an enquiry or reach us directly.
                </p>

                <div className="flex flex-col gap-3 mb-6">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
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
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="btn-outline w-full justify-center py-3 text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 2h3l1.5 3.5-1.75 1.05A10.5 10.5 0 007.45 9.5L8.5 7.75 12 9.25v2.75C12 13.5 10.5 14 9.75 14 4.75 14 2 9.25 2 4.25 2 3.5 2.5 2 4 2z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Call Directly
                  </a>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/30 text-xs">
                    or send a message
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-7 h-7 text-blue-400"
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
                    <h4 className="font-display text-lg text-white mb-2">
                      Enquiry Sent!
                    </h4>
                    <p className="text-white/50 text-sm">
                      We'll be in touch within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/50 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/50 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/50 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/50 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Sending…" : "Send Enquiry"}
                      {!submitting && (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
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
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-10 bg-blue-400" />
                    <span className="section-label">More Like This</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-white">
                    Related Properties
                  </h2>
                </div>
                <Link
                  to="/allproperties"
                  className="btn-outline py-2.5 px-6 text-sm hidden sm:flex"
                >
                  View All
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
