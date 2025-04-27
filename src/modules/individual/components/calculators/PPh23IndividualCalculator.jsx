import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPhFinalIndividualSME, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh23IndividualCalculator = () => {
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
      const { taxAmount, calculations } = calculatePPhFinalIndividualSME(
        parseCurrencyInput(data.grossRevenue)
      );
      
      setResult({
        'PPh Final PP 23/2018': taxAmount
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
        <Link to="/individual" className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4">
          <FiArrowLeft className="mr-1" /> Kembali
        </Link>
        <h1 className="text-2xl font-bold">Kalkulator PPh Final PP 23/2018</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Final PP 23/2018"
        description="PPh Final PP 23/2018 adalah pajak penghasilan final yang dikenakan atas penghasilan dari usaha yang diterima atau diperoleh wajib pajak yang memiliki peredaran bruto tertentu."
        taxRate="0,5% dari peredaran bruto untuk wajib pajak dengan peredaran bruto tidak lebih dari Rp4,8 miliar setahun sesuai PP 55/2022."
        referenceArticle="Peraturan Pemerintah Nomor 23 Tahun 2018 sebagaimana telah diubah dengan PP 55/2022"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Data</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="grossRevenue" className="form-label">Peredaran Bruto per Tahun (Rp)</label>
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
            title="Hasil Perhitungan PPh Final PP 23/2018"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh23IndividualCalculator;