import { tenants } from "../data/tenants.js";
import { setRoomOccupied, setRoomEmpty } from "./roomService.js";

/*
========================================
CREATE TENANT (CHECK-IN)
========================================
tenant object contoh:
{
  id: "TEN-001",
  name: "Budi",
  roomId: "ROOM-001",
  rentPrice: 1500000,
  deposit: 1500000,
  remainingDeposit: 1500000,
  status: "active"  // active | evicted
}
*/
export function addTenant(tenant) {
  tenants.push(tenant);
  setRoomOccupied(tenant.roomId);
}

/*
========================================
READ ALL TENANTS
========================================
*/
export function getTenants() {
  return tenants;
}

/*
========================================
UPDATE TENANT DATA
========================================
*/
export function updateTenant(tenantId, newData) {
  // TODO by team
}

/*
========================================
DELETE TENANT (CHECK-OUT)
========================================
Harus:
1. Hapus tenant
2. Kosongkan kamar
*/
export function deleteTenant(tenantId) {
  // TODO by team
}

/*
========================================
CHECK-OUT TENANT (Dipanggil PaymentService saat evicted)
========================================
*/
export function checkOutTenant(tenantId) {
  // TODO by team
}