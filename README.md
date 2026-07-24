# Portal Koperasi Desa Merah Putih Cipondok

Aplikasi Web Portal Resmi Koperasi Desa Merah Putih Desa Cipondok, Kabupaten Tasikmalaya.

## Cara Deploy ke Vercel

Aplikasi ini menggunakan **Vite + React + Tailwind CSS** dan telah dikonfigurasi lengkap dengan file `vercel.json` sehingga siap di-deploy langsung ke **Vercel**.

### Cara 1: Menggunakan Vercel CLI
1. Pastikan Anda telah menginstal Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Jalankan perintah deploy di folder proyek:
   ```bash
   vercel
   ```
3. Ikuti petunjuk di layar (pilih Framework Preset: **Vite**).

### Cara 2: Menghubungkan lewat Repository GitHub
1. Push / Upload kode proyek ini ke repository GitHub Anda.
2. Buka [Vercel Dashboard](https://vercel.com/dashboard) lalu klik **"Add New"** > **"Project"**.
3. Import repository GitHub aplikasi Koperasi Sukaresik ini.
4. Vercel akan secara otomatis mendeteksi konfigurasi:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **Deploy**. Aplikasi akan langsung aktif dengan URL Vercel kustom Anda!
