const fs = require('fs');
const path = require('path');

// Fungsi untuk mengekstrak tanggal dari isi file HTML
function extractDateFromHtml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Cari pola: "Dipelajari pada: 12 Juni 2026" atau "Diperbarui: 12 Juni 2026"
  const match = content.match(/(?:Dipelajari pada|Diperbarui):\s*(\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const monthName = match[2];
    const year = match[3];
    const monthMap = {
      'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
      'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
      'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
    };
    const month = monthMap[monthName];
    if (month) {
      return `${year}-${month}-${day}T00:00:00.000Z`;
    }
  }
  // Fallback ke mtime file jika tidak ditemukan pola tanggal
  const stat = fs.statSync(filePath);
  return stat.mtime;
}


// 1. Scan folder catatan/
const catatanDir = path.join(__dirname, 'catatan');
let daftarCatatan = [];
if (fs.existsSync(catatanDir)) {
  daftarCatatan = fs.readdirSync(catatanDir)
    .filter(file => file.endsWith('.html'))
    .map(file => {
      const filePath = path.join(catatanDir, file);
      const slug = path.parse(file).name;
      const judul = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const tanggal = extractDateFromHtml(filePath);
      return { slug, judul, tanggal };
    });
}
// Tulis daftar-catatan.json (minified)
fs.writeFileSync(path.join(__dirname, 'daftar-catatan.json'), JSON.stringify(daftarCatatan));

// 2. Scan folder proyek/
const proyekDir = path.join(__dirname, 'proyek');
let daftarProyek = [];
if (fs.existsSync(proyekDir)) {
  daftarProyek = fs.readdirSync(proyekDir)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(proyekDir, file);
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    });
}
fs.writeFileSync(path.join(__dirname, 'daftar-proyek.json'), JSON.stringify(daftarProyek));

console.log("✅ Build data JSON berhasil (tanggal manual dari meta-date)");