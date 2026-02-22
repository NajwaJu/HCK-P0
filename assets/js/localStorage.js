import { rooms as seedRooms } from "./data/rooms.js";
import { tenants as seedTenants } from "./data/tenants.js";
import { payments as seedPayments } from "./data/payments.js";

export function initStorage() {
  if (!localStorage.getItem("rooms")) {
    localStorage.setItem("rooms", JSON.stringify(seedRooms));
  }

  if (!localStorage.getItem("tenants")) {
    localStorage.setItem("tenants", JSON.stringify(seedTenants));
  }

  if (!localStorage.getItem("payments")) {
    localStorage.setItem("payments", JSON.stringify(seedPayments));
  }
}