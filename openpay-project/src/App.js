import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';
import PedidosTable from './pages/PedidosTable';
import InfoStudent from './pages/InfoStudent';
import CheckLinks from './pages/CheckLinks';
import CreateCard from './pages/CreateCard'
import Activity from './pages/Activity';
import ListCard from './pages/ListCard';
import DetailCard from './pages/DetailCard';
import EditCard from './pages/EditCard';
import DetailActivity from './pages/DetailActivity';
import TerminosCondiciones from './pages/TerminosCondiciones';
import AvisoPrivacidad from './pages/AvisoPrivacidad';
import Contacto from './pages/Contacto';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/info/student" element={<InfoStudent />} />
          <Route path="/dashboard/pedidos" element={<PedidosTable />} />
          <Route path="/dashboard/CheckLinks" element={<CheckLinks />} />
          <Route path="/dashboard/CreateCard" element={<CreateCard />} />
          <Route path="/dashboard/Activity" element={<Activity />} />
          <Route path="/dashboard/ListCard" element={<ListCard />} />
          <Route path="/dashboard/DetailCard" element={<DetailCard />} />
          <Route path="/dashboard/EditCard" element={<EditCard />} />
          <Route path="/dashboard/DetailActivity" element={<DetailActivity />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
