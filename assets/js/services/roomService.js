import { rooms } from "../data/rooms.js";

/*
========================================
CREATE ROOM
========================================
room object contoh:
{
  id: "ROOM-001",
  name: "Kamar A1",
  type: AC
  price: 1500000,
  status: "empty"  // empty | occupied
}
*/
export function addRoom(room) {
  if (!room.type) {
    console.log("Error: Type kamar wajib diisi!");
    return null;
  }
  if (typeof room.price !== 'number' || room.price <= 0) {
        console.log("Error: Price harus angka positif!");
        return null;
    }

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id === room.id) {
            console.log(`Error: Room ID ${room.id} sudah ada!`);
            return null;
        }
    }

  rooms.push(room);
  console.log(`Informasi: Room ID ${room.id} berhasil dibuat`);
  return room;
}

/*
========================================
READ ALL ROOMS
========================================
*/
export function getRooms() {
  return rooms;

}

/*
========================================
READ SINGLE ROOM
========================================
*/
export function getRoom(roomId) {
  for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === roomId) {
          console.log(`Info: Room ID ${roomId} berhasil ditemukan`);
          return rooms[i];
      }
  }
  console.log(`Error: Room ID ${roomId} tidak ditemukan!`);
  return null;
}
/*
/*
========================================
UPDATE ROOM DATA
========================================
Bisa edit nama kamar / harga sewa
*/
export function updateRoom(roomId, newData) {
  // TODO by team
  for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id === roomId) {
            if (newData.name !== undefined) rooms[i].name = newData.name;
            if (newData.price !== undefined) rooms[i].price = newData.price;
            console.log(`Info: Room ID ${roomId} berhasil diupdate`);
            return rooms[i];
        }
    }
    console.log(`Error: Room ID ${roomId} tidak ditemukan!`);
    return null;
}

/*
========================================
DELETE ROOM
========================================
*/
export function deleteRoom(roomId) {
  // TODO by team
  for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === roomId) {
          rooms.splice(i, 1);
          console.log(`Info: Room ID ${roomId} berhasil dihapus`);
          return;
      }
  }
  console.log(`Error: Room ID ${roomId} tidak ditemukan!`);
}


/*
========================================
SET ROOM OCCUPIED
Dipanggil saat tenant check-in
========================================
*/
export function setRoomOccupied(roomId) {
  // TODO by team
  for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id === roomId) {
            rooms[i].status = "occupied";
            console.log(`Info: Room ID ${roomId} sekarang occupied`);
            return rooms[i];
        }
    }
    console.log(`Error: Room ID ${roomId} tidak ditemukan!`);
    return null;;
}


/*
========================================
SET ROOM EMPTY
Dipanggil saat tenant check-out / evicted
========================================
*/
export function setRoomEmpty(roomId) {
  // TODO by team
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id === roomId) {
        rooms[i].status = "empty";
        console.log(`Info: Room ID ${roomId} sekarang empty`);
        return rooms[i];
    }
  }
  console.log(`Error: Room ID ${roomId} tidak ditemukan!`);
  return null;
}

// ========================================
// TESTING 
// ========================================
console.log("===== TESTING LANGSUNG =====");

addRoom({ id: "ROOM-001", name: "Kamar A1", price: 150000, status: "empty" });
addRoom({ id: "ROOM-002", name: "Kamar A2", price: 200000, status: "empty" });

// console.log("Semua Kamar:", getRooms());

// console.log("Cari ROOM-001:", getRoom("ROOM-001"));
// console.log("Cari ROOM-999:", getRoom("ROOM-999"));

// updateRoom("ROOM-001", { name: "Kamar A1 Updated", price: 180000 });
// console.log("Setelah update ROOM-001:", getRoom("ROOM-001"));

// deleteRoom("ROOM-002");
// console.log("Setelah hapus ROOM-002:", getRooms());

// setRoomOccupied("ROOM-001");
// console.log("ROOM-001 status:", getRoom("ROOM-001"));

// setRoomEmpty("ROOM-001");
// console.log("ROOM-001 status:", getRoom("ROOM-001"));