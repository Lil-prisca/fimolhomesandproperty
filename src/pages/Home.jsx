import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyCategories from "../components/PropertyCategories";
import CTASection from "../components/CTASection";

const Home = () => {
  return (
    <>
      <Navbar home={true} />
      <Hero />
      <FeaturedProperties />
      <PropertyCategories />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
