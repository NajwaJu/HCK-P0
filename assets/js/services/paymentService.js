import { payments } from "../data/payments.js";
import { getTenantById } from "./tenantService.js";

/*
STRUCTURE PAYMENT OBJECT

{
  id: "PAY001",
  tenantId: "TEN001",
  roomId: "RM001",
  monthlyRent: 1000000,
  lastPaymentDate: "2026-02-01",
  status: "paid" // paid | unpaid 
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

  console.log("Berhasil bayar bulanan");
  return payment;
}

// CALCULATE LATE DAYS

export function calculateLateDays(lastPaymentDate, todayDate) {
  if (!lastPaymentDate || lastPaymentDate === "") return 0;

  let paidDate = new Date(lastPaymentDate);
  let today = new Date(todayDate);

  if (isNaN(paidDate.getTime()) || isNaN(today.getTime())) {
    console.log("Format tanggal salah (YYYY-MM-DD)");
    return 0;
  }

 // jatuh tempo: +1 bulan dari tanggal bayar (selalu tanggal 1 => aman)
  let dueDate = new Date(paidDate);
  dueDate.setMonth(dueDate.getMonth() + 1);

  // kalau hari ini <= jatuh tempo => tidak telat
  if (today.getTime() <= dueDate.getTime()) return 0;

  let diffMs = today.getTime() - dueDate.getTime();
  let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
}

export function checkPaymentStatus(paymentId, todayDate) {
  let payment = findPaymentById(paymentId);

  if (payment === null) {
    return "Payment tidak ditemukan";
  }

  let lateDays = calculateLateDays(payment.lastPaymentDate, todayDate);

  if (lateDays > 0) {
    payment.status = "unpaid";
    return `Telat ${lateDays} hari`;
  } else {
    payment.status = "paid";
    return "Tidak telat";
  }
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