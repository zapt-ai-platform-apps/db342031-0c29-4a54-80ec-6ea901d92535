import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';
import { MdCalculate } from 'react-icons/md';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPh22, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh22Calculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      transactionValue: '',
      isPPNIncluded: false,
      type: 'import'
    }
  });
  const [result, setResult] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const watchTransactionValue = watch('transactionValue');
  
  const onSubmit = (data) => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const { taxAmount, calculations } = calculatePPh22(
        parseCurrencyInput(data.transactionValue),
        data.isPPNIncluded,
        data.type
      );
      
      setResult({
        'PPh Pasal 22': taxAmount
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
        <h1 className="text-2xl font-bold">Kalkulator PPh Pasal 22</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Pasal 22"
        description="PPh Pasal 22 adalah pajak yang dikenakan atas kegiatan impor barang, penjualan barang tertentu, atau transaksi dengan instansi pemerintah. Tarif PPh Pasal 22 bervariasi tergantung pada jenis transaksi."
        taxRate="7,5% untuk impor, 0,25% untuk ekspor, dan 1,5% untuk transaksi lainnya"
        referenceArticle="Pasal 22 Undang-Undang Pajak Penghasilan"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Data</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="transactionValue" className="form-label">Nilai Transaksi (Rp)</label>
              <input
                id="transactionValue"
                type="text"
                className={`form-input ${errors.transactionValue ? 'border-red-500' : ''}`}
                placeholder="Contoh: 100000000"
                {...register('transactionValue', { required: true })}
                onChange={handleCurrencyInput}
              />
              {errors.transactionValue && (
                <p className="text-red-500 text-xs mt-1">Nilai transaksi wajib diisi</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="type" className="form-label">Jenis Transaksi</label>
              <select
                id="type"
                className="form-select"
                {...register('type')}
              >
                <option value="import">Impor</option>
                <option value="export">Ekspor</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
            
            <div className="form-group">
              <div className="flex items-center">
                <input
                  id="isPPNIncluded"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  {...register('isPPNIncluded')}
                />
                <label htmlFor="isPPNIncluded" className="ml-2 block text-sm text-gray-700">
                  Nilai transaksi sudah termasuk PPN
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center cursor-pointer"
              disabled={isCalculating || !watchTransactionValue}
            >
              {isCalculating ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Menghitung...
                </>
              ) : (
                <>
                  <MdCalculate className="mr-2" /> Hitung PPh 22
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPh Pasal 22"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh22Calculator;