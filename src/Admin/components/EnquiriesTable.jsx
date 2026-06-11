import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase";

export default function EnquiriesTable({ enquiries: initialEnquiries }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [expandedId, setExpandedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = enquiries.filter((e) =>
    filter === "all" ? true : e.status === filter,
  );

  async function updateStatus(id, status) {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    );
  }

  async function handleDelete(id) {
    setDeletingId(id);
    await supabase.from("enquiries").delete().eq("id", id);
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    setDeletingId(null);
  }

  const statusColors = {
    new: "bg-blue-500/15 text-blue-400",
    read: "bg-white/10 text-white/50",
    responded: "bg-emerald-500/15 text-emerald-400",
  };

  const filterCounts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    read: enquiries.filter((e) => e.status === "read").length,
    responded: enquiries.filter((e) => e.status === "responded").length,
  };

  // const waText = encodeURIComponent(
  //   `Hi ${enquiry.name}, thank you for your enquiry about ${enquiry.property_title ?? "the property"}.`,
  // );
  // const waPhone = enquiry.phone.replace(/\D/g, "");

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "new", "read", "responded"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 capitalize ${
              filter === f
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-white/20 text-white/50 hover:text-white hover:border-blue-400"
            }`}
          >
            {f}{" "}
            <span
              className={`ml-1 text-xs ${filter === f ? "text-white/70" : "text-white/30"}`}
            >
              ({filterCounts[f]})
            </span>
          </button>
        ))}
      </div>

      {/* Enquiries list */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.length > 0 ? (
            filtered.map((enquiry) => (
              <motion.div
                key={enquiry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Row */}
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer hover:bg-white/3 transition-colors"
                  onClick={() =>
                    setExpandedId(expandedId === enquiry.id ? null : enquiry.id)
                  }
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <span className="text-blue-300 font-semibold text-sm">
                      {enquiry.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium text-sm">
                        {enquiry.name}
                      </span>
                      {enquiry.status === "new" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      )}
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[enquiry.status]}`}
                      >
                        {enquiry.status}
                      </span>
                    </div>
                    <div className="text-white/40 text-xs mt-0.5 truncate">
                      {enquiry.property_title ?? "General enquiry"} ·{" "}
                      {enquiry.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-white/25 text-xs hidden sm:block">
                      {new Date(enquiry.created_at).toLocaleDateString(
                        "en-NG",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                    <svg
                      className={`w-4 h-4 text-white/30 transition-transform duration-200 ${expandedId === enquiry.id ? "rotate-180" : ""}`}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expandedId === enquiry.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="p-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="glass rounded-xl px-4 py-3">
                            <div className="text-white/40 text-xs mb-1">
                              Email
                            </div>
                            <a
                              href={`mailto:${enquiry.email}`}
                              className="text-blue-300 text-sm hover:text-blue-200 transition-colors"
                            >
                              {enquiry.email}
                            </a>
                          </div>
                          {enquiry.phone && (
                            <div className="glass rounded-xl px-4 py-3">
                              <div className="text-white/40 text-xs mb-1">
                                Phone
                              </div>
                              <a
                                href={`tel:${enquiry.phone}`}
                                className="text-white text-sm hover:text-blue-300 transition-colors"
                              >
                                {enquiry.phone}
                              </a>
                            </div>
                          )}
                          {enquiry.property_title && (
                            <div className="glass rounded-xl px-4 py-3">
                              <div className="text-white/40 text-xs mb-1">
                                Property
                              </div>
                              <div className="text-white text-sm truncate">
                                {enquiry.property_title}
                              </div>
                            </div>
                          )}
                        </div>

                        {enquiry.message && (
                          <div className="glass rounded-xl px-4 py-3">
                            <div className="text-white/40 text-xs mb-2">
                              Message
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">
                              {enquiry.message}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center gap-3 flex-wrap pt-1">
                          <a
                            href={`mailto:${enquiry.email}?subject=Re: ${enquiry.property_title ?? "Your Enquiry"}&body=Dear ${enquiry.name},%0D%0A%0D%0AThank you for your interest.`}
                            className="btn-primary py-2 px-5 text-xs"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z"
                                stroke="currentColor"
                                strokeWidth="1.3"
                              />
                              <path
                                d="M14 4L8 9 2 4"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                              />
                            </svg>
                            Reply via Email
                          </a>

                          {enquiry.phone && (
                            <a
                              href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}?text=Hi ${enquiry.name}, thank you for your enquiry about ${enquiry.property_title ?? "the property"}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 py-2 px-4 rounded-full text-xs font-medium text-white transition-all"
                              style={{
                                background:
                                  "linear-gradient(135deg,#25D366,#128C7E)",
                              }}
                            >
                              WhatsApp
                            </a>
                          )}

                          <div className="flex gap-2 ml-auto">
                            {enquiry.status !== "read" && (
                              <button
                                onClick={() => updateStatus(enquiry.id, "read")}
                                className="text-white/40 hover:text-white text-xs border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Mark Read
                              </button>
                            )}
                            {enquiry.status !== "responded" && (
                              <button
                                onClick={() =>
                                  updateStatus(enquiry.id, "responded")
                                }
                                className="text-emerald-400/70 hover:text-emerald-400 text-xs border border-emerald-500/20 hover:border-emerald-500/40 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Mark Responded
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(enquiry.id)}
                              disabled={deletingId === enquiry.id}
                              className="text-red-400/50 hover:text-red-400 text-xs border border-red-500/10 hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                            >
                              {deletingId === enquiry.id
                                ? "Deleting…"
                                : "Delete"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 text-white/30 text-sm">
              No {filter === "all" ? "" : filter} enquiries found.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
