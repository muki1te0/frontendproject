import React from "react";
import NavBar from "./NavBar";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="pt-16 px-8">
        <div className="bg-white shadow-md p-8 rounded-md max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            Your privacy is important to us. This Privacy Policy outlines how we
            collect, use, and protect your information.
          </p>

          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <p className="mb-4">
            We may collect personal information such as your name, email
            address, and any other details you provide during registration or
            account setup.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            Your information is used to provide and improve our services, manage
            your account, and communicate updates or promotional offers.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Protection of Your Data
          </h2>
          <p className="mb-4">
            We take reasonable measures to safeguard your information from
            unauthorized access, disclosure, or misuse.
          </p>

          <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
          <p className="mb-4">
            You have the right to access, update, or delete your personal
            information. Contact us if you have any concerns.
          </p>

          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at <span className="font-semibold">BauBekBaiZHan@gmail.com</span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
