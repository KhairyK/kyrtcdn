export const handler = async () => {
  const targetURL = "https://cdn.kyrt.my.id/"; // URL yang mau dicek

  const start = Date.now();
  let latency = 0;
  let cache = "unknown";
  let bandwidth = 0;
  let online = true;
  let statusCode = 0;

  try {
    const res = await fetch(targetURL);
    latency = Date.now() - start;
    statusCode = res.status;
    online = res.ok;

    // BACA CACHE HEADER DARI NETLIFY
    cache =
      res.headers.get("x-nf-request-id")?.includes("cache")
        ? "HIT"
        : "MISS";

    // BACA PERKIRAAN BANDWIDTH
    const text = await res.text();
    bandwidth = new Blob([text]).size; // ukuran byte
  } catch (err) {
    online = false;
    latency = -1;
    cache = "none";
    bandwidth = 0;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      online,
      statusCode,
      latency,
      cache,
      bandwidth,
      timestamp: Date.now()
    }),
  };
};
