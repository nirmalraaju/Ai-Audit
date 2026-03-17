// client/src/hooks/useAudit.js
import { useState } from 'react';
import axios from 'axios';

export const useAudit = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const runAudit = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/audit', { code });
      setResults(response.data);
    } catch (error) {
      console.error("Audit failed", error);
      alert("Check if your server is running!");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, runAudit };
};