import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Login';
import PedidosTable from './components/PedidosTable';
import InfoStudent from './components/InfoStudent';
import CheckLinks from './components/CheckLinks';
import CreateCard from './components/CreateCard'
import Activity from './components/Activity';
import ListCard from './components/ListCard';
import DetailCard from './components/DetailCard';
import EditCard from './components/EditCard';
import DetailActivity from './components/DetailActivity';
import TerminosCondiciones from './components/TerminosCondiciones';
import AvisoPrivacidad from './components/AvisoPrivacidad';
import Contacto from './components/Contacto';

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
