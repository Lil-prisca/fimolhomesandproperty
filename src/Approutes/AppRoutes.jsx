import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Allproperties from "../pages/Allproperties.jsx";
// import PropertyDetails from "../components/PropertyDetails.jsx";
import PropertyDetailPage from "../pages/PropertyDetailPage.jsx";
import AdminLayout from "../Admin/AdminLayout.jsx";
import AdminDashboard from "../Admin/pages/AdminDashboard.jsx";
import AdminPropertiesPage from "../Admin/pages/AdminProperties.jsx";
import NewPropertyPage from "../Admin/pages/NewProperty.jsx";
import EditPropertyPage from "../Admin/pages/EditProperty.jsx";
import EnquiriesPage from "../Admin/pages/Enquires.jsx";
import AboutPage from "../pages/AboutPage.jsx";

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allproperties" element={<Allproperties />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/properties/:id" element={<PropertyDetailPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<AdminPropertiesPage />} />
        <Route path="properties/newproperty" element={<NewPropertyPage />} />
        <Route path="properties/:id/edit" element={<EditPropertyPage />} />

        <Route path="enquiries" element={<EnquiriesPage />} />
      </Route>
    </Routes>
  );
};

export default Approutes;
