
import React from 'react';
import Sidebar from '../component-temp/sidebar';
import Topbar from '../component-temp/topbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
   <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
