import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Asegúrate de que este archivo exista y tenga los estilos necesarios

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* El Router ya está dentro de App */}
  </React.StrictMode>
);