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
  const payment = findPaymentById(paymentId);
  if (!payment) return null;

  const lateDays = calculateLateDays(payment.lastPaymentDate, todayDate);

  //  TANPA DEPOSIT → cuma info telat
  if (payment.depositTotal === 0) {
    return {
      noDeposit: true,
      late: lateDays > 0,
      days: lateDays
    };
  }

  //  ADA DEPOSIT
  if (lateDays <= 0) {
    return { late: false };
  }

  const dailyRent = payment.monthlyRent / 30;
  let depositUsed = dailyRent * lateDays;

  //  BATASI agar tidak lebih dari sisa deposit
  if (depositUsed > payment.depositRemaining) {
    depositUsed = payment.depositRemaining;
  }

  payment.depositRemaining -= depositUsed;
  payment.status = "unpaid";

  console.log("Telat " + lateDays + " hari");

  return {
    late: true,
    days: lateDays,
    used: depositUsed,
    remaining: payment.depositRemaining
  };
}



// CHECK EVICTION
export function checkEviction(paymentId, todayDate) {
  const payment = findPaymentById(paymentId);
  if (!payment) return null;

  const lateDays = calculateLateDays(payment.lastPaymentDate, todayDate);

  //  KAMAR TANPA DEPOSIT
  if (payment.depositTotal === 0) {
    if (lateDays > 30) {
      return {
        warning: true,
        type: "noDeposit",
        daysLate: lateDays,
        message: `Tenant telat ${lateDays} hari.\nPertimbangkan untuk dikeluarkan dari kos.`
      };
    }

    return {
      warning: false,
      type: "noDeposit",
      daysLate: lateDays
    };
  }

  //  KAMAR PAKAI DEPOSIT
  if (payment.depositRemaining > 0) {
    return {
      warning: false,
      type: "withDeposit"
    };
  }

  // deposit HABIS → hitung telat sejak habis
  return {
    warning: true,
    type: "withDeposit",
    daysLate: lateDays,
    message: `Deposit sudah habis.\nTenant telat ${lateDays} hari.\nPertimbangkan untuk dikeluarkan dari kos.`
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