import React, { useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';
import { FaTachometerAlt, FaFileAlt, FaCalendarAlt, FaExclamationTriangle, FaSignOutAlt, FaUserEdit  } from 'react-icons/fa';


const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'http://localhost:5173') {
        return;
      }

      if (event.data && event.data.type === 'AUTH_TOKEN' && event.data.token) {
        localStorage.setItem('jwtToken', event.data.token);
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');
    window.location.href = 'http://localhost:5173/global-logout';
  };

  const navItems = [
    { to: "/", icon: <FaTachometerAlt />, text: "Dashboard" },
    { to: "/reportes", icon: <FaFileAlt />, text: "Reportes por Alumno" },
    { to: "/horarios", icon: <FaCalendarAlt />, text: "Gestionar Horarios" },
  
    { to: "/perfil", icon: <FaUserEdit />, text: "Mi Perfil" },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} id="sidebar-wrapper" className="d-flex flex-column justify-content-between">
          <Nav className="flex-column sidebar h-100">
            <div>
              <div className="sidebar-header">
                <h3>KawsAi</h3>
                <span>Panel Psicólogo</span>
              </div>
              {navItems.map((item) => (
                <Nav.Item key={item.to}>
                  <Nav.Link as={Link} to={item.to} active={location.pathname === item.to}>
                    {item.icon}
                    <span>{item.text}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </div>
            <div className="p-3">
              <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" />
                Cerrar sesión
              </button>
            </div>
          </Nav>
        </Col>
        <Col md={9} lg={10} id="page-content-wrapper">
          <main className="py-4 px-4">{children}</main>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;