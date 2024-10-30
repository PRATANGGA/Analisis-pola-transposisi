import React from "react";

function Result({ keyOrder, grid, decryptedMessage }) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow">
      <p>
        <strong>Key Order:</strong> {keyOrder}
      </p>
      <div className="mt-2">
        <strong>Grid:</strong>
      </div>
      <div className="grid gap-2 grid-cols-1 mt-2">
        {grid.map((column, i) => (
          <div key={i} className="bg-gray-50 p-2 rounded border">
            Column {i + 1}: {column}
          </div>
        ))}
      </div>
      <p className="mt-2">
        <strong>Decrypted Message:</strong> {decryptedMessage}
      </p>
    </div>
  );
}

export default Result;
