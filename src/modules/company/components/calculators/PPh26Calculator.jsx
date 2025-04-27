import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPh26, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh26Calculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      type: 'dividend'
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
      const { taxAmount, calculations } = calculatePPh26(
        parseCurrencyInput(data.amount),
        data.type
      );
      
      setResult({
        'PPh Pasal 26': taxAmount
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
        <h1 className="text-2xl font-bold">Kalkulator PPh Pasal 26</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Pasal 26"
        description="PPh Pasal 26 adalah pajak yang dikenakan atas penghasilan yang diterima atau diperoleh Wajib Pajak luar negeri dari Indonesia. Wajib Pajak luar negeri adalah orang pribadi atau badan yang tidak bertempat tinggal atau tidak berkedudukan di Indonesia yang menerima atau memperoleh penghasilan dari Indonesia."
        taxRate="Tarif umum adalah 20% dari jumlah bruto, namun dapat berbeda tergantung pada perjanjian penghindaran pajak berganda (P3B) dengan negara terkait."
        referenceArticle="Pasal 26 Undang-Undang Pajak Penghasilan"
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
                placeholder="Contoh: 100000000"
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
                <option value="dividend">Dividen</option>
                <option value="interest">Bunga</option>
                <option value="royalty">Royalti</option>
                <option value="service">Jasa</option>
                <option value="salary">Gaji</option>
                <option value="prize">Hadiah dan Penghargaan</option>
                <option value="other">Lainnya</option>
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
                  <FiCalculator className="mr-2" /> Hitung PPh 26
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPh Pasal 26"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh26Calculator;