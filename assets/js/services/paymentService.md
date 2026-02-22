# 💰 Payment Service Guide

File: `js/services/paymentService.js`  
Data Source: `js/data/payments.js`

---

## 🎯 Objective

File ini bertanggung jawab mengelola semua hal finansial tenant, meliputi:

Pencatatan pembayaran bulanan

Manajemen deposit

Deteksi keterlambatan pembayaran

Penggunaan deposit saat telat bayar

Pengusiran tenant jika deposit habis (eviction)

Pengembalian deposit saat check-out

Payment service tidak mengubah data room atau tenant langsung, tetapi akan memanggil tenantService saat tenant harus keluar.

---

## 💡 Konsep Sistem Pembayaran
🪙 Deposit = Nyawa Cadangan Tenant

Deposit berfungsi sebagai backup pembayaran jika tenant telat bayar.

Aturan utama:

Saat check-in → tenant membayar deposit (opsional)

Jika tenant telat bayar → deposit dipakai otomatis

Jika deposit habis → tenant harus keluar dari kos

Jika tenant sudah bayar lagi → deposit kembali penuh

Saat check-out → sisa deposit dikembalikan

Tidak ada sistem denda ❌

Tidak ada penalty ❌

Hanya sistem deposit survival ✅

---

## 📦 Data Structure

Contoh payment:
```js
{
  id: "PAY001",
  tenantId: "TEN001",
  roomId: "RM001",
  monthlyRent: 1000000,
  depositTotal: 1000000,
  depositRemaining: 1000000,
  lastPaymentDate: "2026-02-01",
  status: "paid" 
}
```
### Arti Property

| Field            | Keterangan              |
| ---------------- | ----------------------- |
| monthlyRent      | harga sewa per bulan    |
| depositTotal     | total deposit awal      |
| depositRemaining | sisa deposit saat ini   |
| lastPaymentDate  | terakhir bayar          |
| status           | paid / unpaid / evicted |

---

## 🧮 Rumus Penting (HARUS DIGUNAKAN)

Hitung hari telat bayar
```js
lateDays = today - lastPaymentDate
```
Harga sewa per hari
```js
dailyRent = monthlyRent / 30
```
Deposit yang dipakai saat telat
```js
depositUsed = dailyRent * lateDays
```
---

# ✅ TASK LIST

## 1️⃣ CREATE
```js
createPayment(payment)
```

Harus:
Simpan monthlyRent

Simpan depositTotal

Set depositRemaining = depositTotal

Status awal = "paid"

---

## 2️⃣ READ ALL
```js
getPayments()
```

Return semua pembayaran.

---

## 3️⃣ UPDATE
```js
payMonthlyRent()
```
Digunakan saat tenant bayar uang bulanan.

Tugas:

Update lastPaymentDate → hari ini

Status → "paid"

Deposit kembali penuh:
```js
depositRemaining = depositTotal
```

📌 Artinya tenant sudah “hidup kembali”.

---

## 4️⃣ CALCULATE LATE DAYS
function:
```js
calculateLateDays()
```
Menghitung berapa hari tenant telat bayar.

Return:
```js
jumlahHariTelat
```

---

## 5️⃣ DEPOSIT
function:
```js
useDepositlfLate()
```
Function TERPENTING 🔥

Dipanggil tiap kali owner membuka dashboard.

Langkah:

Hitung hari telat

Jika telat > 0 → ambil deposit

Kurangi depositRemaining
```js
depositRemaining -= (monthlyRent/30) * lateDays
```
---
## 6️⃣ Kick Tenant
function:

```js
checkEviction()
```

Menentukan apakah tenant harus keluar.

Jika:
```js
depositRemaining <= 0
```
Maka:

status = "evicted"

panggil tenantService.checkOutTenant()

🚨 Ini otomatis mengosongkan kamar.

---
## 7️⃣ Refund Deposit
function:
```js
refundDeposit()
```
Dipanggil saat tenant check-out normal.

Return:
```js
jumlah depositRemaining
```
Setelah itu deposit = 0.

---
## 🔄 Alur Kerja Sistem

### 🏠 Saat Tenant Check-In

```js
tenantService.checkInTenant()
→ paymentService.createPayment()
```
### 📅 Saat Tenant Belum Bayar Bulanan

Owner buka dashboard → jalankan:
```js
useDepositIfLate()
checkEviction()
```
### 💰 Saat Tenant Bayar Lagi

```js
payMonthlyRent()
→ deposit kembali penuh
```

### 🚪 Saat Tenant Check-Out

```js
refundDeposit()
tenantService.checkOutTenant()
```
---
