import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiUser, FiBriefcase } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di assisten pajakku</h1>
        <p className="text-xl text-gray-600">
          Alat penghitung pajak otomatis untuk perusahaan dan orang pribadi di Indonesia
        </p>
      </div>
      
      <div className="card bg-gradient-to-br from-indigo-50 to-blue-50 mb-8">
        <div className="flex items-center">
          <div className="mr-6 text-indigo-600">
            <FiFileText size={36} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Perhitungan Pajak Otomatis</h2>
            <p className="text-gray-600">
              Aplikasi ini membantu Anda menghitung berbagai jenis pajak di Indonesia berdasarkan
              aturan pajak yang berlaku. Pilih jenis pajak yang ingin Anda hitung berdasarkan kategori di bawah.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link to="/company" className="tax-calculator-option group">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors duration-200">
              <FiBriefcase className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Pajak Perusahaan</h3>
              <p className="text-gray-600">
                Hitung PPh 21, PPh 22, PPh 23, PPN, dan jenis pajak perusahaan lainnya
              </p>
            </div>
          </div>
        </Link>
        
        <Link to="/individual" className="tax-calculator-option group">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-200">
              <FiUser className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Pajak Orang Pribadi</h3>
              <p className="text-gray-600">
                Hitung PPh Final, simulasi PPh Orang Pribadi dengan mekanisme umum dan NPPN
              </p>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="card border border-amber-200 bg-amber-50">
        <h3 className="text-lg font-semibold mb-3 text-amber-800">Peringatan Penting</h3>
        <p className="text-amber-700">
          Hasil perhitungan bersifat perkiraan dan didasarkan pada informasi yang tersedia. 
          Pengguna disarankan untuk berkonsultasi dengan ahli pajak untuk perhitungan yang 
          lebih akurat sesuai dengan situasi spesifik masing-masing.
        </p>
      </div>
    </div>
  );
};

export default HomePage;