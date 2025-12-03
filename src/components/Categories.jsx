import React, { useState, useEffect, useRef } from "react";

const Categories = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  const categories = [
    {
      title: "Buy Property",
      description: "Find your perfect home from our extensive collection of properties. Whether you're a first-time buyer or looking to invest, we have the ideal property waiting for you. Browse through luxury villas, modern apartments, and spacious family homes.",
      count: "1,200+ Listings",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
      link: "/search?category=For+Sale",
      bgColor: "bg-blue-50"
    },
    {
      title: "Rent Property",
      description: "Discover rental properties perfect for long-term living. From cozy studios to spacious family homes, find your next rental with flexible lease terms and prime locations across Nigeria. Quality living spaces at competitive prices.",
      count: "800+ Listings",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      link: "/search?category=For+Rent",
      bgColor: "bg-green-50"
    },
    {
      title: "Holiday Rentals",
      description: "Short-term vacation rentals for your perfect getaway. Experience luxurious accommodations for your holidays, business trips, or weekend escapes. Fully furnished properties with all the amenities you need for a comfortable stay.",
      count: "500+ Listings",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      link: "/search?category=Holiday+Rental",
      bgColor: "bg-purple-50"
    }
  ];

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.3 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="bg-white">
      {/* Header Section */}
      <div className="min-h-[30vh] flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse By Category
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Find the perfect property type that suits your needs
          </p>
        </div>
      </div>

      {/* Category Sections */}
      {categories.map((category, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000 ${
            visibleSections.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="max-w-7xl w-full">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-8 lg:gap-16`}
            >
              {/* Image Side */}
              <div
                className={`w-full lg:w-1/2 transition-all duration-1000 delay-200 ${
                  visibleSections.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : index % 2 === 0
                    ? 'opacity-0 -translate-x-20'
                    : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-[500px] object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="inline-block bg-white text-gray-900 px-6 py-3 rounded-full text-base font-bold shadow-lg">
                      {category.count}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div
                className={`w-full lg:w-1/2 transition-all duration-1000 delay-400 ${
                  visibleSections.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : index % 2 === 0
                    ? 'opacity-0 translate-x-20'
                    : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className={`${category.bgColor} p-8 lg:p-12 rounded-3xl`}>
                  <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    {category.title}
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed mb-8">
                    {category.description}
                  </p>
                  <a
                    href={category.link}
                    className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-xl hover:bg-blue-700 transition-all font-bold text-lg group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Explore Properties
                    <span className="group-hover:translate-x-2 transition-transform text-2xl">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Categories;