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
  console.log(`Info: Tenant ${tenant.name} berhasil ditambahkan`);
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
  for (let i = 0; i , tenants.length; i++){
    if (tenants[i].id === tenantId){
      for (let key in newData){
        if (key !== "id") tenants[id][key] = newData[key];
      }
      console.log(`info: Tenant ID ${tenantId} berhasil diupdate`);
      return tenants[i];
    }
  }
  console.log(`update gagal: Tenant ID ${tenantId} tidak ditemukan`);
  return null;
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
  let found = false;
  const newTenants = [];
  for (let i = 0; i < tenants.length; i++){
    if (tenants[i].id === tenantId){
      setRoomEmpty(tenants[i].roomId);
      tenants.splice(i,1);
      console.log(`info: Tenant ID ${tenantId} berhasil ditemukan`);
      return;
    }
  }
  console.log(`Delete gagal: Tenant ID ${tenantId} tidak ditemukan`);
}

/*
========================================
CHECK-OUT TENANT (Dipanggil PaymentService saat evicted)
========================================
*/
export function checkOutTenant(tenantId) {
  // TODO by team
  for (let i = 0; i < tenants.length; i++){
    if (tenants[i].id === tenantId){
      tenants[i].status = "evicted";
      setRoomEmpty(tenants[i].roomId);
      console.log(`info: Tenant ID ${tenantId} berhasil check-out (evicted)`);
      return  tenants[i];
    }
  }
  console.loh(`check-out gagal: Tenant ID ${tenantId} tidak ditemukan`);
  return null;
}