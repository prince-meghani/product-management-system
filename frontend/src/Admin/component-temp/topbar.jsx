import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Dropdown, Form, InputGroup } from 'react-bootstrap';
import { useAuth } from '../../context/Authcontext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/admin/profile'); 
  };

  return (
    <div className="d-flex justify-content-end  align-items-center p-3 border-bottom shadow-sm bg-white">
     

      <div className="d-flex align-items-center gap-3">
        <Bell size={20} />

        <Dropdown align="end">
          <Dropdown.Toggle variant="light" className="d-flex align-items-center border-0">
            <User size={18} className="me-2" />
            <span>{admin?.email || 'Admin'}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={goToProfile}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate('/admin/settings')}>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
