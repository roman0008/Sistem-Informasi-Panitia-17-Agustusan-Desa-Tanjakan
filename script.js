const API_URL = "URL_WEB_APP_APPS_SCRIPT_ANDA";

// ==========================================
// 1. MANAJEMEN LOMBA
// ==========================================

// Ambil Daftar Lomba dari GSheet
async function fetchLomba() {
    try {
        const response = await fetch(`${API_URL}?action=getLomba`);
        const data = await response.json();
        console.log("Daftar Lomba:", data);
        
        // Panggil fungsi render tabel/card lomba di UI
        // renderLombaList(data);
    } catch (error) {
        console.error("Gagal mengambil data lomba:", error);
    }
}

// Input Lomba Baru (Menu Admin)
async function addLomba(namaLomba, kategori, lokasi, pic) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "addLomba",
                namaLomba: namaLomba,
                kategori: kategori, // e.g., "Anak-Anak", "Ibu-Ibu", "Umum"
                lokasi: lokasi,
                pic: pic
            })
        });
        const result = await response.json();
        if (result.status === "success") {
            alert("Lomba Baru Berhasil Ditambahkan!");
            fetchLomba(); // Refresh UI
        }
    } catch (error) {
        console.error("Gagal menambah lomba:", error);
    }
}

// ==========================================
// 2. MANAJEMEN PESERTA
// ==========================================

// Ambil Daftar Peserta dari GSheet
async function fetchPeserta() {
    try {
        const response = await fetch(`${API_URL}?action=getPeserta`);
        const data = await response.json();
        console.log("Daftar Peserta:", data);
        
        // Panggil fungsi render tabel peserta di UI
        // renderPesertaTable(data);
    } catch (error) {
        console.error("Gagal mengambil data peserta:", error);
    }
}

// Tambah Peserta Lomba Baru
async function addPeserta(namaPeserta, rtRw, lombaId) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "addPeserta",
                namaPeserta: namaPeserta,
                rtRw: rtRw,
                lombaId: lombaId, // Nama Lomba yang Diikuti
                status: "Terdaftar"
            })
        });
        const result = await response.json();
        if (result.status === "success") {
            alert("Peserta Berhasil Didaftarkan!");
            fetchPeserta(); // Refresh UI
        }
    } catch (error) {
        console.error("Gagal mendaftarkan peserta:", error);
    }
}

// Inisialisasi saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", () => {
    fetchLomba();
    fetchPeserta();
});
