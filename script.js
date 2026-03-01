// Mengambil elemen yang dibutuhkan dari HTML
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const galleryImages = document.querySelectorAll('.gallery-item img');

// --- FITUR DOWNLOAD DAN LIGHTBOX ---
const downloadBtn = document.getElementById('download-btn');

// Fungsi: Buka lightbox saat gambar galeri diklik
galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        lightbox.style.visibility = 'visible'; // Tampilkan elemen Lightbox
        lightboxImg.src = this.src;             // Ambil sumber gambar yang sedang diklik

        // Set link download ke file gambar yang diklik
        const imageSrc = this.src;
        const fileName = imageSrc.split('/').pop();
        
        // Gunakan Fetch API untuk download (kompatibel dengan file lokal)
        downloadBtn.onclick = function(e) {
            e.preventDefault();
            fetch(imageSrc)
                .then(response => response.blob())
                .then(blob => {
                    // Buat temporary URL untuk blob
                    const blobUrl = window.URL.createObjectURL(blob);
                    // Buat elemen <a> sementara untuk trigger download
                    const tempLink = document.createElement('a');
                    tempLink.href = blobUrl;
                    tempLink.download = fileName;
                    document.body.classList.add("lightbox-active");
                    tempLink.click();
                    document.body.classList.remove("lightbox-active");
                    window.URL.revokeObjectURL(blobUrl);
                })
                .catch(err => {
                    console.error('Download gagal:', err);
                    alert('Gagal mengunduh foto. Pastikan file ada di folder yang benar.');
                });
            return false;
        };
    });
});

// Fungsi: Tutup lightbox saat tombol "X" diklik
closeBtn.addEventListener('click', function() {
    lightbox.style.visibility = 'hidden';
});

// Fungsi Tambahan: Tutup lightbox kalau user klik area hitam (di luar gambar)
lightbox.addEventListener('click', function(event) {
    if (event.target !== lightboxImg) {
        lightbox.style.visibility = 'hidden';
    }
});

// --- FITUR DARK/LIGHT MODE ---
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

// Cek apakah user sebelumnya sudah pernah memilih mode terang (tersimpan di browser)
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    bodyElement.classList.add('light-mode');
    themeToggleBtn.innerText = '🌙 Mode Gelap';
}

// Fungsi saat tombol diklik
themeToggleBtn.addEventListener('click', () => {
    // Toggle (tambah/hapus) kelas light-mode di body
    bodyElement.classList.toggle('light-mode');
    
    // Ubah teks tombol dan simpan pilihan ke LocalStorage
    if (bodyElement.classList.contains('light-mode')) {
        themeToggleBtn.innerText = '🌙 Mode Gelap';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggleBtn.innerText = '☀️ Mode Terang';
        localStorage.setItem('theme', 'dark');
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.visibility === 'visible') {
        if (e.key === 'Escape') {
            lightbox.style.visibility = 'hidden';
        }
    }
});

// ================= PRELOADER =================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 500); // Delay sedikit biar smooth
});

