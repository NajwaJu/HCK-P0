//Data kamar 
let kamar = [
    {
        nomorKamar : "A001",
        tipe : "Non AC", 
        harga : 1000000,
        status : "kosong"
    },
    {
        nomorKamar : "B001",
        tipe : "AC", 
        harga : 1500000,
        status : "kosong"
    },
    {
        nomorKamar : "C001",
        tipe : "AC dan Kamar Mandi Dalam", 
        harga : 2000000,
        status : "kosong"
    }
]

function tambahKamar(nomorKamar, tipe, harga)
{
     // VALIDASI: Harga harus number dan positif
    if (typeof harga !== 'number' || harga <= 0) {
        console.log("Error: Harga harus angka positif!");
        return null;
    }

    for (let i = 0; i < kamar.length; i++){
        //cek spesifik kamar apakah sudah ada apa belum sebelum dibuat kamar baru
        if (kamar[i].nomorKamar === nomorKamar){
            console.log(`Error: Kamar No ${nomorKamar} Sudah Ada!`);
            return null;
        }
    }

    //kalau tidak ada kamar buat kamar baru
    let newRoom = {
        nomorKamar: nomorKamar,
        tipe: tipe,
        harga: harga,
        status: "kosong"
    }; 
    kamar.push(newRoom);    
    
    console.log(`Informasi: Kamar No ${nomorKamar} Dibuat`);
    return newRoom;
}

function lihatSemuaKamar() 
{
    return kamar;
}

function lihatKamar(nomorKamar)
{
    for (let i = 0; i < kamar.length; i++) 
    {
        if (kamar[i].nomorKamar === nomorKamar) 
        {
            console.log(`Info: Kamar No ${nomorKamar} Berhasil Ditemukan`);
            return kamar[i];
        }
    }

    console.log(`Error: Kamar No ${nomorKamar} Tidak Ditemukan!`);
    return null;
}

function updateKamar(nomorKamar, tipeBaru, hargaBaru)
{
    for (let i = 0; i < kamar.length; i++)
    {
        if (kamar[i].nomorKamar === nomorKamar)
        {
            kamar[i].tipe = tipeBaru;
            kamar[i].harga = hargaBaru;
            console.log(`Info: Kamar No ${nomorKamar} Berhasil Diupdate`);
            return kamar[i];
        }
    }

    console.log(`Error: Kamar No ${nomorKamar} Tidak Ditemukan!`);
    return null;
}

function deleteKamar(nomorKamar)
{
    for (let i = 0; i < kamar.length; i++)
    {
        if (kamar[i].nomorKamar === nomorKamar)
        {
            kamar.splice(i, 1);
            console.log(`Info: Kamar No ${nomorKamar} Dihapus`);
            return;
        }
    }

    console.log(`Error: Kamar No ${nomorKamar} Tidak Ditemukan!`);
}

// ====================
// Contoh penggunaan
// ====================

// console.log(lihatSemuaKamar());
// console.log(tambahKamar("A002", " Non AC", 1500000));

// console.log(lihatKamar("A002"));
// updateKamar("A002", "Non AC", 1000000);
// console.log(lihatKamar("A002"));

deleteKamar("A002");
console.log(lihatSemuaKamar());