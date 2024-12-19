import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 pt-6 ">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-4xl mb-6 font-bold">
          Carry. Access the Now.
        </h2>

        <div className="flex justify-around">
          <div>
            <h3 className="text-white text-lg mb-2">About</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Verification
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Company
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Carry Reviews
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg mb-2">Help</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
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
          <div>
            <h3 className="text-white text-lg mb-2">Sell</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-white">
                  Selling Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Professional Tools
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Carry Pro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Sponsored Asks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Developers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-between items-center text-sm">
          <div>
            <span>Region: English | $ USD</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Your Privacy Choices
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gray-900 pt-5 pb-6 mt-6 flex space-x-6 items-center justify-center ">
          <a href="#">
            <img
              src="https://img.icons8.com/color/48/000000/facebook.png"
              alt="Facebook"
              className="w-7 grayscale hover:grayscale-0 transition duration-300"
            />
          </a>
          <a href="#">
            <img
              src="https://img.icons8.com/color/48/000000/twitter.png"
              alt="Twitter"
              className="w-7 grayscale hover:grayscale-0 transition duration-300"
            />
          </a>
          <a href="#">
            <img
              src="https://img.icons8.com/color/48/000000/instagram-new.png"
              alt="Instagram"
              className="w-7 grayscale hover:grayscale-0 transition duration-300"
            />
          </a>
        </div>
      </div>
      <div className="bg-gray-900 flex pb-3 justify-around items-center">
        <div className="">Carry</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Your Privacy Choices
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
