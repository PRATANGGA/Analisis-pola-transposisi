import React from "react";
import Result from "./Result";

function ResultList({ results }) {
  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-xl font-semibold">Results:</h2>
      {results.map((result, index) => (
        <Result
          key={index}
          keyOrder={result.keyOrder}
          grid={result.grid}
          decryptedMessage={result.decryptedMessage}
        />
      ))}
    </div>
  );
}

export default ResultList;
