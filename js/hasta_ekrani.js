document.addEventListener("DOMContentLoaded", () => {

    /*** LOGOUT ***/
    window.logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = 'login.html';
    }

    /*** Örnek Randevular ***/
    const upcomingRandevular = [
        { tarih: "25 Kasım 2025", saat: "14:00", tur: "Bireysel Terapi" },
        { tarih: "27 Kasım 2025", saat: "10:00", tur: "Çift Terapisi" },
        { tarih: "29 Kasım 2025", saat: "16:00", tur: "Grup Terapisi" }
    ];

    /*** Örnek Ödemeler ***/
    const payments = [
        { tarih: "01 Kasım 2025", tutar: 200, odendi: true },
        { tarih: "12 Kasım 2025", tutar: 250, odendi: false },
        { tarih: "20 Kasım 2025", tutar: 150, odendi: true },
        { tarih: "22 Kasım 2025", tutar: 300, odendi: false }
    ];

    /*** YAKLAŞAN RANDEVU LİSTESİ ***/
    const upcomingContainer = document.getElementById("upcomingRandevular");
    if (upcomingContainer) {
        upcomingContainer.innerHTML = "";
        upcomingRandevular.forEach(r => {
            const div = document.createElement("div");
            div.className = "randevu-item";
            div.innerHTML = `<strong>${r.tarih} ${r.saat}</strong> - ${r.tur}`;
            upcomingContainer.appendChild(div);
        });
    }

    /*** RANDEVU MODAL FONKSİYONLARI ***/
    const randevuModal = document.getElementById("randevuModal");
    const randevuDetails = document.getElementById("randevuDetails");

    function openModal(r) {
        randevuModal.style.display = "block";
        randevuDetails.innerHTML = `
            <p><strong>Tarih:</strong> ${r.tarih}</p>
            <p><strong>Saat:</strong> ${r.saat}</p>
            <p><strong>Tür:</strong> ${r.tur}</p>
        `;
    }

    window.closeModal = () => {
        randevuModal.style.display = "none";
    }

    window.confirmAppointment = () => {
        alert("Randevu onaylandı!");
        closeModal();
    }

    /*** ÖDEME TABLOSU VE CHART ***/
    const paymentTableBody = document.querySelector("#paymentTable tbody");
    if (paymentTableBody) {
        paymentTableBody.innerHTML = "";
        payments.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${p.tarih}</td>
                <td>${p.tutar}₺</td>
                <td class="${p.odendi ? 'payment-paid' : 'payment-pending'}">
                    ${p.odendi ? 'Ödendi' : 'Ödenmedi'}
                </td>
            `;
            paymentTableBody.appendChild(tr);
        });
    }

    const chartCanvas = document.getElementById("paymentChart");
    if (chartCanvas) {
        new Chart(chartCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: payments.map(p => p.tarih),
                datasets: [{
                    label: 'Ödeme Tutarı',
                    data: payments.map(p => p.tutar),
                    backgroundColor: payments.map(p => p.odendi ? 'green' : 'red')
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

});

// Çıkış
function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login.html';
}