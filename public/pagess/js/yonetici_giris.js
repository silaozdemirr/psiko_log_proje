document.getElementById('yoneticiForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Formun otomatik gönderilmesini engeller

    const kullanici = document.getElementById('kullanici_adi').value.trim();
    const sifre = document.getElementById('sifre').value.trim();

    if (kullanici === "admin" && sifre === "1234") {
        window.location.href = "yonetici_ekrani.html";
    } else {
        alert("Kullanıcı adı veya şifre hatalı!");
    }
});