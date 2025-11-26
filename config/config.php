<?php
// .env dosyasını oku
$env = parse_ini_file(__DIR__ . '/../.env');

// ENV değerlerini değişkenlere al
$host = $env['DB_HOST'];
$db   = $env['DB_NAME'];
$user = $env['DB_USER'];
$pass = $env['DB_PASS'];
$port = $env['DB_PORT'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;port=$port;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Veritabanına bağlanılamadı: " . $e->getMessage());
}
