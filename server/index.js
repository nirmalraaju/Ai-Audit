import express from 'express';
import cors from 'cors';
import { analyzeCode } from './services/gemini.service.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/audit', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).send({ error: "No code provided" });

    const auditResults = await analyzeCode(code);
    res.json(auditResults);
  } catch (error) {
    console.error("Audit Error:", error);
    res.status(500).send({ error: "Failed to analyze code" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));