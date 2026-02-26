import { payments } from "../data/payments.js";
import { getTenantById } from "./tenantService.js";

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


function findPaymentById(paymentId) {
  for (let i = 0; i < payments.length; i++) {
    if (payments[i].id === paymentId) {
      return payments[i];
    }
  }
  return null;
}

export function createPayment(paymentData) {

  if (!paymentData || !paymentData.id || !paymentData.tenantId) {
    console.log("Error: id dan tenantId wajib ada");
    return null;
  }

  // cek duplicate id
  for (let i = 0; i < payments.length; i++) {
    if (payments[i].id === paymentData.id) {
      console.log("Error: payment id sudah ada");
      return null;
    }
  }

  // ambil tenant
  let tenant = getTenantById(paymentData.tenantId);
  if (tenant === null) {
    console.log("Error: tenant tidak ditemukan");
    return null;
  }

  // isi roomId otomatis
  paymentData.roomId = tenant.roomId;

  // ambil harga dari tenant
  paymentData.monthlyRent = tenant.rentPrice;
  paymentData.depositTotal = tenant.deposit;
  paymentData.depositRemaining = tenant.deposit;

  // default status
  paymentData.status = "paid";

  if (!paymentData.lastPaymentDate) {
    paymentData.lastPaymentDate = "";
  }

  payments.push(paymentData);

  console.log("Payment berhasil dibuat");
  return paymentData;
}



// GET ALL PAYMENTS

export function getPayments() {
  return payments;
}



// PAY MONTHLY RENT

export function payMonthlyRent(paymentId, todayDate) {
 let payment = findPaymentById(paymentId);

  if (payment === null) {
    console.log("Payment tidak ditemukan");
    return null;
  }

  payment.lastPaymentDate = todayDate;
  payment.status = "paid";
  payment.depositRemaining = payment.depositTotal;

  console.log("Berhasil bayar bulanan");
  return payment;
}



// CALCULATE LATE DAYS

export function calculateLateDays(lastPaymentDate, todayDate) {
    if (!lastPaymentDate || lastPaymentDate === "") {
    return 0;
  }

  let d1 = new Date(lastPaymentDate);
  let d2 = new Date(todayDate);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    console.log("Format tanggal salah (YYYY-MM-DD)");
    return 0;
  }

  let diffMs = d2.getTime() - d1.getTime();
  let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 0;

  return diffDays;
}


// USE DEPOSIT IF TENANT LATE

export function useDepositIfLate(paymentId, todayDate) {

  let payment = findPaymentById(paymentId);

  if (payment === null) {
    console.log("Payment tidak ditemukan");
    return null;
  }

  if (payment.depositTotal === 0) {
    return payment;
  }

  let lateDays = calculateLateDays(payment.lastPaymentDate, todayDate);

  if (lateDays > 0) {

    let dailyRent = payment.monthlyRent / 30;
    let depositUsed = dailyRent * lateDays;

    payment.depositRemaining =
      payment.depositRemaining - depositUsed;

    if (payment.depositRemaining < 0) {
      payment.depositRemaining = 0;
    }

    payment.status = "unpaid";

    console.log("Telat " + lateDays + " hari");
  }

  return payment;
}



// CHECK EVICTION
export function checkEviction(paymentId) {

  let payment = findPaymentById(paymentId);

  if (payment === null) {
    console.log("Payment tidak ditemukan");
    return null;
  }

  const tenant = getTenantById(payment.tenantId);

  if (payment.depositRemaining <= 0) {

    console.log(
      `⚠️ PERINGATAN: Penghuni  ${tenant.name} dengan ID ${payment.tenantId} 
      deposit sudah habis. Pertimbangkan untuk mengeluarkan tenant.`
    );

    return {
      warning: true,
      tenantId: payment.tenantId,
      message: "Deposit sudah habis"
    };
  }

  return {
    warning: false
  };
}




// REFUND DEPOSIT (CHECK-OUT)

export function refundDeposit(paymentId) {

  let payment = findPaymentById(paymentId);

  if (payment === null) {
    console.log("Payment tidak ditemukan");
    return 0;
  }

  let sisa = payment.depositRemaining;

  payment.depositRemaining = 0;

  console.log("Refund deposit: " + sisa);

  return sisa;
}

export function deletePaymentByTenantId(tenantId) {
  for (let i = 0; i < payments.length; i++) {
    if (payments[i].tenantId === tenantId) {
      payments.splice(i, 1);
      console.log("Payment tenant berhasil dihapus");
      return;
    }
  }
}