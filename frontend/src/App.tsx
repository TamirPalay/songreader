import React, { useEffect, useState } from "react";
import axios from "axios";

type Song = {
  id: number;
  band: string;
  title: string;
  year?: string;
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  //backend API
  const API = "http://localhost:3000";

  // fetch songs on load
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/songs`);
      setSongs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch songs");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a CSV file first");

    const fd = new FormData();
    fd.append("file", file);

    try {
      setLoading(true);
      await axios.post(`${API}/songs/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchSongs();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>🎵 Song CSV Importer</h1>

      <form onSubmit={handleUpload} style={{ marginBottom: 20 }}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={!file || loading} style={{ marginLeft: 10 }}>
          Upload
        </button>
        <button type="button" onClick={fetchSongs} disabled={loading} style={{ marginLeft: 10 }}>
          Refresh
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Band</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Title</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Year</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((s) => (
            <tr key={s.id}>
              <td style={{ padding: "6px 4px" }}>{s.band}</td>
              <td style={{ padding: "6px 4px" }}>{s.title}</td>
              <td style={{ padding: "6px 4px" }}>{s.year || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
