import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function useFetchProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase.from("properties").select("*");

      if (error) {
        console.error("Error fetching properties:", error.message);
        setError(error.message);
      } else {
        setProperties(data ?? []);
      }
      setLoading(false);
    }
    fetchProperties();
  }, []);

  return { properties, loading, error };
}

export default useFetchProperties;
