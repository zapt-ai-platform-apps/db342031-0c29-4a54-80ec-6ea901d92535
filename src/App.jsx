import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/modules/core/components/layout/MainLayout';
import HomePage from '@/modules/core/components/pages/HomePage';
import CompanyTaxIndex from '@/modules/company/components/CompanyTaxIndex';
import IndividualTaxIndex from '@/modules/individual/components/IndividualTaxIndex';
import PPh21Calculator from '@/modules/company/components/calculators/PPh21Calculator';
import PPh22Calculator from '@/modules/company/components/calculators/PPh22Calculator';
import PPh23Calculator from '@/modules/company/components/calculators/PPh23Calculator';
import PPNCalculator from '@/modules/company/components/calculators/PPNCalculator';
import PPh4Ayat2Calculator from '@/modules/company/components/calculators/PPh4Ayat2Calculator';
import PPh26Calculator from '@/modules/company/components/calculators/PPh26Calculator';
import PPh15Calculator from '@/modules/company/components/calculators/PPh15Calculator';
import PPh23IndividualCalculator from '@/modules/individual/components/calculators/PPh23IndividualCalculator';
import PPh17Calculator from '@/modules/individual/components/calculators/PPh17Calculator';
import PPh17NPPNCalculator from '@/modules/individual/components/calculators/PPh17NPPNCalculator';
import ZaptBadge from '@/modules/core/components/ui/ZaptBadge';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Company Tax Routes */}
          <Route path="/company" element={<CompanyTaxIndex />} />
          <Route path="/company/pph21" element={<PPh21Calculator />} />
          <Route path="/company/pph22" element={<PPh22Calculator />} />
          <Route path="/company/pph23" element={<PPh23Calculator />} />
          <Route path="/company/ppn" element={<PPNCalculator />} />
          <Route path="/company/pph4ayat2" element={<PPh4Ayat2Calculator />} />
          <Route path="/company/pph26" element={<PPh26Calculator />} />
          <Route path="/company/pph15" element={<PPh15Calculator />} />
          
          {/* Individual Tax Routes */}
          <Route path="/individual" element={<IndividualTaxIndex />} />
          <Route path="/individual/pph23" element={<PPh23IndividualCalculator />} />
          <Route path="/individual/pph17" element={<PPh17Calculator />} />
          <Route path="/individual/pph17nppn" element={<PPh17NPPNCalculator />} />
        </Routes>
        <ZaptBadge />
      </MainLayout>
    </Router>
  );
}