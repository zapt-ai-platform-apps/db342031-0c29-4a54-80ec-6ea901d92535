import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-white">Pajak ku assisten pajakku</h3>
            <p className="text-gray-400 text-sm mt-1">
              Alat penghitung pajak otomatis untuk Indonesia
            </p>
          </div>
          
          <div className="text-sm text-gray-400">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <p>© {currentYear} Pajak ku assisten pajakku</p>
              <p>
                <span className="hidden md:inline">|</span> Dibuat dengan <span className="text-red-500">♥</span> di Indonesia
              </p>
            </div>
            <p className="mt-2 text-xs text-center md:text-right">
              Peringatan: Hasil perhitungan bersifat perkiraan. Konsultasi dengan ahli pajak untuk hasil yang lebih akurat.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;