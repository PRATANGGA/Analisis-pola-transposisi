import React, { useState } from "react";
import axios from "axios";
import CipherForm from "./components/CipherForm";
import ResultList from "./components/ResultList";

function App() {
  const [results, setResults] = useState([]);

  const analyzeCipher = async (cipherText, keyLength) => {
    try {
      const response = await axios.post("http://localhost:5000/api/analyze", {
        cipher_text: cipherText,
        key_length: keyLength,
      });
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error analyzing cipher text:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      {" "}
      {/* Flex untuk mengatur posisi */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Transposition Cipher Analysis
      </h1>
      <div className="w-full max-w-md">
        {" "}
        {/* Atur lebar maksimum untuk ResultList */}
        <CipherForm onAnalyze={analyzeCipher} />
        <ResultList results={results} />
      </div>
    </div>
  );
}

export default App;
