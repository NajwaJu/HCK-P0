console.log("Main JS Jalan");


import { initStorage } from "./localStorage.js";
import { initRouter } from "./router.js";

initStorage();   // isi database pertama kali
initRouter();    // jalankan app