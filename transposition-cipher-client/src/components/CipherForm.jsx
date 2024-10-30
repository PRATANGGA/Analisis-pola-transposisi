import React, { useState } from "react";

function CipherForm({ onAnalyze }) {
  const [cipherText, setCipherText] = useState("");
  const [keyLength, setKeyLength] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(cipherText, keyLength);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white shadow-lg rounded-lg max-w-3xl w-full" // Pastikan lebar form penuh dan maksimal
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Analyze Cipher
      </h2>

      <label className="block">
        <span className="text-gray-700">Cipher Text</span>
        <textarea
          value={cipherText}
          onChange={(e) => setCipherText(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full h-32 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Key Length</span>
        <input
          type="number"
          value={keyLength}
          onChange={(e) => setKeyLength(e.target.value)}
          required
          className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
      >
        Analyze
      </button>
    </form>
  );
}

export default CipherForm;
