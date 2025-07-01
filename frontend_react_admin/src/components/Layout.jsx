// src/components/Layout.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

import { FaTachometerAlt, FaFileAlt, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const Layout = ({ children }) => {
  const location = useLocation();

  // Captura el token de la URL y lo guarda en localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("jwtToken", token);
      console.log("✅ Token recibido en frontend de psicólogo:", token);
    }
  }, []);

  const navItems = [
    { to: "/", icon: <FaTachometerAlt />, text: "Dashboard" },
    { to: "/reportes", icon: <FaFileAlt />, text: "Reportes por Alumno" },
    { to: "/horarios", icon: <FaCalendarAlt />, text: "Gestionar Horarios" },
    { to: "/alertas", icon: <FaExclamationTriangle />, text: "Enviar Alertas" },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} id="sidebar-wrapper">
          <Nav className="flex-column sidebar">
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
