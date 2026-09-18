module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");

  try {
    const r = await fetch("https://api.textilecredit.com/tickers");
    if (!r.ok) throw new Error("Textile API returned " + r.status);
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: err.message || "failed to load Textile" });
  }
};
