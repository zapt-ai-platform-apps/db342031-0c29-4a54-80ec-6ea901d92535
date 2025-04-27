import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPh15, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh15Calculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      type: 'shipping'
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
      const { taxAmount, calculations } = calculatePPh15(
        parseCurrencyInput(data.amount),
        data.type
      );
      
      setResult({
        'PPh Pasal 15': taxAmount
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
        <h1 className="text-2xl font-bold">Kalkulator PPh Pasal 15</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Pasal 15"
        description="PPh Pasal 15 adalah pajak penghasilan yang dikenakan dengan Norma Penghitungan Khusus untuk penghasilan tertentu yang diterima oleh Wajib Pajak yang melakukan kegiatan usaha tertentu."
        taxRate="Tarif bervariasi tergantung pada jenis usaha: 1,2% untuk usaha pelayaran internasional, 1% untuk asuransi luar negeri, 6% untuk usaha investasi dalam bentuk bangun-guna-serah (BOT)."
        referenceArticle="Pasal 15 Undang-Undang Pajak Penghasilan"
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
                placeholder="Contoh: 1000000000"
                {...register('amount', { required: true })}
                onChange={handleCurrencyInput}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">Nilai penghasilan wajib diisi</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="type" className="form-label">Jenis Usaha</label>
              <select
                id="type"
                className="form-select"
                {...register('type')}
              >
                <option value="shipping">Pelayaran Internasional</option>
                <option value="insurance">Asuransi Luar Negeri</option>
                <option value="buildoperate">Bangun-Guna-Serah (BOT)</option>
                <option value="other">Jenis Usaha Tertentu Lainnya</option>
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
                  <FiCalculator className="mr-2" /> Hitung PPh 15
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPh Pasal 15"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh15Calculator;