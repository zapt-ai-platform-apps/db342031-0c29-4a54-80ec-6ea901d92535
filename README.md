# Pajak ku assisten pajakku

Aplikasi alat penghitung pajak otomatis untuk perusahaan (badan) dan orang pribadi di Indonesia.

## Fitur

- Kalkulator Pajak Perusahaan (Wajib Pajak Badan)
  - PPh Pasal 21 (PPh 21)
  - PPh Pasal 22 (PPh 22)
  - PPh Pasal 23 (PPh 23)
  - Pajak Pertambahan Nilai (PPN)
  - PPh Final Pasal 4 Ayat (2) untuk UMKM/CV
  - PPh Pasal 26 (PPh 26)
  - PPh Pasal 15 (PPh 15)

- Kalkulator Pajak Orang Pribadi (Wajib Pajak OP)
  - PPh Final PP 23/2018
  - Simulasi Perhitungan PPh OP Mekanisme Umum
  - Simulasi Perhitungan PPh OP dengan NPPN

## Pengembangan Lokal

1. Clone repositori ini
2. Install dependensi dengan `npm install`
3. Jalankan server pengembangan dengan `npm run dev`

## Build untuk Produksi

Untuk mem-build aplikasi untuk produksi:

```bash
npm run build
```

## Teknologi yang Digunakan

- React
- Tailwind CSS
- React Router
- React Hook Form
- Zustand
- Sentry untuk error tracking