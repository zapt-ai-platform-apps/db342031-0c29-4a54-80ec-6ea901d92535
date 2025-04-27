import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi';

const TaxInfoCard = ({ title, description, taxRate, referenceArticle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="card border border-indigo-100 bg-indigo-50 mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <FiInfo className="text-indigo-600 mr-2 flex-shrink-0" size={20} />
          <h3 className="text-lg font-semibold text-indigo-900">{title}</h3>
        </div>
        {isExpanded ? (
          <FiChevronUp className="text-indigo-600" />
        ) : (
          <FiChevronDown className="text-indigo-600" />
        )}
      </div>
      
      {isExpanded && (
        <div className="mt-4 text-indigo-900">
          <p className="mb-3">{description}</p>
          
          {taxRate && (
            <div className="mb-3">
              <h4 className="font-semibold mb-1">Tarif Pajak:</h4>
              <p>{taxRate}</p>
            </div>
          )}
          
          {referenceArticle && (
            <div>
              <h4 className="font-semibold mb-1">Referensi Pasal:</h4>
              <p>{referenceArticle}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaxInfoCard;