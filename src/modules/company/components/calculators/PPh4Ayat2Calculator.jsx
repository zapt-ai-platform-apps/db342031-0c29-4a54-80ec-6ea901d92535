import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator, FiInfo } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPh4Ayat2UMKM, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh4Ayat2Calculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      grossRevenue: ''
    }
  });
  const [result, setResult] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const watchGrossRevenue = watch('grossRevenue');
  
  const onSubmit = (data) => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const { taxAmount, calculations } = calculatePPh4Ayat2UMKM(
        parseCurrencyInput(data.grossRevenue)
      );
      
      setResult({
        'PPh Final Pasal 4 Ayat (2)': taxAmount
      });
      
      setCalculations(calculations);
      setIsCalculating(false);
    }, 500);
  };

  // Handle currency input formatting
  const handleCurrencyInput = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatCurrencyInput(value);
    setValue(name, formattedValue);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/company" className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4">
          <FiArrowLeft className="mr-1" /> Kembali
        </Link>
        <h1 className="text-2xl font-bold">Kalkulator PPh Final Pasal 4 Ayat (2) untuk UMKM/CV</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Final Pasal 4 Ayat (2) untuk UMKM/CV"
        description="PPh Final Pasal 4 Ayat (2) untuk UMKM/CV adalah pajak penghasilan yang bersifat final yang dikenakan atas penghasilan usaha yang diterima atau diperoleh wajib pajak dengan peredaran bruto tertentu."
        taxRate="0,5% dari peredaran bruto (omzet) untuk perusahaan dengan omzet di bawah Rp4,8 miliar per tahun sesuai PP 55/2022, terutama untuk CV selama 4 tahun."
        referenceArticle="Pasal 4 Ayat (2) Undang-Undang Pajak Penghasilan dan PP 55/2022"
      />
      
      <div className="card border border-amber-200 bg-amber-50 mb-6">
        <div className="flex items-start">
          <FiInfo className="text-amber-600 mr-2 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Perhatian</h3>
            <p className="text-amber-700 text-sm">
              Ada perbedaan informasi tarif dalam materi yang diberikan (1%) dengan tarif terbaru (0,5%) sesuai PP 55/2022.
              Kalkulator ini menggunakan tarif terbaru 0,5% sesuai peraturan yang berlaku saat ini.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Data</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="grossRevenue" className="form-label">Peredaran Bruto (Omzet) per Tahun (Rp)</label>
              <input
                id="grossRevenue"
                type="text"
                className={`form-input ${errors.grossRevenue ? 'border-red-500' : ''}`}
                placeholder="Contoh: 1000000000"
                {...register('grossRevenue', { required: true })}
                onChange={handleCurrencyInput}
              />
              {errors.grossRevenue && (
                <p className="text-red-500 text-xs mt-1">Peredaran bruto wajib diisi</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Hanya untuk usaha dengan omzet di bawah Rp4,8 miliar per tahun
              </p>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center cursor-pointer"
              disabled={isCalculating || !watchGrossRevenue}
            >
              {isCalculating ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Menghitung...
                </>
              ) : (
                <>
                  <FiCalculator className="mr-2" /> Hitung PPh Final
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPh Final Pasal 4 Ayat (2)"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh4Ayat2Calculator;