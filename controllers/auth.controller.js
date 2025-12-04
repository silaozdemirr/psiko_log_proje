const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { kullanici_adi, sifre } = req.body;
  if (!kullanici_adi || !sifre) return res.status(400).json({ success:false, message:'Gerekli alanlar eksik' });

  try {
    const [rows] = await db.execute('SELECT * FROM kullanici WHERE kullanici_ad = ?', [kullanici_adi]);
    if (rows.length === 0) return res.status(401).json({ success:false, message:'Kullanıcı yok' });

    const user = rows[0];
    // Eğer eski projede düz metin saklı ise: bcrypt yerine direkt kıyaslama yapılabilir.
    const valid = await bcrypt.compare(sifre, user.sifre_hash);
    if (!valid) return res.status(401).json({ success:false, message:'Şifre yanlış' });

    const token = jwt.sign({ id: user.kullanici_id, role: user.yetki_seviyesi }, process.env.JWT_SECRET, { expiresIn:'8h' });

    res.json({ success:true, message:'Giriş başarılı', token, user:{ id:user.kullanici_id, role:user.yetki_seviyesi }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Sunucu hatası' });
  }
};
