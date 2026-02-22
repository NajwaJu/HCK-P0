# 🛏️ Room Service Guide

File: `js/services/roomService.js`  
Data Source: `js/data/rooms.js`

---

## 🎯 Objective

Membuat semua fungsi CRUD untuk **Bantu Ibu Kos**.

File ini hanya berisi LOGIC.
Tidak boleh ada DOM manipulation di sini.

---

## 📦 Data Structure

Contoh struktur room:
```js
{
id: number,
number: string,
type: string,
price: number,
status: "empty" | "occupied"
}
```

Data berasal dari:

```js
import { rooms } from "../data/rooms.js";
```

---

# ✅ TASK LIST

## 1️⃣ CREATE

Buat function:
```js
addRoom(room)
```


Function harus:
- Menerima object room
- Menambahkan ke array rooms
- Memberikan id unik (boleh pakai Date.now())

---

## 2️⃣ READ ALL

Buat function:

```js
getRooms()
```


Harus:
- Mengembalikan semua data rooms

---

## 3️⃣ READ BY ID

Buat function:
```js
getRoomById(id)
```

Harus:
- Mengembalikan room berdasarkan id

---

## 4️⃣ UPDATE

Buat function:
```js
updateRoom(id, updatedData)
```

Harus:
- Mencari room berdasarkan id
- Mengubah datanya

---

## 5️⃣ DELETE

Buat function:
```js
deleteRoom(id)
```

Harus:
- Menghapus room berdasarkan id

---

# 📌 Rules

- Jangan akses DOM di file ini
- Jangan ubah file data langsung dari page
- Semua page harus lewat service

---

# 🎯 Output Target

Semua function harus bisa dipanggil dari:
```js
import { getRooms } from "../services/roomService.js"
```



