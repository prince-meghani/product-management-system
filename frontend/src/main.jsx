import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminRoutes from './routes/adminRoutes';
import { AuthProvider } from './context/Authcontext';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <AuthProvider>
      <AdminRoutes />
    </AuthProvider>
  </React.StrictMode>
);
