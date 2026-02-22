# 👤 Tenant Service Guide

File: `js/services/tenantService.js`  
Data Source: `js/data/tenants.js`

---

## 🎯 Objective

Mengelola seluruh data penghuni kos.

---

## 📦 Data Structure

Contoh tenant:
```js
{
id: number,
name: string,
phone: string,
roomId: number,
checkInDate: string
}
```

---

# ⚠️ PENTING — RELASI TENANT & ROOM

Tenant menempati kamar.  
Artinya file ini WAJIB berkomunikasi dengan:
```js
roomService.js
```

Import yang dibutuhkan:
```js
import { getRoomById, updateRoom } from "./roomService.js";
```

---

# ✅ TASK LIST

## 1️⃣ CREATE — Tenant Check-In

Function:
```js
addTenant(tenant)
```

Harus melakukan 3 hal:

1. Tambahkan tenant ke array tenants
2. Berikan id unik (Date.now())
3. 🔴 UPDATE STATUS ROOM menjadi `"occupied"`

Alur logika:

1. Cari kamar berdasarkan `tenant.roomId`
2. Jika kamar ditemukan → ubah status jadi `"occupied"`
3. Simpan tenant

📌 Ini mensimulasikan proses **Check-In**

---

## 2️⃣ READ ALL

```js
getTenants()
```

Return semua tenant.

---

## 3️⃣ READ BY ID
```js
getTenantById(id)
```

Return tenant berdasarkan id.

---

## 4️⃣ UPDATE
```js
updateTenant(id, updatedData)
```

Update data tenant (nama, phone, dll).

---

## 5️⃣ DELETE — Tenant Check-Out

```js
deleteTenant(id)
```

Harus melakukan 3 hal:

1. Cari tenant berdasarkan id
2. 🔴 Ubah status kamar tenant menjadi `"empty"`
3. Hapus tenant dari array

Alur logika:

1. Ambil tenant yang akan dihapus
2. Ambil `roomId` dari tenant tersebut
3. Update room status → `"empty"`
4. Baru hapus tenant

📌 Ini mensimulasikan proses **Check-Out**

---

# 🧠 Summary Flow

| Action | Efek ke Room |
|---|---|
| Tenant Check-In | room.status → occupied |
| Tenant Check-Out | room.status → empty |

---

# 📌 Rules

- Jangan akses DOM di file ini
- Semua perubahan kamar harus lewat roomService
- Jangan edit file data secara langsung dari page