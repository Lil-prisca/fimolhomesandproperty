import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function PropertyCard({ property, index }) {
  // Add this inside the component before the return
  const primaryImage =
    property.property_images?.find((img) => img.is_primary)?.url ||
    property.property_images?.[0]?.url ||
    property.image || // fallback for local data
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"; // final fallback
  // Get primary image or first image

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="card-property group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={primaryImage}
          alt={property.title}
          className=" w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B18]/80 via-transparent to-transparent" />

        {/* Badge */}
        {property.badge && (
          <span
            className={`absolute top-4 left-4 ${property.badgeColor || "bg-blue-500"} text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wide`}
          >
            {property.badge}
          </span>
        )}

        <span className="absolute top-4 right-4 glass text-white/80 text-xs px-3 py-1 rounded-full">
          {property.type}
        </span>

        {/* Hover overlay */}
        <Link to={`/properties/${property.slug || property.id}`}>
          <motion.div className="absolute inset-0 flex items-center justify-center bg-blue-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="btn-primary text-sm py-3 px-6">View Details</span>
          </motion.div>
        </Link>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/properties/${property.slug}`}>
          <h3 className="font-display text-lg font-semibold text-white leading-tight mb-2 hover:text-blue-300 transition-colors duration-200">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-4">
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
          <span className="text-white/50 text-xs">{property.location}</span>
        </div>

        {/* Details row */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10 text-white/55 text-xs">
          {property.beds !== null && (
            <>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-blue-400"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2 9V6a1 1 0 011-1h10a1 1 0 011 1v3M1 9h14v4H1V9z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {property.beds} Beds
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-blue-400"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 6h10v6H3V6zM1 12h14M5 6V4a3 3 0 016 0v2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {property.baths} Baths
              </span>
            </>
          )}
          {property.sqft && (
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-blue-400"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect
                  x="1"
                  y="1"
                  width="14"
                  height="14"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              {property.sqft} {property.beds === null ? "sqft land" : "sqft"}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/40 mb-0.5">Price</div>
            <div className="font-display text-xl font-bold text-gradient">
              {property.price_label}
            </div>
          </div>
          <Link to={`/properties/${property.slug}`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
            >
              <svg
                className="w-4 h-4 text-blue-400"
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
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default PropertyCard;
