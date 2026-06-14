import { Link } from "react-router-dom";
import useFetchProperties from "../../hooks/useFetchProperties";
import useFetchEnquiries from "../../hooks/useFetchEnquiries";

export default function AdminDashboard() {
  const { properties } = useFetchProperties();
  // derive stats from local data
  const totalProperties = properties.length;
  const featuredProperties = properties.filter((p) => p.featured).length;

  // these will come from DB later
  const activeProperties = totalProperties;

  const { enquiries } = useFetchEnquiries();
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  const recentProperties = properties.slice(0, 5);
  const recentEnquiries = enquiries.slice(0, 5);

  const statCards = [
    {
      label: "Total Listings",
      value: totalProperties,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "from-blue-600/20 to-blue-800/10 border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      label: "Active Listings",
      value: activeProperties,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "from-emerald-600/20 to-emerald-800/10 border-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      label: "Featured",
      value: featuredProperties,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
      color: "from-yellow-600/20 to-yellow-800/10 border-yellow-500/20",
      iconColor: "text-yellow-400",
    },
    {
      label: "New Enquiries",
      value: newEnquiries,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "from-purple-600/20 to-purple-800/10 border-purple-500/20",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">
          Dashboard
        </h1>
        <p className="text-white/45 text-sm">
          Welcome back. Here's what's happening.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`glass rounded-2xl p-5 border bg-gradient-to-br ${stat.color}`}
          >
            <div className={`${stat.iconColor} mb-3`}>{stat.icon}</div>
            <div className="font-display text-3xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-white/45 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-white">
              Recent Listings
            </h2>
            <Link
              to="/admin/properties"
              className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentProperties.length > 0 ? (
              recentProperties.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-3 border-b border-white/8 last:border-0"
                >
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="text-white text-sm font-medium line-clamp-2 ">
                      {p.title}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">
                      {p.location} · {p.type}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/15 text-emerald-400">
                      active
                    </span>
                    <Link
                      to={`/admin/properties/${p.id}/edit`}
                      className="text-blue-400/60 hover:text-blue-400 text-xs transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/30 text-sm text-center py-8">
                No properties yet.{" "}
                <Link
                  to="/admin/properties/newproperty"
                  className="text-blue-400"
                >
                  Add one →
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-white">
              Recent Enquiries
            </h2>
            <Link
              to="/admin/enquiries"
              className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentEnquiries.length > 0 ? (
              recentEnquiries.map((e) => (
                <div
                  key={e.id}
                  className="flex items-start justify-between py-3 border-b border-white/8 last:border-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-white text-sm font-medium">
                        {e.name}
                      </div>
                      {e.status === "new" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5 truncate max-w-[200px]">
                      {e.property_title}
                    </div>
                    <div className="text-white/30 text-xs">{e.email}</div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        e.status === "new"
                          ? "bg-blue-500/15 text-blue-400"
                          : e.status === "responded"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-white/10 text-white/40"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/30 text-sm text-center py-8">
                No enquiries yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Add New Property",
            to: "/admin/properties/newproperty",
            desc: "Create a listing manually",
          },
          {
            label: "Import from CSV",
            to: "/admin/import",
            desc: "Bulk upload properties",
          },
          {
            label: "View Live Site",
            to: "/",
            desc: "See the public website",
            external: true,
          },
        ].map((action) => (
          <Link
            key={action.to}
            to={action.to}
            target={action.external ? "_blank" : undefined}
            className="glass rounded-xl p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-200 group"
          >
            <div className="text-white font-medium text-sm mb-1 group-hover:text-blue-300 transition-colors">
              {action.label}
            </div>
            <div className="text-white/40 text-xs">{action.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
