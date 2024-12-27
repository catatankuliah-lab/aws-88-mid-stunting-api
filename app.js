// app.js
import express from 'express';
const app = express();
const port = 3089;  // Ganti port ke 3089

app.get('/', (req, res) => {
    res.send('Hello from Express.js API on port 3089!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});