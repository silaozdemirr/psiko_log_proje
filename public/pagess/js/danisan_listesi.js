// ÖRNEK VERİ (Backend bağlayınca fetch ile değiştirilebilir)
const danisanlar = [
    {
        id: 1,
        ad: "Ayşe Yılmaz",
        tel: "0555 111 22 33",
        seans: "Bireysel Terapi",
        sonRandevu: "2025-01-12",
        borc: "0₺"
    },
    {
        id: 2,
        ad: "Mehmet Kara",
        tel: "0544 888 77 66",
        seans: "Aile Terapisi",
        sonRandevu: "2025-01-05",
        borc: "350₺"
    }
];

window.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("danisan-body");

    danisanlar.forEach(d => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${d.ad}</td>
            <td>${d.tel}</td>
            <td>${d.seans}</td>
            <td>${d.sonRandevu}</td>
            <td>${d.borc}</td>
            <td>
                <button class="detay-btn" onclick="goDetail(${d.id})">Detay</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
});

function goDetail(id) {
    window.location.href = `danisan_detay.html?id=${id}`;
}

function logout() {
    // session temizleme (opsiyonel)
    localStorage.clear();
    sessionStorage.clear();

    // login sayfasına yönlendirme
    window.location.href = 'login.html';
}