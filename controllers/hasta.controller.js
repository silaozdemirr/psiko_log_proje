const db = require('../db');

exports.listPatients = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM hasta ORDER BY hasta_ad');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message:'DB error' });
  }
};

exports.getPatient = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.execute('SELECT * FROM hasta WHERE hasta_id = ?', [id]);
    if (rows.length===0) return res.status(404).json({ message:'Hasta bulunamadı' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message:'DB error' });
  }
};

exports.createPatient = async (req, res) => {
  const { hasta_ad, hasta_email, hasta_tel, hasta_yas } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO hasta (hasta_ad, hasta_email, hasta_tel, hasta_yas) VALUES (?, ?, ?, ?)', [hasta_ad, hasta_email, hasta_tel, hasta_yas]);
    res.json({ insertId: result.insertId });
  } catch (err) {
    res.status(500).json({ message:'DB error' });
  }
};

exports.updatePatient = async (req, res) => {
  const id = req.params.id;
  const { hasta_ad, hasta_email, hasta_tel, hasta_yas } = req.body;
  try {
    await db.execute('UPDATE hasta SET hasta_ad=?, hasta_email=?, hasta_tel=?, hasta_yas=? WHERE hasta_id = ?', [hasta_ad, hasta_email, hasta_tel, hasta_yas, id]);
    res.json({ ok:true });
  } catch (err) {
    res.status(500).json({ message:'DB error' });
  }
};

exports.deletePatient = async (req, res) => {
  const id = req.params.id;
  try {
    await db.execute('DELETE FROM hasta WHERE hasta_id = ?', [id]);
    res.json({ ok:true });
  } catch (err) {
    res.status(500).json({ message:'DB error' });
  }
};
