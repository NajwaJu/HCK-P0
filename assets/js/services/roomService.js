import { rooms } from "../data/rooms.js";

/*
========================================
CREATE ROOM
========================================
room object contoh:
{
  id: "ROOM-001",
  name: "Kamar A1",
  price: 1500000,
  status: "empty"  // empty | occupied
}
*/
export function addRoom(room) {
  rooms.push(room);
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
UPDATE ROOM DATA
========================================
Bisa edit nama kamar / harga sewa
*/
export function updateRoom(roomId, newData) {
  // TODO by team
}

/*
========================================
DELETE ROOM
========================================
*/
export function deleteRoom(roomId) {
  // TODO by team
}

/*
========================================
SET ROOM OCCUPIED
Dipanggil saat tenant check-in
========================================
*/
export function setRoomOccupied(roomId) {
  // TODO by team
}

/*
========================================
SET ROOM EMPTY
Dipanggil saat tenant check-out / evicted
========================================
*/
export function setRoomEmpty(roomId) {
  // TODO by team
}