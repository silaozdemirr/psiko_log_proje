const express = require("express");
const router = express.Router();
const db = require("../db");

// 📌 RANDEVU EKLE
router.post("/ekle", async (req, res) => {
    try {
        const { doktor_id, hasta_id, hizmet_id, randevu_tarih } = req.body;

        const [sonuc] = await db.execute(
            `INSERT INTO randevu (doktor_id, hasta_id, hizmet_id, randevu_tarih, durum)
             VALUES (?, ?, ?, ?, ?)`,
            [doktor_id, hasta_id, hizmet_id, randevu_tarih, "Bekliyor"]
        );

        res.json({ success: true, randevuId: sonuc.insertId });
    } catch (err) {
        console.error("Randevu ekleme hatası:", err);
        res.status(500).json({ success: false, message: "Sunucu hatası" });
    }
});

// 📌 TÜM RANDEVULAR
router.get("/liste", async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT r.randevu_id, r.randevu_tarih, r.durum,
                   h.hasta_ad, h.hasta_tel,
                   p.doktor_ad,
                   hst.hizmet_turu
            FROM randevu r
            JOIN hasta h ON r.hasta_id = h.hasta_id
            JOIN psikolog p ON r.doktor_id = p.doktor_id
            JOIN hizmet hst ON r.hizmet_id = hst.hizmet_id
        `);

        res.json(rows);
    } catch (error) {
        console.error("Randevu listeleme hatası:", error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
