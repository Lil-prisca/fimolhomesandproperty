import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function useFetchEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    async function fetchEnquiries() {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error) setEnquiries(data ?? []);
    }
    fetchEnquiries();
  }, []);
  return { enquiries };
}
export default useFetchEnquiries;
