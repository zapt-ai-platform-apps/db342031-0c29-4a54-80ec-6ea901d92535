import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPN, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPNCalculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      type: 'domestic'
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
      const { taxAmount, calculations } = calculatePPN(
        parseCurrencyInput(data.amount),
        data.type
      );
      
      setResult({
        'PPN': taxAmount
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
        <h1 className="text-2xl font-bold">Kalkulator PPN</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPN"
        description="PPN (Pajak Pertambahan Nilai) adalah pajak yang dikenakan atas penyerahan Barang Kena Pajak (BKP) atau Jasa Kena Pajak (JKP) di dalam Daerah Pabean yang dilakukan oleh pengusaha."
        taxRate="10% untuk penyerahan dalam negeri dan impor, 0% untuk ekspor BKP berwujud, tidak berwujud, dan JKP."
        referenceArticle="Undang-Undang PPN"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Data</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="amount" className="form-label">Dasar Pengenaan Pajak (Rp)</label>
              <input
                id="amount"
                type="text"
                className={`form-input ${errors.amount ? 'border-red-500' : ''}`}
                placeholder="Contoh: 10000000"
                {...register('amount', { required: true })}
                onChange={handleCurrencyInput}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">Dasar pengenaan pajak wajib diisi</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="type" className="form-label">Jenis Transaksi</label>
              <select
                id="type"
                className="form-select"
                {...register('type')}
              >
                <option value="domestic">Penyerahan Dalam Negeri</option>
                <option value="import">Impor</option>
                <option value="export">Ekspor</option>
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
                  <FiCalculator className="mr-2" /> Hitung PPN
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPN"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPNCalculator;