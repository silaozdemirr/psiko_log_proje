const express = require("express");
const router = express.Router();
const db = require("../db");

// BU AY GERÇEKLEŞEN RANDEVU SAYISI
router.get("/bu-ay-sayisi", async (req, res) => {
    try {
        const query = `
            SELECT COUNT(*) AS bu_ay_randevu_sayisi
            FROM randevu
            WHERE MONTH(randevu_tarih) = MONTH(CURDATE())
              AND YEAR(randevu_tarih) = YEAR(CURDATE());
        `;

        const [rows] = await db.query(query);
        res.json(rows[0]);

    } catch (err) {
        console.error("Sorgu hatası:", err);
        res.status(500).json({ message: "Veritabanı hatası" });
    }
});

module.exports = router;