import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPh21, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh21Calculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      grossIncome: '',
      ptkpStatus: 'TK/0'
    }
  });
  const [result, setResult] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const watchGrossIncome = watch('grossIncome');
  
  const onSubmit = (data) => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const { monthlyTax, annualTax, calculations } = calculatePPh21(
        parseCurrencyInput(data.grossIncome),
        data.ptkpStatus
      );
      
      setResult({
        'PPh 21 Bulanan': monthlyTax,
        'PPh 21 Tahunan': annualTax
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
        <h1 className="text-2xl font-bold">Kalkulator PPh Pasal 21</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Pasal 21"
        description="PPh Pasal 21 adalah pajak yang dikenakan atas penghasilan berupa gaji, upah, honorarium, tunjangan, dan pembayaran lain yang diterima oleh orang pribadi dalam negeri sehubungan dengan pekerjaan atau jabatan, jasa, dan kegiatan."
        taxRate="Tarif Progresif: 5% untuk penghasilan sampai dengan Rp50 juta, 15% untuk penghasilan di atas Rp50 juta sampai dengan Rp250 juta, 25% untuk penghasilan di atas Rp250 juta sampai dengan Rp500 juta, dan 35% untuk penghasilan di atas Rp500 juta."
        referenceArticle="Pasal 21 Undang-Undang Pajak Penghasilan"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Data</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="grossIncome" className="form-label">Penghasilan Bruto Bulanan (Rp)</label>
              <input
                id="grossIncome"
                type="text"
                className={`form-input ${errors.grossIncome ? 'border-red-500' : ''}`}
                placeholder="Contoh: 10000000"
                {...register('grossIncome', { required: true })}
                onChange={handleCurrencyInput}
              />
              {errors.grossIncome && (
                <p className="text-red-500 text-xs mt-1">Penghasilan bruto wajib diisi</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="ptkpStatus" className="form-label">Status PTKP</label>
              <select
                id="ptkpStatus"
                className="form-select"
                {...register('ptkpStatus', { required: true })}
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
              disabled={isCalculating || !watchGrossIncome}
            >
              {isCalculating ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Menghitung...
                </>
              ) : (
                <>
                  <FiCalculator className="mr-2" /> Hitung PPh 21
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPh Pasal 21"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh21Calculator;