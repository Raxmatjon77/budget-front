import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import { TransactionsPage } from '@/pages/Transactions';
import { StatisticsPage } from '@/pages/Statistics';
import { OutcomeDetails } from '@/pages/OutcomeDetails';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/outcomes/:id" element={<OutcomeDetails />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
