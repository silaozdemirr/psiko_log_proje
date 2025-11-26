// Örnek veri
const seansTalepData = {
    "Bireysel Terapi": 50,
    "Aile Terapisi": 30,
    "Çocuk Terapisi": 20
};

const iptalOraniData = [2, 3, 2.5, 4, 3.5, 2]; // Ay bazlı örnek
const danisanTrendData = [5, 10, 12, 18, 20, 25, 30, 35, 40, 45, 50, 55];

// Seans Talep Grafiği (Bar Chart)
const ctxSeans = document.getElementById('seansTalepChart').getContext('2d');
new Chart(ctxSeans, {
    type: 'bar',
    data: {
        labels: Object.keys(seansTalepData),
        datasets: [{
            label: 'Talep Sayısı',
            data: Object.values(seansTalepData),
            backgroundColor: ['#4a90e2','#50e3c2','#f5a623']
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } }
    }
});

// Randevu İptal Oranı (Line Chart)
const ctxIptal = document.getElementById('iptalOraniChart').getContext('2d');
new Chart(ctxIptal, {
    type: 'line',
    data: {
        labels: ["Oca","Şub","Mar","Nis","May","Haz"],
        datasets: [{
            label: "İptal Oranı (%)",
            data: iptalOraniData,
            borderColor: "#dc3545",
            backgroundColor: "rgba(220,53,69,0.2)",
            fill: true,
            tension: 0.3
        }]
    },
    options: { responsive: true }
});

// Danışan Artış Trendi (Line Chart)
const ctxDanisan = document.getElementById('danisanTrendChart').getContext('2d');
new Chart(ctxDanisan, {
    type: 'line',
    data: {
        labels: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
        datasets: [{
            label: "Yeni Danışan",
            data: danisanTrendData,
            borderColor: "#4a90e2",
            backgroundColor: "rgba(74,144,226,0.2)",
            fill: true,
            tension: 0.3
        }]
    },
    options: { responsive: true }
});

// Yoğunluk Analizi (Heatmap Tablosu)
const heatmapData = [
    ["09:00", 2, 3, 1, 0, 1, 2, 0],
    ["10:00", 3, 2, 2, 1, 1, 3, 1],
    ["11:00", 1, 1, 2, 2, 3, 1, 2],
    ["12:00", 0, 1, 1, 3, 2, 1, 2],
];

const heatmap = document.getElementById("heatmap");
const days = ["Saat / Gün","Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];

let html = "<tr>";
days.forEach(d => html += `<th>${d}</th>`);
html += "</tr>";

heatmapData.forEach(row => {
    html += "<tr>";
    row.forEach(cell => html += `<td>${cell}</td>`);
    html += "</tr>";
});

heatmap.innerHTML = html;


function logout() {
    // session temizleme (opsiyonel)
    localStorage.clear();
    sessionStorage.clear();

    // login sayfasına yönlendirme
    window.location.href = 'login.html';
}S