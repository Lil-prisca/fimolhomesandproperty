import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import EnquiriesTable from "../components/EnquiriesTable";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEnquiries() {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching enquiries:", error.message);
        setError(error.message);
      } else {
        setEnquiries(data ?? []);
      }
      setLoading(false);
    }
    fetchEnquiries();
  }, []);

  if (loading) return <div className="text-white/50 text-sm">Loading...</div>;
  if (error) return <div className="text-red-400 text-sm">Error: {error}</div>;

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">
            Enquiries
          </h1>
          <p className="text-white/45 text-sm">
            {enquiries.length} total ·{" "}
            <span className="text-blue-400">{newCount} new</span>
          </p>
        </div>
      </div>
      <EnquiriesTable enquiries={enquiries} />
    </div>
  );
}
