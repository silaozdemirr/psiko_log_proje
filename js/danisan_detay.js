// Örnek veri (backend bağlanınca fetch ile değiştirilecek)
const danisanlar = {
    1: {
        ad: "Ayşe Yılmaz",
        tel: "0555 111 22 33",
        seans: "Bireysel Terapi",
        randevular: [
            { tarih: "2025-01-12", tur: "Bireysel", not: "İyi ilerleme", ucret: "400₺" },
            { tarih: "2025-01-05", tur: "Bireysel", not: "-", ucret: "400₺" }
        ],
        odemeler: [
            { tarih: "2025-01-12", tutar: "400₺", durum: "Ödendi" },
            { tarih: "2025-01-05", tutar: "400₺", durum: "Bekliyor" }
        ]
    }
};

function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

document.addEventListener("DOMContentLoaded", () => {
    const id = getId();
    const data = danisanlar[id];

    document.getElementById("danisan-isim").textContent = data.ad;
    document.getElementById("g-tel").textContent = data.tel;
    document.getElementById("g-seans").textContent = data.seans;

    // Randevu geçmişi
    const rBody = document.getElementById("randevu-body");
    data.randevular.forEach(r => {
        rBody.innerHTML += `
            <tr>
                <td>${r.tarih}</td>
                <td>${r.tur}</td>
                <td>${r.not}</td>
                <td>${r.ucret}</td>
            </tr>`;
    });

    // Ödeme geçmişi
    const oBody = document.getElementById("odeme-body");
    data.odemeler.forEach(o => {
        oBody.innerHTML += `
            <tr>
                <td>${o.tarih}</td>
                <td>${o.tutar}</td>
                <td>${o.durum}</td>
            </tr>`;
    });

    // TAB GEÇİŞLERİ
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });
});

function logout() {
    // session temizleme (opsiyonel)
    localStorage.clear();
    sessionStorage.clear();

    // login sayfasına yönlendirme
    window.location.href = 'login.html';
}