import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyCategories from "../components/PropertyCategories";
import CTASection from "../components/CTASection";
import LandAcquisition from "../components/LandAcquisition";
import AdsCarousel from "../components/AdsCarousel";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Navbar home={true} />
      <Hero />
      <FeaturedProperties />
      <PropertyCategories />
      <AdsCarousel />
      <LandAcquisition />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
