import { useParams } from "react-router-dom";
// import { properties } from "../Data";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyDetail from "../components/PropertyDetails";
import useFetchProperties from "../hooks/useFetchProperties";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { properties } = useFetchProperties();

  const property = properties.find(
    (p) => p.slug === id || String(p.id) === String(id),
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-white">
        Property not found.
      </div>
    );
  }

  const related = properties
    .filter((p) => p.type === property.type && p.id !== property.id)
    .slice(0, 3);

  return (
    <div>
      <Navbar home={true} />
      <PropertyDetail property={property} related={related} />
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
