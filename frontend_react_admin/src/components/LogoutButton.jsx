import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:5173/login'; // URL del login de Spring
  };

  return (
    <Button
      variant="outline-light"
      onClick={handleLogout}
      className="logout-button"
    >
      <FaSignOutAlt className="me-2" />
      Cerrar sesión
    </Button>
  );
};

export default LogoutButton;
