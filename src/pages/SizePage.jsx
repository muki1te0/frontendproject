import React from "react";
import NavBar from "../components/NavBar"; // Adjust the path if necessary

const SizeChartPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Include the existing NavBar */}
      <NavBar />

      {/* Content Section */}
      <div className="flex flex-col items-start py-12 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Size Recommendation</h1>
        <p className="text-gray-700 text-left mb-8 text-lg leading-relaxed">
          Since all brands have slightly different sizing standards, we recommend that
          you reach out to the specific manufacturer (i.e., Nike, Adidas, etc.). They
          can objectively help recommend the right size for you. Items released in
          Asia-specific territories may vary in sizing. These items can be identified
          by the item’s title including “(Asia Sizing).” Please double-check before
          placing your order.
        </p>

        <div className="overflow-x-auto w-full shadow-lg rounded-lg bg-white">
          <table className="table-auto border-collapse border border-gray-200 w-full text-sm text-gray-800">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-300 px-6 py-3">Asian Size</th>
                <th className="border border-gray-300 px-6 py-3">US Size</th>
                <th className="border border-gray-300 px-6 py-3">Bust (cm/inch)</th>
                <th className="border border-gray-300 px-6 py-3">Waist (cm/inch)</th>
                <th className="border border-gray-300 px-6 py-3">Shoulder (cm/inch)</th>
                <th className="border border-gray-300 px-6 py-3">Sleeve (cm/inch)</th>
                <th className="border border-gray-300 px-6 py-3">Length (cm/inch)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["S", "S", "96/37.8", "88/34.6", "43.5/17.1", "56/22.0", "73/28.7"],
                ["M", "M", "100/39.4", "92/36.2", "44.5/17.5", "58/22.8", "74/29.1"],
                ["L", "M", "104/40.9", "96/37.8", "45.5/17.9", "59/23.2", "75/29.5"],
                ["XL", "L", "108/42.5", "100/39.4", "46.5/18.3", "60/23.6", "76/29.9"],
                ["XXL", "XL", "112/44.1", "104/40.9", "47.5/18.7", "61/24.0", "77/30.3"],
                ["3XL", "XL", "116/45.7", "108/42.5", "48.5/19.1", "62/24.4", "78/30.7"],
                ["4XL", "XXL", "120/47.2", "112/44.1", "49.5/19.5", "63/24.8", "79/31.1"],
              ].map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                >
                  {row.map((cell, idx) => (
                    <td
                      key={idx}
                      className="border border-gray-200 px-4 py-3 text-center"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-sm mt-6 italic">
          Made by Asian size, it usually runs 1-2 sizes smaller than US size.
          Please refer to actual numbers for the right shirts.
        </p>
      </div>
    </div>
  );
};

export default SizeChartPage;
