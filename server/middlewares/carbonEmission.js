import { co2 } from "@tgwf/co2";

// Initialize CO2.js with Sustainable Web Design model
const co2Emission = new co2({ model: "swd" });

// Global totals
let totalBytesEver = 0;
let totalEmissionsEver = 0;

const carbonEmissionMiddleware = (req, res, next) => {
  let requestBytes = 0;
  let responseBytes = 0;

  // Calculate request size
  if (req.body) requestBytes = Buffer.byteLength(JSON.stringify(req.body), "utf8");
  if (req.query) requestBytes += Buffer.byteLength(JSON.stringify(req.query), "utf8");
  if (req.headers) requestBytes += Buffer.byteLength(JSON.stringify(req.headers), "utf8");

  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk, ...args) {
    if (chunk) responseBytes += Buffer.byteLength(chunk, "utf8");
    return originalWrite.apply(res, [chunk, ...args]);
  };

  res.end = function (chunk, ...args) {
    if (chunk) responseBytes += Buffer.byteLength(chunk, "utf8");

    const totalBytes = requestBytes + responseBytes;
    const greenHost = false; // set true if hosted on green provider
    const emissions = co2Emission.perByte(totalBytes, greenHost);

    totalBytesEver += totalBytes;
    totalEmissionsEver += emissions;

    console.log(`Data transferred: ${totalBytes} bytes`);
    console.log(`Estimated CO₂ emissions: ${emissions.toFixed(3)} g`);

    return originalEnd.apply(res, [chunk, ...args]);
  };

  next();
};

// ✅ Helper to get global totals
export const getCarbonTotals = () => ({
  totalBytesEver,
  totalEmissionsEver,
});

export default carbonEmissionMiddleware;
