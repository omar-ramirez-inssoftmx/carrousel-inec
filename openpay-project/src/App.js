import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Login';
import PedidosTable from './components/PedidosTable';
import InfoStudent from './components/InfoStudent';
import CheckLinks from './components/CheckLinks';

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
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
