module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");

  try {
    const [tickerRes, depthRes] = await Promise.all([
      fetch("https://indodax.com/api/ticker/usdtidr"),
      fetch("https://indodax.com/api/depth/usdtidr"),
    ]);

    if (!tickerRes.ok || !depthRes.ok) {
      throw new Error("Indodax API returned " + (tickerRes.ok ? depthRes.status : tickerRes.status));
    }

    const ticker = await tickerRes.json();
    const depth = await depthRes.json();

    res.status(200).json({
      ticker: ticker.ticker,
      buy: depth.buy,
      sell: depth.sell,
    });
  } catch (err) {
    res.status(502).json({ error: err.message || "failed to load Indodax" });
  }
};
