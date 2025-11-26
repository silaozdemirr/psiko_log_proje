const calendarGrid = document.getElementById("calendarGrid");
const dateLabel = document.getElementById("currentDate");

let currentDate = new Date();

const hours = [
    "09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00"
];

function formatDate(date) {
    return date.toLocaleDateString("tr-TR");
}

function loadRandevular() {
    const randevular = JSON.parse(localStorage.getItem("randevular")) || [];
    return randevular.filter(r => r.tarih === formatDate(currentDate));
}

function renderCalendar() {
    dateLabel.textContent = formatDate(currentDate);
    calendarGrid.innerHTML = "";

    const todaysRandevular = loadRandevular();

    hours.forEach(saat => {
        const slot = document.createElement("div");
        slot.className = "time-slot";

        const randevu = todaysRandevular.find(r => r.saat === saat);

        slot.innerHTML = `
            <strong>${saat}</strong>
            <div>${randevu ? `<div class="randevu-item">${randevu.danisan}</div>` : "-"}</div>
        `;

        calendarGrid.appendChild(slot);
    });
}

renderCalendar();

document.getElementById("prevDay").onclick = () => {
    currentDate.setDate(currentDate.getDate() - 1);
    renderCalendar();
};

document.getElementById("nextDay").onclick = () => {
    currentDate.setDate(currentDate.getDate() + 1);
    renderCalendar();
};

function logout() {
    // session temizleme (opsiyonel)
    localStorage.clear();
    sessionStorage.clear();

    // login sayfasına yönlendirme
    window.location.href = 'login.html';
}

