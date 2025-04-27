import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCalculator } from 'react-icons/fi';
import TaxInfoCard from '@/modules/core/components/ui/TaxInfoCard';
import ResultCard from '@/modules/core/components/ui/ResultCard';
import { calculatePPhWithNPPN, formatCurrencyInput, parseCurrencyInput } from '@/modules/core/utils/taxCalculations';

const PPh17NPPNCalculator = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      grossIncome: '',
      businessCode: 'service',
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
      const { taxAmount, calculations } = calculatePPhWithNPPN(
        parseCurrencyInput(data.grossIncome),
        data.businessCode,
        data.ptkpStatus
      );
      
      setResult({
        'PPh Pasal 17 dengan NPPN': taxAmount
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
        <h1 className="text-2xl font-bold">Kalkulator PPh Orang Pribadi dengan NPPN</h1>
      </div>
      
      <TaxInfoCard 
        title="Informasi PPh Orang Pribadi dengan NPPN"
        description="PPh Orang Pribadi dengan NPPN (Norma Penghitungan Penghasilan Neto) adalah pajak penghasilan yang dihitung dengan menggunakan norma untuk menentukan penghasilan neto berdasarkan jenis usaha. NPPN digunakan oleh wajib pajak yang tidak menyelenggarakan pembukuan."
        taxRate="Norma untuk menghitung penghasilan neto bervariasi dari 10% hingga 50% dari penghasilan bruto, tergantung pada jenis usaha. Tarif PPh yang digunakan adalah tarif progresif sesuai Pasal 17 UU PPh."
        referenceArticle="Pasal 14 dan Pasal 17 Undang-Undang Pajak Penghasilan"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Input Data</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="grossIncome" className="form-label">Penghasilan Bruto Tahunan (Rp)</label>
              <input
                id="grossIncome"
                type="text"
                className={`form-input ${errors.grossIncome ? 'border-red-500' : ''}`}
                placeholder="Contoh: 100000000"
                {...register('grossIncome', { required: true })}
                onChange={handleCurrencyInput}
              />
              {errors.grossIncome && (
                <p className="text-red-500 text-xs mt-1">Penghasilan bruto wajib diisi</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="businessCode" className="form-label">Jenis Usaha (Kode Norma)</label>
              <select
                id="businessCode"
                className="form-select"
                {...register('businessCode')}
              >
                <option value="retail">Perdagangan Eceran (20%)</option>
                <option value="manufacturing">Industri Pengolahan (12.5%)</option>
                <option value="service">Jasa Umum (30%)</option>
                <option value="professional">Jasa Profesional (50%)</option>
                <option value="agriculture">Pertanian (15%)</option>
                <option value="other">Lainnya (22.5%)</option>
              </select>
              <p className="text-gray-500 text-xs mt-1">
                Persentase menunjukkan besaran norma untuk menghitung penghasilan neto
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
              disabled={isCalculating || !watchGrossIncome}
            >
              {isCalculating ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Menghitung...
                </>
              ) : (
                <>
                  <FiCalculator className="mr-2" /> Hitung PPh dengan NPPN
                </>
              )}
            </button>
          </form>
        </div>
        
        {result && (
          <ResultCard 
            title="Hasil Perhitungan PPh Orang Pribadi dengan NPPN"
            results={result}
            calculations={calculations}
          />
        )}
      </div>
    </div>
  );
};

export default PPh17NPPNCalculator;