document.getElementById("randevuForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const r = {
        danisan: document.getElementById("danisan").value,
        tarih: new Date(document.getElementById("tarih").value).toLocaleDateString("tr-TR"),
        saat: document.getElementById("saat").value,
        seans: document.getElementById("seans").value,
        ucret: document.getElementById("ucret").value,
        durum: "Planlandı"
    };

    const mevcut = JSON.parse(localStorage.getItem("randevular")) || [];
    mevcut.push(r);
    localStorage.setItem("randevular", JSON.stringify(mevcut));

    alert("Randevu başarıyla eklendi!");

    window.location.href = "randevu_takvimi.html";
});
function logout() {
    // session temizleme (opsiyonel)
    localStorage.clear();
    sessionStorage.clear();

    // login sayfasına yönlendirme
    window.location.href = 'login.html';
}