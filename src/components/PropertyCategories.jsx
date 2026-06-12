import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  // {
  //   label: "Apartments",
  //   count: "340+ listings",
  //   image:
  //     "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  //   desc: "Modern urban living in prime city locations",
  //   link: "/allproperties?type=Apartment",
  // },
  // {
  //   label: "Villas",
  //   count: "120+ listings",
  //   image:
  //     "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80",
  //   desc: "Expansive private estates with resort amenities",
  //   link: "/allproperties?type=Villa",
  // },
  {
    label: "Land",
    count: "580+ listings",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    desc: "Prime plots in residential and commercial zones",
    link: "/allproperties?type=Land",
  },
  // {
  //   label: "Luxury Homes",
  //   count: "95+ listings",
  //   image:
  //     "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  //   desc: "Bespoke residences that redefine sophisticated living",
  //   link: "/allproperties?type=Luxury+Home",
  // },
  {
    label: "Commercial",
    count: "210+ listings",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    desc: "Strategic commercial spaces for growing businesses",
    link: "/allproperties?type=Commercial",
  },
  {
    label: "Houses",
    count: "160+ listings",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    desc: "Comfortable family homes across Nigeria's finest estates",
    link: "/allproperties?type=House",
  },
];

export default function PropertyCategories() {
  return (
    <section id="categories" className="py-24 lg:py-15 relative">
      <div className="absolute inset-0 grid-dots opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-col lg:items-start justify-between mb-14 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-10 bg-blue-400" />
              <span className="section-label">Browse by Type</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl lg:text-5xl font-bold text-black"
            >
              Property Categories
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black/50 text-sm max-w-xs leading-relaxed"
          >
            From compact urban apartments to sprawling private estates — find
            exactly what you need.
          </motion.p>
        </div>

        {/* Category grid: large first two, 4 in row below */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover="hover"
              className={`relative rounded-2xl overflow-hidden cursor-pointer group  lg:col-span-1 h-72  ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-[#020B18]/40 to-transparent" />
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                className="absolute inset-0 bg-blue-800/30 backdrop-blur-[1px]"
                transition={{ duration: 0.25 }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {cat.label}
                    </h3>
                    <p className="text-white/50 text-xs">{cat.desc}</p>
                  </div>
                  <Link to={cat.link}>
                    <motion.div
                      variants={{
                        hover: {
                          scale: 1.1,
                          backgroundColor: "rgba(29,111,191,0.9)",
                        },
                      }}
                      className="flex-shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center ml-4 transition-colors duration-300"
                    >
                      <svg
                        className="w-4 h-4 text-white"
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
                <motion.div
                  variants={{ hover: { opacity: 1, y: 0 } }}
                  initial={{ opacity: 0, y: 10 }}
                  className="mt-3 inline-block"
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-xs text-blue-300 font-semibold tracking-wide">
                    {cat.count}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
