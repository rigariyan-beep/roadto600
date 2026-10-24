# 🎯 RoadTo600: TOEFL ITP & English Fluency Mastery

> **Mobile-first Progressive Web App (PWA)** dirancang khusus untuk melonjakkan skor TOEFL ITP dari baseline **497 (B1 Intermediate)** menuju **600+ (C1 Advanced)** melalui rutinitas harian terstruktur 45 menit/hari.

---

## 📱 Fitur Utama & Modul Pembelajaran

1. **Official TOEFL ITP Score Calculator & Estimator**
   - Menggunakan tabel konversi baku resmi ETS:
     - *Section 1 (Listening)*: Raw 0–50 &rarr; Scaled 31–68
     - *Section 2 (Structure & Written Expression)*: Raw 0–40 &rarr; Scaled 31–68
     - *Section 3 (Reading Comprehension)*: Raw 0–50 &rarr; Scaled 31–67
     - Rumus Final: `Math.round(((Scaled_L + Scaled_S + Scaled_R) * 10) / 3)`
   - Slider simulasi target skor interaktif (contoh: L: 43 [59], S: 36 [61], R: 44 [60] &rarr; **600**).

2. **Daily 45-Minute Habit Tracker & Streak System**
   - Rutinitas 3 blok harian terbukti:
     - ⏱️ **15 menit**: Structure & Written Expression (60 Grammar Skills)
     - ⏱️ **15 menit**: Academic Reading & 5 AWL (Academic Word List) Vocabulary
     - ⏱️ **15 menit**: Shadowing & Active Academic Listening Fluency
   - Streak counter otomatis tersimpan di `localStorage`.

3. **60-Skills Grammar Drills & Diagnostic Traps**
   - Bank soal Structure & Written Expression tingkat lanjut (Inversion, Reduced Relative Clauses, Subjunctive, Parallelism, Subject-Verb Agreement).
   - Penjelasan komprehensif untuk setiap jebakan distractor TOEFL.

4. **Timed Mini ITP Simulation**
   - Simulasi berwaktu standar TOEFL ITP per section dengan countdown timer realistis dan scoring instan.

5. **Fluency & Shadowing Trainer (Web Speech API)**
   - Latihan pelafalan akademik, intonasi, dan conversational speed dengan transcript interaktif serta speech recognition.

6. **Review Deck (Spaced Repetition & Error Notebook)**
   - Otomatis mencatat setiap soal yang salah ke dalam daftar review terfokus untuk eliminasi kelemahan berulang.

7. **AI Infinite Question Generator (Google Gemini 3.8 Flash)**
   - Integrasi opsional API key pengguna untuk menghasilkan variasi soal baru tanpa batas sesuai target level kesulitan.

---

## 🚀 Cara Install PWA di Smartphone

Aplikasi ini dapat diinstal langsung ke layar utama smartphone seperti aplikasi native:

### 🤖 Android (Google Chrome)
1. Buka URL aplikasi di Google Chrome.
2. Ketuk ikon **titik tiga (⋮)** di pojok kanan atas.
3. Pilih **"Install app"** atau **"Tambahkan ke Layar Utama" (Add to Home screen)**.
4. Ikon **RoadTo600** akan muncul di layar ponsel dan siap digunakan secara offline.

### 🍎 iOS / iPhone (Safari)
1. Buka URL aplikasi di browser **Safari**.
2. Ketuk tombol **Share** (kotak dengan panah ke atas) di bagian bawah layar.
3. Gulir ke bawah lalu pilih **"Add to Home Screen" (Tambahkan ke Layar Utama)**.
4. Ketuk **Add** di pojok kanan atas.

---

## 🛠️ Menjalankan Secara Lokal

Jika ingin menguji aplikasi di komputer lokal:

```bash
# Menggunakan Node.js / npx serve
npx serve . -l 3000

# Atau menggunakan Python
python -m http.server 3000
```
Buka browser dan akses `http://localhost:3000`.

---

## 🌐 Deploy Otomatis ke GitHub Pages

Repositori ini telah dilengkapi workflow GitHub Actions di `.github/workflows/deploy.yml`:
1. Buat repository baru di [GitHub](https://github.com/new) bernama `roadto600`.
2. Hubungkan remote repository dan push branch `main`:
   ```bash
   git remote add origin https://github.com/rigariyan-beep/roadto600.git
   git push -u origin main
   ```
3. Di tab **Settings &rarr; Pages** pada repositori GitHub Anda:
   - Di bagian **Build and deployment &rarr; Source**, pilih **GitHub Actions**.
4. Aplikasi akan otomatis live di:
   `https://rigariyan-beep.github.io/roadto600/`

---

## 📄 Lisensi
MIT License &copy; 2026 rigariyan-beep
