import { useState } from "react";
import { API_URL } from "./config";

function App() {
  const [lat, setLat] = useState("43.65");
  const [lon, setLon] = useState("-79.38");
  const [date, setDate] = useState("2025-12-21");
  const [height, setHeight] = useState("10.2");
  const [data, setData] = useState(null);

  const fetchSun = async () => {
    try {
      const res = await fetch(
        `https://my-suncalc-api.onrender.com/sun?lat=${lat}&lon=${lon}&date=${date}&height=${height}`
      );
      if (!res.ok) throw new Error("Network error");
      const json = await res.json();
      setData(json);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h1>SunCalc Viewer</h1>
      <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
      <input value={lon} onChange={(e) => setLon(e.target.value)} placeholder="Longitude" />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        step="0.1"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Height (m)"
      />
      <button onClick={fetchSun}>Get Sun Data</button>

      {data && (
        <pre style={{ textAlign: "left" }}>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
