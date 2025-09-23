import cors from "cors";
import express from "express";
import serverlessExpress from "@vendia/serverless-express";
import SunCalc from "suncalc";

const app = express();
app.use(cors());
app.use(express.json());

// Helper function
function shadowLength(objectHeightMeters, altitudeRadians) {
  return objectHeightMeters / Math.tan(altitudeRadians);
}

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the SunCalc API");
});

// Main Sun route
app.get("/sun", (req, res) => {
  const { lat, lon, date, height } = req.query;      // <-- include height
  const when = date ? new Date(date) : new Date();

  const pos = SunCalc.getPosition(when, parseFloat(lat), parseFloat(lon));

  let shadow = null;
  if (height) {
    const h = parseFloat(height);
    shadow =
      pos.altitude > 0
        ? shadowLength(h, pos.altitude)
        : Infinity; // sun below horizon → no finite shadow
  }

  res.json({
    position: pos,
    times: SunCalc.getTimes(when, parseFloat(lat), parseFloat(lon)),
    shadowLength: shadow
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export for AWS Lambda (optional)
export const handler = serverlessExpress({ app });

