// In main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this for Bootstrap styling
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Keep Bootstrap JS for functionality

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
