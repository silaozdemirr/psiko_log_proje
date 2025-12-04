const express = require("express");
const router = express.Router();
const db = require("../db");

// Yönetici Girişi
router.post("/yonetici/login", async (req, res) => {
    const { kullanici_adi, sifre } = req.body;

    if (!kullanici_adi || !sifre) {
        return res.status(400).json({ success: false, message: "Kullanıcı adı ve şifre gereklidir." });
    }

    try {
        const [rows] = await db.execute(
            "SELECT doktor_id, sifre_hash FROM kullanici WHERE kullanici_ad = ? AND yetki_seviyesi = ?",
            [kullanici_adi, "Yonetici"]
        );

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: "Kullanıcı adı veya şifre yanlış." });
        }

        const user = rows[0];

        if (user.sifre_hash.trim() === sifre.trim()) {
            const [psikologRows] = await db.execute(
                "SELECT doktor_ad FROM psikolog WHERE doktor_id = ?",
                [user.doktor_id]
            );

            const doktorAd = psikologRows.length > 0 ? psikologRows[0].doktor_ad : "Yönetici";

            return res.json({
                success: true,
                message: "Giriş başarılı!",
                doktorId: user.doktor_id,
                doktorAd: doktorAd
            });
        } else {
            return res.status(401).json({ success: false, message: "Şifre yanlış." });
        }
    } catch (err) {
        console.error("Yönetici login hatası:", err);
        res.status(500).json({ success: false, message: "Sunucu hatası" });
    }
});

module.exports = router;


// Hasta Girişi
router.post("/hasta/login", async (req, res) => {
    const { ad, soyad, sifre } = req.body;

    if (!ad || !soyad || !sifre) {
        return res.status(400).json({ success: false, message: "Tüm alanlar gereklidir." });
    }

    try {
        // Hasta tablosundan sorgu
        const [rows] = await db.execute(
            "SELECT hasta_id, hasta_ad, hasta_email FROM hasta WHERE hasta_ad = ? AND hasta_soyad = ? AND sifre_hash = ?",
            [ad, soyad, sifre]
        );

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: "Bilgiler yanlış!" });
        }

        const hasta = rows[0];

        // Giriş başarılı → frontend’e hasta bilgilerini gönder
        res.json({ success: true, hastaId: hasta.hasta_id, hastaAd: hasta.hasta_ad });
    } catch (err) {
        console.error("Hasta login hatası:", err);
        res.status(500).json({ success: false, message: "Sunucu hatası" });
    }
});

const express = require('express');
const bcrypt = require('bcrypt'); // Eğer hash kullanacaksan

// Örnek kullanıcı
const users = [
    { kullanici_ad: 'yonetici', sifre: 'test123', yetki: 'Yönetici' }
];

router.post('/yonetici/login', (req, res) => {
    const { kullanici_adi, sifre } = req.body;

    const user = users.find(u => u.kullanici_ad === kullanici_adi);

    if (!user) return res.json({ success: false, message: 'Kullanıcı bulunamadı' });

    // Hash kullanmıyorsak düz kontrol
    if (sifre !== user.sifre) return res.json({ success: false, message: 'Şifre yanlış' });

    res.json({ success: true, message: 'Giriş başarılı' });
});

module.exports = router;
