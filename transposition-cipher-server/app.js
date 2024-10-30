// server.js
const express = require('express');
const cors = require('cors'); // Import CORS

const app = express();
const PORT =  5000;

// Middleware untuk parsing JSON dan CORS
app.use(cors()); // Tambahkan middleware CORS
app.use(express.json());

// Fungsi untuk mendekripsi teks cipher menggunakan urutan kunci
function decryptWithKey(cipherText, keyOrder) {
    const numColumns = keyOrder.length;
    const numRows = Math.ceil(cipherText.length / numColumns);
    const grid = Array(numColumns).fill('');

    let start = 0;
    keyOrder.forEach(index => {
        grid[index] = cipherText.slice(start, start + numRows);
        start += numRows;
    });

    let message = '';
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            message += grid[j][i] || '';
        }
    }

    return { message: message.replace(/_/g, ''), grid };
}

// Fungsi untuk menghasilkan semua permutasi dari array
function permute(arr) {
    if (arr.length <= 1) return [arr];
    const permutations = [];
    const [first, ...rest] = arr;

    const subPermutations = permute(rest);
    subPermutations.forEach(subPerm => {
        for (let i = 0; i <= subPerm.length; i++) {
            const start = subPerm.slice(0, i);
            const end = subPerm.slice(i);
            permutations.push([...start, first, ...end]);
        }
    });

    return permutations;
}

// Fungsi untuk menganalisis teks cipher
function analyzeTransposition(cipherText, keyLength) {
    const possibleKeys = permute([...Array(keyLength).keys()]);
    const possibleMessages = [];

    possibleKeys.forEach(keyOrder => {
        const { message, grid } = decryptWithKey(cipherText, keyOrder);
        possibleMessages.push({
            keyOrder: keyOrder.join(', '),
            decryptedMessage: message,
            grid: grid
        });
    });

    return possibleMessages;
}

// Endpoint untuk menganalisis teks cipher
app.post('/api/analyze', (req, res) => {
    const { cipher_text, key_length } = req.body;
    const keyLength = parseInt(key_length, 10);

    // Validasi input
    if (!cipher_text || !key_length || isNaN(keyLength)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const results = analyzeTransposition(cipher_text, keyLength);
    res.json(results);
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
