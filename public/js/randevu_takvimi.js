document.addEventListener("DOMContentLoaded", () => {
    const takvimBody = document.getElementById("takvim-body");
    const currentDateSpan = document.getElementById("currentDate");

    // Başlangıç: bugün
    let currentDate = new Date();

    // Saat blokları (09:00 - 16:00)
    const saatler = [
        "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00"
    ];

    // 🔹 20 GÜNLÜK, DOLUYA YAKIN ÖRNEK RANDEVU VERİLERİ
    // Tarihler: 2025-11-30 .. 2025-12-19 (20 gün)
    const ornekRandevular = {
        "2025-12-04": [
            { saat: "09:00", danisan: "Merve Yıldız" },
            { saat: "10:00", danisan: "Emre Kaya" },
            { saat: "11:00", danisan: "Gamze Aydın" },
            { saat: "13:00", danisan: "Sıla Özdemir" },
            { saat: "14:00", danisan: "Ahmet Kalkan" },
            { saat: "15:00", danisan: "Leyla Erdem" }
        ],
        "2025-12-01": [
            { saat: "09:00", danisan: "Mehmet Çelik" },
            { saat: "10:00", danisan: "Tuğçe Şen" },
            { saat: "11:00", danisan: "Kerem Arslan" },
            { saat: "12:00", danisan: "Derya Tok" },
            { saat: "13:00", danisan: "Ayşe Yalçın" },
            { saat: "14:00", danisan: "Ali Demir" },
            { saat: "15:00", danisan: "Tuna Yılmaz" }
        ],
        "2025-12-02": [
            { saat: "09:00", danisan: "Ebru Sevinç" },
            { saat: "10:00", danisan: "Berk Öztürk" },
            { saat: "11:00", danisan: "Ceren Ay" },
            { saat: "13:00", danisan: "Nisa Köksal" },
            { saat: "14:00", danisan: "Oğuz Şahin" }
        ],
        "2025-12-03": [
            { saat: "09:00", danisan: "Deniz Kuş" },
            { saat: "10:00", danisan: "Elif Güngör" },
            { saat: "11:00", danisan: "Hakan Yıldırım" },
            { saat: "12:00", danisan: "İpek Soydan" },
            { saat: "13:00", danisan: "Mert Kılıç" },
            { saat: "14:00", danisan: "Zeynep Akar" }
        ],
        "2025-11-30": [
            { saat: "09:00", danisan: "Cem Yılmaz" },
            { saat: "10:00", danisan: "Gülşah Demir" },
            { saat: "11:00", danisan: "Barış Solmaz" },
            { saat: "13:00", danisan: "Sena Kaplan" },
            { saat: "14:00", danisan: "Ozan Yıldız" },
            { saat: "15:00", danisan: "Dilek Sarı" }
        ],
        "2025-11-29": [
            { saat: "09:00", danisan: "Melis Güneş" },
            { saat: "10:00", danisan: "Burak Aksoy" },
            { saat: "11:00", danisan: "Aslı Perin" },
            { saat: "12:00", danisan: "Veli Öz" },
            { saat: "13:00", danisan: "Hande Tuncer" }
        ],
        "2025-11-28": [
            { saat: "09:00", danisan: "Cansu Er" },
            { saat: "10:00", danisan: "Eren Yılmaz" },
            { saat: "11:00", danisan: "Nazlı Ar" },
            { saat: "14:00", danisan: "Koray İnan" },
            { saat: "15:00", danisan: "Pelin Su" },
            { saat: "16:00", danisan: "Murat Can" }
        ],
        "2025-11-27": [
            { saat: "09:00", danisan: "Nihan Bolat" },
            { saat: "10:00", danisan: "Serkan Acar" },
            { saat: "11:00", danisan: "Gizem Kılıç" },
            { saat: "12:00", danisan: "Bora Eren" },
            { saat: "13:00", danisan: "Sevil Ak" },
            { saat: "14:00", danisan: "Hüseyin Aslan" }
        ],
        "2025-11-26": [
            { saat: "09:00", danisan: "Ece Öztürk" },
            { saat: "10:00", danisan: "Fırat Yalçın" },
            { saat: "11:00", danisan: "Seda Polat" },
            { saat: "13:00", danisan: "Orhan Kurt" },
            { saat: "14:00", danisan: "Mina Sel" }
        ],
        "2025-11-25": [
            { saat: "09:00", danisan: "Tolga K." },
            { saat: "10:00", danisan: "Zehra N." },
            { saat: "11:00", danisan: "Rıza B." },
            { saat: "12:00", danisan: "Leyla M." },
            { saat: "13:00", danisan: "Cemre D." },
            { saat: "14:00", danisan: "Alperen Y." },
            { saat: "15:00", danisan: "Sema T." }
        ],
        "2025-11-24": [
            { saat: "09:00", danisan: "Deniz A." },
            { saat: "10:00", danisan: "Mert O." },
            { saat: "11:00", danisan: "İlknur S." },
            { saat: "13:00", danisan: "Seda Y." },
            { saat: "14:00", danisan: "Tarkan K." }
        ],
        "2025-11-23": [
            { saat: "09:00", danisan: "Zeliha P." },
            { saat: "10:00", danisan: "Bartu G." },
            { saat: "11:00", danisan: "Nazan Ö." },
            { saat: "12:00", danisan: "Gamze V." },
            { saat: "13:00", danisan: "Onur S." },
            { saat: "15:00", danisan: "Sibel R." }
        ],
        "2025-11-22": [
            { saat: "09:00", danisan: "Erol T." },
            { saat: "10:00", danisan: "Yasemin L." },
            { saat: "11:00", danisan: "Fuat H." },
            { saat: "13:00", danisan: "Dilan A." },
            { saat: "14:00", danisan: "Korhan B." },
            { saat: "15:00", danisan: "Ayça Ç." }
        ],
        "2025-11-21": [
            { saat: "09:00", danisan: "Suna Ö." },
            { saat: "10:00", danisan: "Kaan D." },
            { saat: "11:00", danisan: "Müge N." },
            { saat: "12:00", danisan: "Doğa K." },
            { saat: "13:00", danisan: "Ege A." }
        ],
        "2025-11-20": [
            { saat: "09:00", danisan: "Pelin Ö." },
            { saat: "10:00", danisan: "Cahit T." },
            { saat: "11:00", danisan: "Nihan G." },
            { saat: "13:00", danisan: "Uğur Y." },
            { saat: "14:00", danisan: "Belinay Z." },
            { saat: "15:00", danisan: "Efe R." }
        ],
        "2025-11-19": [
            { saat: "09:00", danisan: "Sercan K." },
            { saat: "10:00", danisan: "Mina A." },
            { saat: "11:00", danisan: "Aysun B." },
            { saat: "12:00", danisan: "Omer L." },
            { saat: "13:00", danisan: "Nursel M." },
            { saat: "14:00", danisan: "Baran S." }
        ],
        "2025-11-18": [
            { saat: "09:00", danisan: "Ekin P." },
            { saat: "10:00", danisan: "Yunus V." },
            { saat: "11:00", danisan: "Sevgi K." },
            { saat: "13:00", danisan: "Tolga A." },
            { saat: "14:00", danisan: "Simay O." },
            { saat: "15:00", danisan: "Gökçe Y." }
        ],
        "2025-11-17": [
            { saat: "09:00", danisan: "Buse T." },
            { saat: "10:00", danisan: "Kadir H." },
            { saat: "11:00", danisan: "Naz A." },
            { saat: "12:00", danisan: "Ziya K." },
            { saat: "13:00", danisan: "Buket S." }
        ],
        "2025-11-16": [
            { saat: "09:00", danisan: "Rüya E." },
            { saat: "10:00", danisan: "Mert A." },
            { saat: "11:00", danisan: "Şule Y." },
            { saat: "13:00", danisan: "Fikret Ö." },
            { saat: "14:00", danisan: "İlke N." },
            { saat: "15:00", danisan: "Erdem Ç." }
        ],
        "2025-11-15": [
            { saat: "09:00", danisan: "Sude T." },
            { saat: "10:00", danisan: "Arda P." },
            { saat: "11:00", danisan: "Melis K." },
            { saat: "12:00", danisan: "Diren O." },
            { saat: "13:00", danisan: "Sevda U." },
            { saat: "14:00", danisan: "Halil B." },
            { saat: "15:00", danisan: "Yelda G." }
        ]
    };

    // Takvimi güncelleyen fonksiyon
    function takvimiGuncelle() {
        takvimBody.innerHTML = "";

        const formatliTarih = currentDate.toISOString().split("T")[0];
        currentDateSpan.textContent = currentDate.toLocaleDateString("tr-TR");

        const bugununRandevulari = ornekRandevular[formatliTarih] || [];

        // Saatler üzerinden dön, eşleşen randevuyu yaz, yoksa "— (Boş)"
        saatler.forEach(saat => {
            const randevu = bugununRandevulari.find(r => r.saat === saat);
            // Eğer randevu yok ve gün çok doluysa, boş yaz. (çoğu saat dolu olacak)
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><b>${saat}</b></td>
                <td>${randevu ? randevu.danisan : "— (Boş)"}</td>
            `;
            takvimBody.appendChild(tr);
        });
    }

    // Buton olayları
    document.getElementById("prevDay").addEventListener("click", () => {
        currentDate.setDate(currentDate.getDate() - 1);
        takvimiGuncelle();
    });

    document.getElementById("nextDay").addEventListener("click", () => {
        currentDate.setDate(currentDate.getDate() + 1);
        takvimiGuncelle();
    });

    // İlk yükleme
    takvimiGuncelle();
});

function logout() {
    // session temizleme (opsiyonel)
    localStorage.clear();
    sessionStorage.clear();

    // login sayfasına yönlendirme
    window.location.href = 'login.html';
}