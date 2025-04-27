import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiFileText } from 'react-icons/fi';

const CompanyTaxIndex = () => {
  const taxTypes = [
    {
      id: 'pph21',
      name: 'PPh Pasal 21',
      description: 'Pajak Penghasilan atas penghasilan berupa gaji, upah, honorarium, tunjangan, dan pembayaran lain kepada karyawan',
      path: '/company/pph21'
    },
    {
      id: 'pph22',
      name: 'PPh Pasal 22',
      description: 'Pajak Penghasilan atas kegiatan impor barang, penjualan barang tertentu, atau transaksi dengan instansi pemerintah',
      path: '/company/pph22'
    },
    {
      id: 'pph23',
      name: 'PPh Pasal 23',
      description: 'Pajak Penghasilan atas penghasilan dari modal, penyerahan jasa, atau hadiah dan penghargaan',
      path: '/company/pph23'
    },
    {
      id: 'ppn',
      name: 'PPN',
      description: 'Pajak Pertambahan Nilai atas penyerahan barang kena pajak atau jasa kena pajak',
      path: '/company/ppn'
    },
    {
      id: 'pph4ayat2',
      name: 'PPh Pasal 4 Ayat (2)',
      description: 'PPh Final sebesar 0,5% untuk UMKM/CV dengan omzet di bawah Rp4,8 miliar per tahun',
      path: '/company/pph4ayat2'
    },
    {
      id: 'pph26',
      name: 'PPh Pasal 26',
      description: 'Pajak Penghasilan atas penghasilan dari sumber di Indonesia yang diterima oleh Wajib Pajak luar negeri',
      path: '/company/pph26'
    },
    {
      id: 'pph15',
      name: 'PPh Pasal 15',
      description: 'Pajak Penghasilan atas penghasilan tertentu yang diterima oleh Wajib Pajak tertentu',
      path: '/company/pph15'
    }
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4">
          <FiArrowLeft className="mr-1" /> Kembali
        </Link>
        <h1 className="text-2xl font-bold">Kalkulator Pajak Perusahaan</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Pilih jenis pajak perusahaan yang ingin Anda hitung. Setiap kalkulator akan memandu Anda melalui
        proses input data dan menghitung pajak sesuai dengan ketentuan yang berlaku.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {taxTypes.map((tax) => (
          <Link key={tax.id} to={tax.path} className="tax-calculator-option group">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors duration-200 flex-shrink-0 mt-1">
                <FiFileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{tax.name}</h3>
                <p className="text-gray-600 text-sm">{tax.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="card border border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Catatan Penting</h3>
        <p className="text-gray-600 text-sm">
          Kalkulator ini menggunakan tarif pajak dan ketentuan yang berlaku saat ini. Hasil perhitungan bersifat perkiraan
          dan tidak menggantikan konsultasi dengan ahli pajak. Perusahaan tetap diharuskan untuk melaporkan dan membayar
          pajak sesuai dengan ketentuan yang berlaku.
        </p>
      </div>
    </div>
  );
};

export default CompanyTaxIndex;