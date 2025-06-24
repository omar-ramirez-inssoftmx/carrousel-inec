import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from './app/(public)/login/page';
import Contacto from './app/(public)/contacto/page';
import TerminosCondiciones from './app/(public)/terminos-condiciones/page';
import AvisoPrivacidad from './app/(public)/aviso-privacidad/page';

import EditCard from './app/dashboard/cards/edit/page';
import DetailCard from './app/dashboard/cards/detail/page';
import ListCard from './app/dashboard/cards/page';
import CheckLinks from './app/dashboard/check-links/page';
import PedidosTable from './app/dashboard/pedidos/page';
import InfoStudent from './app/dashboard/page';
import CreateCard from './app/dashboard/create-card/page';
import Activity from './app/dashboard/activity/page';
import DetailActivity from './app/dashboard/activity/detail/page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<InfoStudent />} />
          <Route path="/dashboard/pedidos" element={<PedidosTable />} />
          <Route path="/dashboard/check-links" element={<CheckLinks />} />
          <Route path="/dashboard/create-card" element={<CreateCard />} />
          <Route path="/dashboard/activity" element={<Activity />} />
          <Route path="/dashboard/activity/detail/:paymentId" element={<DetailActivity />} />

          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
          <Route path="/contacto" element={<Contacto />} />

          <Route path="/dashboard/cards" element={<ListCard />} />
          <Route path="/dashboard/cards/detail/:cardId" element={<DetailCard />} />
          <Route path="/dashboard/cards/edit/:cardId" element={<EditCard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
