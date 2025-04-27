import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPhIndividual, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh17Calculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      annualIncome: '',
      deductions: '',
      ptkpStatus: 'TK/0'
    }
  });
  const [result, setResult] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const watchAnnualIncome = watch('annualIncome');
  
  const onSubmit = (data) => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const { taxAmount, calculations } = calculatePPhIndividual(
        parseCurrencyInput(data.annualIncome),
        parseCurrencyInput(data.deductions),
        data.ptkpStatus
      );
      
      setResult({
        'PPh Pasal 17': taxAmount
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
        <h1 className="text-2xl font-bold">Kalkulator PPh Orang Pribadi (Mekanisme Umum)</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Orang Pribadi"
        description="PPh Orang Pribadi dengan mekanisme umum adalah pajak yang dikenakan atas penghasilan orang pribadi dalam satu tahun pajak setelah dikurangi dengan biaya/pengurang dan PTKP (Penghasilan Tidak Kena Pajak)."
        taxRate="Tarif Progresif: 5% untuk penghasilan sampai dengan Rp50 juta, 15% untuk penghasilan di atas Rp50 juta sampai dengan Rp250 juta, 25% untuk penghasilan di atas Rp250 juta sampai dengan Rp500 juta, dan 35% untuk penghasilan di atas Rp500 juta."
        referenceArticle="Pasal 17 Undang-Undang Pajak Penghasilan"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Data</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="annualIncome" className="form-label">Penghasilan Bruto Tahunan (Rp)</label>
              <input
                id="annualIncome"
                type="text"
                className={`form-input ${errors.annualIncome ? 'border-red-500' : ''}`}
                placeholder="Contoh: 100000000"
                {...register('annualIncome', { required: true })}
                onChange={handleCurrencyInput}
              />
              {errors.annualIncome && (
                <p className="text-red-500 text-xs mt-1">Penghasilan bruto wajib diisi</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="deductions" className="form-label">Biaya/Pengurang (Rp)</label>
              <input
                id="deductions"
                type="text"
                className="form-input"
                placeholder="Contoh: 20000000"
                {...register('deductions')}
                onChange={handleCurrencyInput}
              />
              <p className="text-gray-500 text-xs mt-1">
                Biaya yang dikeluarkan untuk mendapatkan, menagih, dan memelihara penghasilan
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="ptkpStatus" className="form-label">Status PTKP</label>
              <select
                id="ptkpStatus"
                className="form-select"
                {...register('ptkpStatus')}
              >
                <optgroup label="Tidak Kawin">
                  <option value="TK/0">TK/0 - Tidak Kawin, 0 Tanggungan</option>
                  <option value="TK/1">TK/1 - Tidak Kawin, 1 Tanggungan</option>
                  <option value="TK/2">TK/2 - Tidak Kawin, 2 Tanggungan</option>
                  <option value="TK/3">TK/3 - Tidak Kawin, 3 Tanggungan</option>
                </optgroup>
                <optgroup label="Kawin">
                  <option value="K/0">K/0 - Kawin, 0 Tanggungan</option>
                  <option value="K/1">K/1 - Kawin, 1 Tanggungan</option>
                  <option value="K/2">K/2 - Kawin, 2 Tanggungan</option>
                  <option value="K/3">K/3 - Kawin, 3 Tanggungan</option>
                </optgroup>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center cursor-pointer"
              disabled={isCalculating || !watchAnnualIncome}
            >
              {isCalculating ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Menghitung...
                </>
              ) : (
                <>
                  <FiCalculator className="mr-2" /> Hitung PPh Orang Pribadi
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPh Orang Pribadi"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh17Calculator;