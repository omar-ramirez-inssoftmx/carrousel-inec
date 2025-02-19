import React, { useState } from 'react';
import './App.css';
import SearchCustomer from './components/SearchCustomer';
import NewCustomer from './components/NewCustomer';
import PaymentLink from './components/PaymentLink';
import CustomerInfo from './components/CustomerInfo';

function App() {
  const [customerFound, setCustomerFound] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);  // Inicializado como null

  // Llamada para manejar la búsqueda de alumno
  const handleCustomerSearch = (customerData) => {
    if (customerData) {
      setCustomerFound(customerData);   // Si se encuentra alumno, se actualiza el estado
    } else {
      setCustomerFound(false);            // Si no se encuentra alumno, se deja en null
    }
    setPaymentLink(null);              // Se asegura de que no haya un link de pago
  };

  // Llamada para manejar la generación del link de pago
  const handlePaymentLinkGenerated = (link) => {
    setPaymentLink(link);            // Guarda el link generado
    setCustomerFound(null);          // Se borra la información del alumno
  };

  return (
    <div className="App">
      <div className="container" style={{ width: '500px' }}>
        {/* Mostrar el buscador si no se ha encontrado alumno ni generado el link */}
        {<SearchCustomer onSearch={handleCustomerSearch} />}
        
        {/* Mostrar la información del alumno si se encontró el alumno */}
        {customerFound && !paymentLink && <CustomerInfo customer={customerFound} onGenerateLink={handlePaymentLinkGenerated} />}
        
        {/* Mostrar el link de pago si se generó */}
        {paymentLink && <PaymentLink paymentLink={paymentLink} />}
       
        {/* Mostrar formulario de nuevo alumno solo si no se ha encontrado el alumno y no hay link de pago */}
        {customerFound == false && <NewCustomer onGenerateLink={handlePaymentLinkGenerated} />}
      </div>
    </div>
  );
}

export default App;
