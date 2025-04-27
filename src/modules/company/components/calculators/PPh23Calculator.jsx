import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPh23, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh23Calculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      type: 'service'
    }
  });
  const [result, setResult] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const watchAmount = watch('amount');
  
  const onSubmit = (data) => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const { taxAmount, calculations } = calculatePPh23(
        parseCurrencyInput(data.amount),
        data.type
      );
      
      setResult({
        'PPh Pasal 23': taxAmount
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
        <h1 className="text-2xl font-bold">Kalkulator PPh Pasal 23</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Pasal 23"
        description="PPh Pasal 23 adalah pajak yang dikenakan atas penghasilan dari modal, penyerahan jasa, atau hadiah dan penghargaan, selain yang telah dipotong PPh Pasal 21."
        taxRate="15% untuk dividen, royalti, hadiah, dan penghargaan; 2% untuk jasa lainnya (sesuai PMK 141/PMK.03/2015)."
        referenceArticle="Pasal 23 Undang-Undang Pajak Penghasilan"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Data</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="amount" className="form-label">Nilai Penghasilan (Rp)</label>
              <input
                id="amount"
                type="text"
                className={`form-input ${errors.amount ? 'border-red-500' : ''}`}
                placeholder="Contoh: 10000000"
                {...register('amount', { required: true })}
                onChange={handleCurrencyInput}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">Nilai penghasilan wajib diisi</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="type" className="form-label">Jenis Penghasilan</label>
              <select
                id="type"
                className="form-select"
                {...register('type')}
              >
                <optgroup label="Tarif 15%">
                  <option value="royalty">Royalti</option>
                  <option value="dividend">Dividen</option>
                  <option value="prize">Hadiah dan Penghargaan</option>
                </optgroup>
                <optgroup label="Tarif 2%">
                  <option value="service">Jasa Teknik</option>
                  <option value="management">Jasa Manajemen</option>
                  <option value="consulting">Jasa Konsultan</option>
                  <option value="other_service">Jasa Lainnya</option>
                </optgroup>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center cursor-pointer"
              disabled={isCalculating || !watchAmount}
            >
              {isCalculating ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Menghitung...
                </>
              ) : (
                <>
                  <FiCalculator className="mr-2" /> Hitung PPh 23
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPh Pasal 23"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh23Calculator;