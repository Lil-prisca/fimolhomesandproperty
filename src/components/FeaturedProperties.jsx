"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
// import properties from "../Data";
import useFetchProperties from "../hooks/useFetchProperties";

export default function FeaturedProperties() {
  const { properties } = useFetchProperties();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProperties = properties.filter((p) => p.featured);

  return (
    <section id="properties" className="py-24 lg:py-15 relative" ref={ref}>
      <div className="absolute inset-0 grid-dots opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-10 bg-blue-400" />
              <span className="section-label">Properties for Sale</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl lg:text-5xl font-bold text-black"
            >
              Featured Listings
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/allproperties"
              className="btn-outline text-black self-start lg:self-auto py-3 px-6 text-sm"
            >
              View All Properties
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

        {/* Property grid */}
        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        ) : (
          // Empty state — shown when no properties in DB yet
          <div className="text-center py-20">
            <p className="text-black/40 text-sm">No featured listings yet.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/allproperties"
            className="btn-outline text-black py-3 px-10"
          >
            Browse All Properties
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
