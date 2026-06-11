import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import EditPropertyForm from "../components/EditPropertyForm";

export default function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select("*, property_images(*)")
        .eq("id", id)
        .single();

      if (error || !data) {
        navigate("/admin/properties"); // redirect if not found
        return;
      }

      setLoading(false);
      setProperty(data);
    }

    fetchProperty();
  }, [id]);

  if (loading || !property)
    return <div className="text-white/50 text-sm">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <EditPropertyForm property={property} />
    </div>
  );
}
