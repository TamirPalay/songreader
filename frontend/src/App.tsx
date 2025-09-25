import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type Song = {
  id: number;
  band: string;
  title: string;
  year?: string;
};

type SortConfig = {
  key: keyof Song;
  direction: "asc" | "desc";
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: "band", direction: "asc" });

  const API = "http://localhost:3000";

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/songs`);
      let data: Song[] = res.data;
      if (sortConfig) {
        data = sortSongs(data, sortConfig);
      }
      setSongs(data);
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

  const sortSongs = (data: Song[], config: SortConfig) => {
    return [...data].sort((a, b) => {
      const aValue = (a[config.key] || "").toString().toLowerCase();
      const bValue = (b[config.key] || "").toString().toLowerCase();
      if (aValue < bValue) return config.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return config.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key: keyof Song) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setSongs(sortSongs(songs, { key, direction }));
  };

  const getSortClass = (key: keyof Song) => {
    if (!sortConfig || sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "sort-asc" : "sort-desc";
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1>🎵 Song CSV Importer</h1>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button type="submit" disabled={!file || loading}>
            Upload
          </button>
          <button type="button" onClick={fetchSongs} disabled={loading}>
            Refresh
          </button>
        </form>

        {loading && <p>Loading...</p>}

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("band")} className={getSortClass("band")}>Band</th>
              <th onClick={() => handleSort("title")} className={getSortClass("title")}>Title</th>
              <th onClick={() => handleSort("year")} className={getSortClass("year")}>Year</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((s) => (
              <tr key={s.id}>
                <td>{s.band}</td>
                <td>{s.title}</td>
                <td>{s.year || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;