// Örnek veri
const odemeler = [
    { id:1, danisan: "Ayşe Yılmaz", tarih: "2025-01-12", durum: "Ödendi", ucret: "400₺" },
    { id:2, danisan: "Mehmet Kara", tarih: "2025-01-05", durum: "Bekliyor", ucret: "350₺" }
];

window.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("odeme-body");

    odemeler.forEach(o => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${o.danisan}</td>
            <td>${o.tarih}</td>
            <td>${o.durum}</td>
            <td>${o.ucret}</td>
            <td><button class="action-btn" onclick="islemYap(${o.id})">İşlem Yap</button></td>
        `;
        tbody.appendChild(tr);
    });
});

function islemYap(id) {
    const odeme = odemeler.find(o => o.id === id);
    const yeniDurum = prompt("Yeni durum girin (Ödendi / Bekliyor):", odeme.durum);
    if (!yeniDurum) return;
    odeme.durum = yeniDurum;
    location.reload(); // Sayfayı yeniden yükle
}


        function logout() {
            // session temizleme (opsiyonel)
            localStorage.clear();
            sessionStorage.clear();

            // login sayfasına yönlendirme
            window.location.href = 'login.html';
        }