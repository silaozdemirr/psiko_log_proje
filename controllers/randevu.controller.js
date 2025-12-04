const db = require('../db');

exports.listRandevular = async (req,res) => {
  try {
    const [rows] = await db.execute(
      `SELECT r.*, h.hizmet_turu, p.doktor_ad, hs.hasta_ad
       FROM randevu r
       LEFT JOIN hizmet h ON r.hizmet_id = h.hizmet_id
       LEFT JOIN psikolog p ON r.doktor_id = p.doktor_id
       LEFT JOIN hasta hs ON r.hasta_id = hs.hasta_id
       ORDER BY r.randevu_tarih DESC`
    );
    res.json(rows);
  } catch(err){ res.status(500).json({ message:'DB error' }); }
};

exports.createRandevu = async (req,res) => {
  const { doktor_id, hasta_id, randevu_tarih, hizmet_id, durum } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO randevu (doktor_id, hasta_id, randevu_tarih, hizmet_id, durum) VALUES (?, ?, ?, ?, ?)',
      [doktor_id, hasta_id, randevu_tarih, hizmet_id, durum || 'Beklemede']
    );
    res.json({ insertId: result.insertId });
  } catch(err){ res.status(500).json({ message:'DB error' }); }
};

exports.randevularByHasta = async (req, res) => {
  const hastaId = req.params.hastaId;
  try {
    const [rows] = await db.execute(
      'SELECT r.*, h.hizmet_turu, p.doktor_ad FROM randevu r LEFT JOIN hizmet h ON r.hizmet_id=h.hizmet_id LEFT JOIN psikolog p ON r.doktor_id=p.doktor_id WHERE r.hasta_id = ? ORDER BY r.randevu_tarih DESC',
      [hastaId]
    );
    res.json(rows);
  } catch(err){ res.status(500).json({ message:'DB error' }); }
};

// update, get, delete benzer şekilde basit SQL ile yapılır.
