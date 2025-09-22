import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import SunCalc from 'suncalc';

const app = express();

app.get('/sun', (req, res) => {
  const { lat, lon, date } = req.query;
  const when = date ? new Date(date) : new Date();
  res.json({
    position: SunCalc.getPosition(when, parseFloat(lat), parseFloat(lon)),
    times: SunCalc.getTimes(when, parseFloat(lat), parseFloat(lon))
  });
});

// Port Setting
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Existing middleware or API routes…
app.get("/", (req, res) => {
  res.send("Welcome to the SunCalc API");
});

// Export a Lambda handler
export const handler = serverlessExpress({ app });
