import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
// import { useMemo } from "react";
import PropertyCard from "../components/PropertyCard";
// import properties from "../Data";
import useFetchProperties from "../hooks/useFetchProperties";

const PROPERTY_TYPES = [
  { label: "All", value: "all" },
  // { label: "Apartments", value: "Apartment" },
  // { label: "Villas", value: "Villa" },
  { label: "Land", value: "Land" },
  { label: "Estate", value: "Estate" },
  { label: "Houses", value: "House" },
  { label: "Commercial", value: "Commercial" },
  // { label: "Luxury Apartments", value: "Luxury Apartment" },
];

// const NIGERIA_STATES = [
//   "Abia",
//   "Adamawa",
//   "Akwa Ibom",
//   "Anambra",
//   "Bauchi",
//   "Bayelsa",
//   "Benue",
//   "Borno",
//   "Cross River",
//   "Delta",
//   "Ebonyi",
//   "Edo",
//   "Ekiti",
//   "Enugu",
//   "FCT",
//   "Gombe",
//   "Imo",
//   "Jigawa",
//   "Kaduna",
//   "Kano",
//   "Katsina",
//   "Kebbi",
//   "Kogi",
//   "Kwara",
//   "Lagos",
//   "Nasarawa",
//   "Niger",
//   "Ogun",
//   "Ondo",
//   "Osun",
//   "Oyo",
//   "Plateau",
//   "Rivers",
//   "Sokoto",
//   "Taraba",
//   "Yobe",
//   "Zamfara",
// ];

const ITEMS_PER_PAGE = 9;

export default function AllPropertiesClient() {
  const navigate = useNavigate();
  const location = useLocation();
  const { properties } = useFetchProperties();

  // Read filters from URL params
  const params = new URLSearchParams(location.search);
  const currentType = params.get("type") || "all";
  const currentState = params.get("state") || "";
  const currentSearch = params.get("search") || "";
  const currentPage = Number(params.get("page")) || 1;

  function updateURL(updates = {}) {
    const newParams = new URLSearchParams(location.search);
    const merged = {
      type: currentType,
      state: currentState,
      search: currentSearch,
      page: String(currentPage),
      ...updates,
    };

    Object.entries(merged).forEach(([k, v]) => {
      if (v && v !== "all" && v !== "") {
        newParams.set(k, v);
      } else {
        newParams.delete(k);
      }
    });

    // Reset to page 1 on filter change (unless page is explicitly being updated)
    if (!updates.page) newParams.delete("page");

    navigate(`${location.pathname}?${newParams.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Filter locally from imported data
  const filtered = properties.filter((p) => {
    const matchType = currentType === "all" || p.type === currentType;
    const matchState = !currentState || p.state === currentState;

    const search = currentSearch.toLowerCase();

    const matchSearch =
      !currentSearch ||
      p.title?.toLowerCase().includes(search) ||
      p.city?.toLowerCase().includes(search) ||
      p.location?.toLowerCase().includes(search);

    return matchType && matchState && matchSearch;
  });
  const count = filtered.length;
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-25 lg:px-10 lg:pt-30 pb-24">
      {/* Filters row */}
      <div className="flex flex-col gap-4 mb-10">
        {/* Search + State */}
        {/* <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 glass rounded-xl px-4 py-3">
            <svg
              className="w-4 h-4 text-blue-400 flex-shrink-0"
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
              defaultValue={currentSearch}
              placeholder="Search by title, city, or location…"
              className="w-full bg-transparent text-white placeholder-white/30 text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") updateURL({ search: e.target.value });
              }}
            />
          </div>
          <select
            value={currentState}
            onChange={(e) => updateURL({ state: e.target.value })}
            className="glass text-white/70 text-sm rounded-xl px-4 py-3 outline-none border border-white/10 cursor-pointer min-w-[140px]"
          >
            <option value="">All States</option>
            {NIGERIA_STATES.map((s) => (
              <option key={s} value={s} className="bg-[#041629]">
                {s}
              </option>
            ))}
          </select>
        </div> */}

        {/* Type filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {PROPERTY_TYPES.map((t) => (
            <motion.button
              key={t.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => updateURL({ type: t.value })}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                currentType === t.value
                  ? "bg-[#020b18] border-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "border-black text-black hover:border-blue-400 hover:text-black"
              }`}
            >
              {t.label}
            </motion.button>
          ))}
        </div>

        {/* Results count + clear */}
        <div className="flex items-center justify-between">
          <p className="text-black/40 text-sm">
            <span className="text-black font-medium">{count}</span> propert
            {count === 1 ? "y" : "ies"} found
            {currentType !== "all" && (
              <span className="text-blue-400"> · {currentType}</span>
            )}
            {currentState && (
              <span className="text-blue-400"> · {currentState}</span>
            )}
          </p>
          {(currentType !== "all" || currentState || currentSearch) && (
            <button
              onClick={() => updateURL({ type: "all", state: "", search: "" })}
              className="text-white/40 hover:text-white text-xs transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 2l8 8M10 2L2 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Property Grid */}
      {paginated.length > 0 ? (
        <motion.div
          key={`${currentType}-${currentState}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginated.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="font-display text-xl text-white mb-2">
            No properties found
          </h3>
          <p className="text-white/45 text-sm mb-6">
            Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => updateURL({ type: "all", state: "", search: "" })}
            className="btn-primary py-3 px-8 text-sm"
          >
            View All Listings
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-14 gap-3 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentPage === 1}
            onClick={() => updateURL({ page: String(currentPage - 1) })}
            className="btn-outline px-5 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </motion.button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateURL({ page: String(i + 1) })}
              className={`w-12 h-12 rounded-full border text-sm font-medium transition-all duration-200 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                  : "border-white/20 text-white hover:border-blue-400"
              }`}
            >
              {i + 1}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentPage === totalPages}
            onClick={() => updateURL({ page: String(currentPage + 1) })}
            className="btn-outline px-5 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
