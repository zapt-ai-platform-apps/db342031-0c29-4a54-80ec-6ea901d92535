import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const ResultCard = ({ title, results, calculations = [] }) => {
  return (
    <div className="card border-2 border-indigo-200 bg-indigo-50">
      <h3 className="text-xl font-bold text-indigo-900 mb-4">{title}</h3>
      
      {calculations.length > 0 && (
        <div className="mb-4 pb-4 border-b border-indigo-200">
          <h4 className="font-semibold mb-2 text-indigo-800">Perhitungan:</h4>
          <ul className="space-y-1 text-indigo-900">
            {calculations.map((calc, index) => (
              <li key={index} className="flex justify-between">
                <span>{calc.label}</span>
                <span className="font-medium">{formatCurrency(calc.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="space-y-2">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-2">
            <span className="font-semibold text-indigo-900">{key}</span>
            <span className="text-xl font-bold text-indigo-700">{formatCurrency(value)}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-start p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <FiAlertTriangle className="text-amber-500 mr-2 flex-shrink-0 mt-1" size={20} />
        <p className="text-sm text-amber-700">
          <span className="font-semibold">Peringatan:</span> Hasil perhitungan ini hanya perkiraan.
          Konsultasikan dengan ahli pajak untuk perhitungan yang lebih akurat sesuai dengan situasi spesifik Anda.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;