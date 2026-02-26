import { rooms } from "../data/rooms.js";

/*
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

  // VALIDASI NOMOR KAMAR
  if (!room.name || room.name.trim() === "") {
    console.log("Error: Nomor kamar wajib diisi!");
    return null;
  }

  // CEK DUPLIKAT NOMOR KAMAR (bukan ID!)
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].name.toLowerCase() === room.name.toLowerCase()) {
      console.log("Error: Nomor kamar sudah ada!");
      return null;
    }
  }

  // VALIDASI HARGA HARUS ANGKA POSITIF
  if (isNaN(room.price) || room.price <= 0) {
    console.log("Error: Harga harus angka positif!");
    return null;
  }

  rooms.push(room);
  console.log(`Informasi: Room ${room.name} berhasil dibuat`);
  return room;
}

export function getRooms() {
  return rooms;

}

export function getRoom(roomId) {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id === roomId) {
      return rooms[i]; 
    }
  }

  console.log(`Error: Room ID ${roomId} tidak ditemukan!`);
  return null;
}

export function updateRoom(roomId, newData) {
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

export function deleteRoom(roomId) {
  for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === roomId) {
          rooms.splice(i, 1);
          console.log(`Info: Room ID ${roomId} berhasil dihapus`);
          return;
      }
  }
  console.log(`Error: Room ID ${roomId} tidak ditemukan!`);
}

export function setRoomOccupied(roomId) {
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



export function setRoomEmpty(roomId) {
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