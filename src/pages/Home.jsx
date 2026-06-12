import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyCategories from "../components/PropertyCategories";
import CTASection from "../components/CTASection";
import LandAcquisition from "../components/LandAcquisition";

const Home = () => {
  return (
    <>
      <Navbar home={true} />
      <Hero />
      <FeaturedProperties />
      <PropertyCategories />
      <LandAcquisition />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
