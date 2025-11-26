const express = require("express");
const app = express();
const db = require("./db");

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
const randevuRoutes = require("./routes/randevu");
app.use("/api/randevu", randevuRoutes);

// Test endpoint (hasta listesi)
app.get("/hastalar", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM hasta");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Sorgu hatası", details: err });
    }
});

app.listen(3000, () => console.log("Server çalışıyor: 3000"));