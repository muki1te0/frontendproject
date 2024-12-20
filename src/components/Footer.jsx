import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 pt-6">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <h2 className="text-white text-4xl mb-6 font-bold">
          Carry. Access the Now.
        </h2>

        {/* Main Footer Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg mb-4">About</h3>
            <ul className="space-y-2">
              {[{ name: "Company", link: "/company" }].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.link} className="hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="hover:text-white">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Region and Terms Section */}
          <div>
            <h3 className="text-white text-lg mb-4">Region</h3>
            <p className="mb-4">Region: English | $ USD</p>
            <div className="flex space-x-4">
              <Link to="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-gray-900 py-6 mt-8 flex space-x-6 items-center justify-center">
          {[
            {
              href: "https://t.me/most_fabulous",
              icon:
                "https://img.icons8.com/?size=100&id=MIMjVKoXINIT&format=png&color=000000",
            },
            {
              href: "https://github.com/muki1te0",
              icon: "https://img.icons8.com/color/48/000000/github.png",
            },
            {
              href: "https://www.instagram.com/nnnn__nn228/",
              icon: "https://img.icons8.com/color/48/000000/instagram-new.png",
            },
          ].map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <img
                src={link.icon}
                alt=""
                className="w-8 h-8 grayscale hover:grayscale-0 transition duration-300"
              />
            </a>
          ))}
        </div>

        {/* Final Footer Bar */}
        <div className="bg-gray-900 py-4 flex flex-col md:flex-row justify-between items-center px-4 text-sm">
          <div className="text-gray-500">© 2024 Carry. All Rights Reserved.</div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <p>
              By signing up, you agree to our{" "}
              <Link to="/privacy-policy" className="hover:text-white">
                privacy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
