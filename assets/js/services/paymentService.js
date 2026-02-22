import { payments } from "../data/payments.js";
import { checkOutTenant } from "./tenantService.js";

/*
STRUCTURE PAYMENT OBJECT

{
  id: "PAY001",
  tenantId: "TEN001",
  roomId: "RM001",
  monthlyRent: 1000000,
  depositTotal: 1000000,
  depositRemaining: 1000000,
  lastPaymentDate: "2026-02-01",
  status: "paid" // paid | unpaid | evicted
}
*/


// =============================
// CREATE PAYMENT (CHECK-IN)
// =============================
export function createPayment(paymentData) {
  /*
    TODO TEAM:
    - push paymentData ke array payments
    - pastikan depositRemaining = depositTotal
    - status default = "paid"
  */
  payments.push(paymentData);
}


// =============================
// GET ALL PAYMENTS
// =============================
export function getPayments() {
  return payments;
}


// =============================
// PAY MONTHLY RENT
// =============================
export function payMonthlyRent(paymentId, todayDate) {
  /*
    TODO TEAM:
    1. Cari payment berdasarkan id
    2. Update lastPaymentDate = todayDate
    3. status = "paid"
    4. depositRemaining dikembalikan penuh (depositTotal)
  */
}


// =============================
// CALCULATE LATE DAYS
// =============================
export function calculateLateDays(lastPaymentDate, todayDate) {
  /*
    TODO TEAM:
    Hitung selisih hari dari tanggal terakhir bayar ke hari ini
    return jumlah hari telat
  */
}


// =============================
// USE DEPOSIT IF TENANT LATE
// =============================
export function useDepositIfLate(paymentId, todayDate) {
  /*
    TODO TEAM:
    1. Cari payment
    2. Hitung lateDays pakai calculateLateDays()
    3. Jika lateDays > 0:
        dailyRent = monthlyRent / 30
        depositUsed = dailyRent * lateDays
        depositRemaining -= depositUsed
        status = "unpaid"
  */
}


// =============================
// CHECK EVICTION
// =============================
export function checkEviction(paymentId) {
  /*
    TODO TEAM:
    Jika depositRemaining <= 0:
      - status = "evicted"
      - panggil checkOutTenant(tenantId)
  */
}


// =============================
// REFUND DEPOSIT (CHECK-OUT)
// =============================
export function refundDeposit(paymentId) {
  /*
    TODO TEAM:
    1. Cari payment
    2. Simpan sisa deposit
    3. Set depositRemaining = 0
    4. return sisa deposit
  */
}