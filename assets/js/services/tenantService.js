import { tenants } from "../data/tenants.js";
import { setRoomOccupied, setRoomEmpty, getRoom } from "./roomService.js";
import { createPayment, deletePaymentByTenantId } from "./paymentService.js";

/*
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

  const room = getRoom(tenant.roomId);
  if (!room) {
    console.log("Error: Room tidak ditemukan!");
    return null;
  }
  tenant.id = "TEN-" + Date.now();
  tenant.status = "active";
  tenant.remainingDeposit = tenant.deposit;


  tenants.push(tenant);
  setRoomOccupied(tenant.roomId);

  createPayment({
    id: "PAY-" + Date.now(),
    tenantId: tenant.id
  });

  console.log(`Info: Tenant ${tenant.name} berhasil check-in + payment dibuat`);
  return tenant;


}

export function getTenants() {
  return tenants;
}

export function getTenantById(tenantId) {
  for (let i = 0; i < tenants.length; i++) {
    if (tenants[i].id === tenantId) {
      return tenants[i];
    }
  }
  return null;
}


export function updateTenant(tenantId, newData) {
  for (let i = 0; i < tenants.length; i++){
    if (tenants[i].id === tenantId){
      for (let key in newData){
        if (key !== "id") tenants[i][key] = newData[key];
      }
      console.log(`info: Tenant ID ${tenantId} berhasil diupdate`);
      return tenants[i];
    }
  }
  console.log(`update gagal: Tenant ID ${tenantId} tidak ditemukan`);
  return null;
}


export function deleteTenant(tenantId) {
  for (let i = 0; i < tenants.length; i++){
    if (tenants[i].id === tenantId){
      setRoomEmpty(tenants[i].roomId);
      deletePaymentByTenantId(tenantId);
      tenants.splice(i, 1);
      console.log("Tenant berhasil dihapus + payment dibersihkan");
      return;
    } 
  }
  console.log("Tenant tidak ditemukan");
}

export function checkOutTenant(tenantId) {
  for (let i = 0; i < tenants.length; i++){
    if (tenants[i].id === tenantId){
      tenants[i].status = "evicted";
      setRoomEmpty(tenants[i].roomId);
      console.log(`info: Tenant ID ${tenantId} berhasil check-out (evicted)`);
      return  tenants[i];
    }
  }
  console.log(`check-out gagal: Tenant ID ${tenantId} tidak ditemukan`);
  return null;
}