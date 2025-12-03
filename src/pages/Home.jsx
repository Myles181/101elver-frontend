import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProperties from "../components/FeaturedProperties";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProperties />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
