// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertiesTable from "../components/PropertiesTable";
import useFetchProperties from "../../hooks/useFetchProperties";

export default function AdminPropertiesPage() {
  const { properties, loading, error } = useFetchProperties();

  if (loading) return <div className="text-white/50 text-sm">Loading...</div>;
  if (error) return <div className="text-red-400 text-sm">Error: {error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">
            Properties
          </h1>
          <p className="text-white/45 text-sm">
            {properties.length} total listings
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/import" className="btn-outline py-2.5 px-5 text-sm">
            Import CSV
          </Link>
          <Link
            to="/admin/properties/newproperty"
            className="btn-primary py-2.5 px-5 text-sm"
          >
            + Add Property
          </Link>
        </div>
      </div>

      <PropertiesTable properties={properties} />
    </div>
  );
}
