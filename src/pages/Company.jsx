import React from "react";
import NavBar from "../components/NavBar"; // Ensure this path is correct

const AboutCarry = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Every item is Carry Verified.</h1>
          <p className="text-lg mb-8">
            Discover the rigorous verification process that ensures every product meets
            our highest standards.
          </p>
          <img
            src="https://images-wp.stockx.com/about/uploads/2022/11/VERIFIED-Full-Size.jpg"
            alt="Carry Verification"
            className="mx-auto rounded-lg w-full max-w-4xl"
          />
        </div>
      </section>

      {/* Trust The Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Trust The Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Process Items */}
            {[
              {
                title: "Condition",
                description:
                  "Each item is inspected to meet our rigorous quality standards.",
                img: "https://images-wp.stockx.com/about/uploads/2020/11/Data-Center-519A7408-2795-crop-1000x800.jpg",
              },
              {
                title: "Packaging",
                description:
                  "All items are packaged securely for maximum protection during transit.",
                img: "https://avatars.mds.yandex.net/i?id=3373c2c8c83a338d8fbeca9a54320670abc95348-8455861-images-thumbs&n=13",
              },
              {
                title: "Accessories",
                description:
                  "Accessories are verified to ensure they meet our high standards.",
                img: "https://images-wp.stockx.com/about/uploads/2022/06/Merchandising-Modules-EN-Image-07-1200x675.jpg",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto mb-4 rounded-lg shadow-lg w-80 h-80 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value Items */}
            {[
              {
                title: "Experience & Data",
                description:
                  "Our experienced team ensures every product meets the standards you expect.",
                img: "https://images-wp.stockx.com/about/uploads/2020/12/Mask-Group-1-1200x900.jpg",
              },
              {
                title: "Advanced Technology",
                description:
                  "Utilizing cutting-edge tools to verify authenticity and quality.",
                img: "https://images-wp.stockx.com/about/uploads/2020/12/Mask-Group-2-1200x900.jpg",
              },
              {
                title: "Quality Assurance",
                description:
                  "Every item goes through multiple checks to ensure maximum satisfaction.",
                img: "https://images-wp.stockx.com/about/uploads/2022/09/2021_12_06_AUTHENTICATION_CENTER9112-800x800.jpg",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto mb-4 rounded-lg shadow-lg w-80 h-80 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hear From Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Hear From Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonials */}
            {[
              {
                text: "I take pride in ensuring each product exceeds customer expectations.",
              },
              {
                text: "Our goal is to maintain the highest standards for every item.",
              },
              {
                text: "It's fulfilling to see customers trust our process and standards.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 shadow-lg rounded-lg text-center"
              >
                <p className="italic mb-4">"{item.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutCarry;
