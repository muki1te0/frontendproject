import React from "react";
import NavBar from "../components/NavBar";

const TermsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      { }
      <NavBar />

      { }
      <div className="flex-grow py-12 px-6">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Terms and Conditions</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to Carry. These terms and conditions outline the rules and
            regulations for the use of Carry's Website.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use Carry if you do not agree to all of
            the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Intellectual Property Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unless otherwise stated, Carry and/or its licensors own the
            intellectual property rights for all material on Carry. All
            intellectual property rights are reserved. You may access this from
            Carry for your own personal use subjected to restrictions set in these
            terms and conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            User Responsibilities
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You must not:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Republish material from Carry</li>
            <li>Sell, rent or sub-license material from Carry</li>
            <li>Reproduce, duplicate or copy material from Carry</li>
            <li>Redistribute content from Carry</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In no event shall Carry, nor any of its officers, directors, and
            employees, be held liable for anything arising out of or in any way
            connected with your use of this website whether such liability is
            under contract. Carry, including its officers, directors, and
            employees, shall not be held liable for any indirect, consequential,
            or special liability arising out of or in any way related to your use
            of this website.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Indemnification
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You hereby indemnify to the fullest extent Carry from and against any
            and/or all liabilities, costs, demands, causes of action, damages,
            and expenses arising in any way related to your breach of any of the
            provisions of these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Governing Law
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms will be governed by and interpreted in accordance with
            the laws of the jurisdiction in which Carry operates.
          </p>

          <p className="text-gray-700 leading-relaxed mt-8">
            If you have any questions about these Terms, please contact us at
            <a href="mailto:support@carry.com" className="text-blue-500 hover:underline">
              {" "}
              support@carry.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
