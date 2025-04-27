import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiFileText } from 'react-icons/fi';

const IndividualTaxIndex = () => {
  const taxTypes = [
    {
      id: 'pph23',
      name: 'PPh Final PP 23/2018',
      description: 'Pajak Penghasilan Final sebesar 0,5% untuk UMKM dengan peredaran bruto tidak lebih dari Rp4,8 miliar setahun',
      path: '/individual/pph23'
    },
    {
      id: 'pph17',
      name: 'PPh Orang Pribadi (Mekanisme Umum)',
      description: 'Simulasi perhitungan PPh Orang Pribadi berdasarkan tarif Pasal 17 UU PPh',
      path: '/individual/pph17'
    },
    {
      id: 'pph17nppn',
      name: 'PPh Orang Pribadi dengan NPPN',
      description: 'Simulasi perhitungan PPh Orang Pribadi dengan Norma Penghitungan Penghasilan Neto',
      path: '/individual/pph17nppn'
    }
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4">
          <FiArrowLeft className="mr-1" /> Kembali
        </Link>
        <h1 className="text-2xl font-bold">Kalkulator Pajak Orang Pribadi</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Pilih jenis pajak orang pribadi yang ingin Anda hitung. Setiap kalkulator akan memandu Anda melalui
        proses input data dan menghitung pajak sesuai dengan ketentuan yang berlaku.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {taxTypes.map((tax) => (
          <Link key={tax.id} to={tax.path} className="tax-calculator-option group">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-200 flex-shrink-0 mt-1">
                <FiFileText className="w-6 h-6 text-blue-600" />
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
          dan tidak menggantikan konsultasi dengan ahli pajak. Wajib pajak tetap diharuskan untuk melaporkan dan membayar
          pajak sesuai dengan ketentuan yang berlaku.
        </p>
      </div>
    </div>
  );
};

export default IndividualTaxIndex;