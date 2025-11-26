<?php
require_once __DIR__ . '/../vendor/autoload.php'; // vendor yolunu düzelttik

$host = '127.0.0.1';
$db   = 'psikolog_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (\PDOException $e) {
    die('Bağlantı hatası: ' . $e->getMessage());
}
