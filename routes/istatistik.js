app.get('/api/stats/danisan-sayisi', async (req,res) => {
  const [rows] = await db.execute('SELECT COUNT(*) as sayi FROM hasta');
  res.json(rows[0]);
});


app.get('/api/stats/randevu-son-7-gun', async (req,res) => {
  const [rows] = await db.execute(`SELECT DATE(randevu_tarih) as tarih, COUNT(*) as adet 
    FROM randevu WHERE randevu_tarih >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY DATE(randevu_tarih)`);
  res.json(rows);
});


app.get('/api/stats/gelir-ay', async (req,res) => {
  const [rows] = await db.execute(`SELECT MONTH(odeme_tarihi) as ay, SUM(tutar) as toplam FROM odeme GROUP BY MONTH(odeme_tarihi)`);
  res.json(rows);
});
