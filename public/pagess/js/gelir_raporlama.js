const aylikGelirData = [4500, 5200, 4800, 6000, 7200, 6800, 7500, 8000, 8200, 9000, 9500, 10000];
const seansGelirData = {
    "Bireysel Terapi": 45000,
    "Aile Terapisi": 32000,
    "Çocuk Terapisi": 15000
};
const yillikGelirData = {
    "2023": 90000,
    "2024": 120000,
    "2025": 150000
};

// Aylık toplam gelir
document.getElementById("aylik-toplam").textContent = "₺" + aylikGelirData.reduce((a,b)=>a+b,0);

// Seans türü dağılımı (Pie Chart)
const ctxSeans = document.getElementById('seansGelirChart').getContext('2d');
new Chart(ctxSeans, {
    type: 'pie',
    data: {
        labels: Object.keys(seansGelirData),
        datasets: [{
            data: Object.values(seansGelirData),
            backgroundColor: ['#4a90e2','#50e3c2','#f5a623']
        }]
    }
});

// Yıllık gelir karşılaştırması (Bar Chart)
const ctxYillik = document.getElementById('yillikGelirChart').getContext('2d');
new Chart(ctxYillik, {
    type: 'bar',
    data: {
        labels: Object.keys(yillikGelirData),
        datasets: [{
            label: 'Toplam Gelir',
            data: Object.values(yillikGelirData),
            backgroundColor: '#4a90e2'
        }]
    }
});

// Aylık gelir grafiği (Line Chart)
const ctxAylik = document.getElementById('aylikGelir').getContext('2d');
new Chart(ctxAylik, {
    type: 'line',
    data: {
        labels: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
        datasets: [{
            label: 'Aylık Gelir',
            data: aylikGelirData,
            borderColor: '#4a90e2',
            backgroundColor: 'rgba(74,144,226,0.2)',
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    }
});

function logout() {
    // session temizleme (opsiyonel)
    localStorage.clear();
    sessionStorage.clear();

    // login sayfasına yönlendirme
    window.location.href = 'login.html';
}