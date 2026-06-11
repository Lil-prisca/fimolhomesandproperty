import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function PropertiesTable({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties);

  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()),
  );

  // async function toggleStatus() {
  //   const newStatus = current === "active" ? "inactive" : "active";
  // }

  async function toggleFeatured() {}

  async function handleDelete(id) {
    setDeletingId(id);
  }

  return (
    <div>
      {/* Search */}
      <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 mb-6 border border-white/10">
        <svg
          className="w-4 h-4 text-blue-400 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37-1.41 1.42-4.38-4.38z"
            fill="currentColor"
          />
        </svg>
        <input
          type="text"
          placeholder="Search properties…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-white/30 hover:text-white text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-white/40 text-xs font-semibold tracking-wide uppercase">
                  Property
                </th>
                <th className="text-left px-4 py-4 text-white/40 text-xs font-semibold tracking-wide uppercase hidden md:table-cell">
                  Type
                </th>
                <th className="text-left px-4 py-4 text-white/40 text-xs font-semibold tracking-wide uppercase hidden lg:table-cell">
                  Price
                </th>
                <th className="text-left px-4 py-4 text-white/40 text-xs font-semibold tracking-wide uppercase">
                  Status
                </th>
                <th className="text-left px-4 py-4 text-white/40 text-xs font-semibold tracking-wide uppercase hidden sm:table-cell">
                  Featured
                </th>
                <th className="text-right px-6 py-4 text-white/40 text-xs font-semibold tracking-wide uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.length > 0 ? (
                  filtered.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-0"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-white text-sm">
                          {p.title}
                        </div>
                        <div className="text-white/40 text-xs mt-0.5">
                          {p.location}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-white/60 text-xs">{p.type}</span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-blue-300 text-sm font-medium">
                          {p.price}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => toggleStatus(p.id, p.status)}
                          className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                            p.status === "active"
                              ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                              : "bg-white/10 text-white/40 hover:bg-white/15"
                          }`}
                        >
                          {p.status}
                        </button>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <button
                          onClick={() => toggleFeatured(p.id, p.featured)}
                          className={`w-8 h-4 rounded-full transition-all duration-300 relative ${
                            p.featured ? "bg-blue-500" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300 ${
                              p.featured ? "left-4.5" : "left-0.5"
                            }`}
                            style={{ left: p.featured ? "18px" : "2px" }}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/properties/${p.slug}`}
                            target="_blank"
                            className="text-white/30 hover:text-white/70 text-xs transition-colors"
                          >
                            View
                          </Link>
                          <Link
                            to={`/admin/properties/${p.id}/edit`}
                            className="text-blue-400/70 hover:text-blue-400 text-xs transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setConfirmDelete(p.id)}
                            className="text-red-400/50 hover:text-red-400 text-xs transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-16 text-white/30 text-sm"
                    >
                      {search
                        ? "No properties match your search."
                        : "No properties yet."}
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-sm w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-400"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9 2h2M4 5h12l-1 12H5L4 5zM8 9v5M12 9v5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white text-center mb-2">
                Delete Property?
              </h3>
              <p className="text-white/50 text-sm text-center mb-6">
                This will permanently delete the listing and all its images.
                This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 btn-outline py-3 text-sm justify-center"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  disabled={deletingId === confirmDelete}
                  className="flex-1 py-3 px-4 rounded-full text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60"
                >
                  {deletingId === confirmDelete ? "Deleting…" : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
