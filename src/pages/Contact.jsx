import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactUsPage from "./ContactUsPage";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ContactUsPage />
      <Footer />
    </div>
  );
};

export default Contact;
