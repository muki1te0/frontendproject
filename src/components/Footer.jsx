import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-4xl mb-6 font-bold">
          Carry. Access the Now.
        </h2>

        {/* Main Footer Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg mb-2">About</h3>
            <ul>
              {["How It Works", "Verification", "Newsroom", "Company", "Careers", "Carry Reviews"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white text-lg mb-2">Help</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Product Suggestions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Sell Section */}
          <div>
            <h3 className="text-white text-lg mb-2">Sell</h3>
            <ul>
              {["Selling Guide", "Professional Tools", "Carry Pro", "Sponsored Asks", "Developers"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 flex flex-wrap justify-between items-center text-sm">
          <div>
            <span>Region: English | $ USD</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <Link
              to="/privacy-policy"
              className="text-blue-500 hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="bg-gray-900 pt-5 pb-6 mt-6 flex space-x-6 items-center justify-center">
        {[
          { href: "https://t.me/most_fabulous", icon: "https://img.icons8.com/?size=100&id=MIMjVKoXINIT&format=png&color=000000" },
          { href: "https://github.com/muki1te0", icon: "https://img.icons8.com/color/48/000000/github.png" },
          { href: "https://www.instagram.com/nnnn__nn228/", icon: "https://img.icons8.com/color/48/000000/instagram-new.png" }
        ].map((link, idx) => (
          <a key={idx} href={link.href}>
            <img
              src={link.icon}
              alt=""
              className="w-7 grayscale hover:grayscale-0 transition duration-300"
            />
          </a>
        ))}
      </div>

      {/* Final Footer Bar */}
      <div className="bg-gray-900 flex pb-3 justify-between items-center px-4">
        <div>Carry</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            <p>
              By signing up, you agree to our{" "}
              <Link
                to="/privacy-policy"
                className="text-blue-500 hover:underline"
              >
                privacy
              </Link>
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
