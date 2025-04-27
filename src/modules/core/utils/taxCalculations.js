// Format currency value
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Parse currency input (remove non-numeric characters)
export const parseCurrencyInput = (value) => {
  if (!value) return 0;
  return parseInt(value.replace(/\D/g, ''), 10) || 0;
};

// Format currency input for display
export const formatCurrencyInput = (value) => {
  const numericValue = parseCurrencyInput(value);
  if (numericValue === 0) return '';
  return numericValue.toLocaleString('id-ID');
};

// Calculate PPh 21 (simplified example)
export const calculatePPh21 = (grossIncome, ptkpStatus) => {
  // This is a simplified calculation
  // In a real app, this would consider other factors
  const ptkpValues = {
    'TK/0': 54000000, // Tidak Kawin, 0 tanggungan
    'TK/1': 58500000, // Tidak Kawin, 1 tanggungan
    'TK/2': 63000000, // Tidak Kawin, 2 tanggungan
    'TK/3': 67500000, // Tidak Kawin, 3 tanggungan
    'K/0': 58500000,  // Kawin, 0 tanggungan
    'K/1': 63000000,  // Kawin, 1 tanggungan
    'K/2': 67500000,  // Kawin, 2 tanggungan
    'K/3': 72000000,  // Kawin, 3 tanggungan
  };
  
  const ptkp = ptkpValues[ptkpStatus] || 54000000;
  const annualGrossIncome = grossIncome * 12;
  const netIncome = Math.max(0, annualGrossIncome - ptkp);
  
  let tax = 0;
  if (netIncome <= 50000000) {
    tax = netIncome * 0.05;
  } else if (netIncome <= 250000000) {
    tax = 50000000 * 0.05 + (netIncome - 50000000) * 0.15;
  } else if (netIncome <= 500000000) {
    tax = 50000000 * 0.05 + 200000000 * 0.15 + (netIncome - 250000000) * 0.25;
  } else {
    tax = 50000000 * 0.05 + 200000000 * 0.15 + 250000000 * 0.25 + (netIncome - 500000000) * 0.35;
  }
  
  return {
    monthlyTax: Math.round(tax / 12),
    annualTax: Math.round(tax),
    calculations: [
      { label: 'Penghasilan Bruto Tahunan', value: annualGrossIncome },
      { label: 'PTKP', value: ptkp },
      { label: 'Penghasilan Kena Pajak', value: netIncome },
    ]
  };
};

// Calculate PPh 22
export const calculatePPh22 = (transactionValue, isPPNIncluded, type) => {
  let taxRate;
  let taxBase;
  
  if (type === 'import') {
    taxRate = 0.075; // 7.5% for imports
    // If PPN is included, we need to exclude it from the tax base
    taxBase = isPPNIncluded ? transactionValue / 1.1 : transactionValue;
  } else if (type === 'export') {
    taxRate = 0.0025; // 0.25% for exports
    taxBase = transactionValue;
  } else {
    // Default rate for other transactions
    taxRate = 0.015; // 1.5%
    taxBase = isPPNIncluded ? transactionValue / 1.1 : transactionValue;
  }
  
  const taxAmount = Math.round(taxBase * taxRate);
  
  return {
    taxAmount,
    calculations: [
      { label: 'Dasar Pengenaan Pajak', value: taxBase },
      { label: `Tarif PPh 22 (${(taxRate * 100).toFixed(2)}%)`, value: taxAmount },
    ]
  };
};

// Calculate PPh 23
export const calculatePPh23 = (amount, type) => {
  const rate = type === 'royalty' || type === 'dividend' || type === 'prize' ? 0.15 : 0.02;
  const taxAmount = Math.round(amount * rate);
  
  return {
    taxAmount,
    calculations: [
      { label: 'Dasar Pengenaan Pajak', value: amount },
      { label: `Tarif PPh 23 (${(rate * 100)}%)`, value: taxAmount },
    ]
  };
};

// Calculate PPN
export const calculatePPN = (amount, type) => {
  const rate = type === 'export' ? 0 : 0.1; // 0% for export, 10% otherwise
  const taxAmount = Math.round(amount * rate);
  
  return {
    taxAmount,
    calculations: [
      { label: 'Dasar Pengenaan Pajak', value: amount },
      { label: `Tarif PPN (${(rate * 100)}%)`, value: taxAmount },
    ]
  };
};

// Calculate PPh Final 4(2) for SMEs
export const calculatePPh4Ayat2UMKM = (grossRevenue) => {
  const rate = 0.005; // 0.5% based on PP 55/2022
  const taxAmount = Math.round(grossRevenue * rate);
  
  return {
    taxAmount,
    calculations: [
      { label: 'Peredaran Bruto', value: grossRevenue },
      { label: 'Tarif PPh Final (0.5%)', value: taxAmount },
    ]
  };
};

// Calculate PPh 26
export const calculatePPh26 = (amount, type) => {
  // Different types might have different rates based on tax treaties
  // This is a simplified approach
  const rate = 0.2; // 20% is the standard rate
  const taxAmount = Math.round(amount * rate);
  
  return {
    taxAmount,
    calculations: [
      { label: 'Dasar Pengenaan Pajak', value: amount },
      { label: 'Tarif PPh 26 (20%)', value: taxAmount },
    ]
  };
};

// Calculate PPh 15
export const calculatePPh15 = (amount, type) => {
  // Different types of businesses have different deemed profit rates
  let rate;
  
  switch (type) {
    case 'shipping':
      rate = 0.012; // 1.2% for international shipping
      break;
    case 'insurance':
      rate = 0.01; // 1% for foreign insurance companies
      break;
    case 'buildoperate':
      rate = 0.06; // 6% for build-operate-transfer
      break;
    default:
      rate = 0.03; // Default rate
  }
  
  const taxAmount = Math.round(amount * rate);
  
  return {
    taxAmount,
    calculations: [
      { label: 'Dasar Pengenaan Pajak', value: amount },
      { label: `Tarif PPh 15 (${(rate * 100).toFixed(1)}%)`, value: taxAmount },
    ]
  };
};

// Calculate PPh Final for individual SMEs
export const calculatePPhFinalIndividualSME = (grossRevenue) => {
  const rate = 0.005; // 0.5% based on PP 23/2018 as updated by PP 55/2022
  const taxAmount = Math.round(grossRevenue * rate);
  
  return {
    taxAmount,
    calculations: [
      { label: 'Peredaran Bruto', value: grossRevenue },
      { label: 'Tarif PPh Final (0.5%)', value: taxAmount },
    ]
  };
};

// Calculate PPh for individual (general mechanism)
export const calculatePPhIndividual = (annualIncome, deductions, ptkpStatus) => {
  const ptkpValues = {
    'TK/0': 54000000, // Tidak Kawin, 0 tanggungan
    'TK/1': 58500000, // Tidak Kawin, 1 tanggungan
    'TK/2': 63000000, // Tidak Kawin, 2 tanggungan
    'TK/3': 67500000, // Tidak Kawin, 3 tanggungan
    'K/0': 58500000,  // Kawin, 0 tanggungan
    'K/1': 63000000,  // Kawin, 1 tanggungan
    'K/2': 67500000,  // Kawin, 2 tanggungan
    'K/3': 72000000,  // Kawin, 3 tanggungan
  };
  
  const ptkp = ptkpValues[ptkpStatus] || 54000000;
  const netIncome = Math.max(0, annualIncome - deductions);
  const taxableIncome = Math.max(0, netIncome - ptkp);
  
  let tax = 0;
  if (taxableIncome <= 50000000) {
    tax = taxableIncome * 0.05;
  } else if (taxableIncome <= 250000000) {
    tax = 50000000 * 0.05 + (taxableIncome - 50000000) * 0.15;
  } else if (taxableIncome <= 500000000) {
    tax = 50000000 * 0.05 + 200000000 * 0.15 + (taxableIncome - 250000000) * 0.25;
  } else {
    tax = 50000000 * 0.05 + 200000000 * 0.15 + 250000000 * 0.25 + (taxableIncome - 500000000) * 0.35;
  }
  
  return {
    taxAmount: Math.round(tax),
    calculations: [
      { label: 'Penghasilan Bruto Tahunan', value: annualIncome },
      { label: 'Biaya/Pengurang', value: deductions },
      { label: 'Penghasilan Neto', value: netIncome },
      { label: 'PTKP', value: ptkp },
      { label: 'Penghasilan Kena Pajak', value: taxableIncome },
    ]
  };
};

// Calculate PPh with NPPN
export const calculatePPhWithNPPN = (grossIncome, businessCode, ptkpStatus) => {
  // Simplified NPPN rates based on business type
  // In a real app, this would have a complete list of business codes and rates
  const npnnRates = {
    'retail': 0.20, // 20% for retail
    'manufacturing': 0.125, // 12.5% for manufacturing
    'service': 0.30, // 30% for service
    'professional': 0.50, // 50% for professional services
    'agriculture': 0.15, // 15% for agriculture
    'other': 0.225 // 22.5% for others
  };
  
  const ptkpValues = {
    'TK/0': 54000000, // Tidak Kawin, 0 tanggungan
    'TK/1': 58500000, // Tidak Kawin, 1 tanggungan
    'TK/2': 63000000, // Tidak Kawin, 2 tanggungan
    'TK/3': 67500000, // Tidak Kawin, 3 tanggungan
    'K/0': 58500000,  // Kawin, 0 tanggungan
    'K/1': 63000000,  // Kawin, 1 tanggungan
    'K/2': 67500000,  // Kawin, 2 tanggungan
    'K/3': 72000000,  // Kawin, 3 tanggungan
  };
  
  const npnnRate = npnnRates[businessCode] || 0.225;
  const ptkp = ptkpValues[ptkpStatus] || 54000000;
  
  const netIncome = Math.round(grossIncome * npnnRate);
  const taxableIncome = Math.max(0, netIncome - ptkp);
  
  let tax = 0;
  if (taxableIncome <= 50000000) {
    tax = taxableIncome * 0.05;
  } else if (taxableIncome <= 250000000) {
    tax = 50000000 * 0.05 + (taxableIncome - 50000000) * 0.15;
  } else if (taxableIncome <= 500000000) {
    tax = 50000000 * 0.05 + 200000000 * 0.15 + (taxableIncome - 250000000) * 0.25;
  } else {
    tax = 50000000 * 0.05 + 200000000 * 0.15 + 250000000 * 0.25 + (taxableIncome - 500000000) * 0.35;
  }
  
  return {
    taxAmount: Math.round(tax),
    calculations: [
      { label: 'Penghasilan Bruto Tahunan', value: grossIncome },
      { label: `Norma (${(npnnRate * 100)}%)`, value: netIncome },
      { label: 'PTKP', value: ptkp },
      { label: 'Penghasilan Kena Pajak', value: taxableIncome },
    ]
  };
};