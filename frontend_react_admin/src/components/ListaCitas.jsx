import React from 'react';
import { Card, ListGroup, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaClock, FaEdit, FaVideo, FaMapMarkerAlt } from 'react-icons/fa';

const formatDate = (dateString) => new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
const formatTime = (time) => {
  if (!time) return '--';
  const [hour, minute] = time.split(':');
  const h = parseInt(hour);
  const ampm = h >= 12 ? 'p. m.' : 'a. m.';
  const formattedHour = h % 12 === 0 ? 12 : h % 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

const getTypeIcon = (type) => type === 'virtual' ? <FaVideo className="text-primary" /> : <FaMapMarkerAlt className="text-success" />;

const ListaCitas = ({ appointments }) => {
    return (
        <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <Card.Header className="bg-white border-0 py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                <h5 className="mb-0 fw-bold text-dark">Próximas Citas Reservadas</h5>
            </Card.Header>
            <Card.Body className="p-0">
                <ListGroup variant="flush">
                    {appointments.length > 0 ? appointments.map((appointment) => (
                        <ListGroup.Item key={appointment.id} className="py-3">
                            <Row className="align-items-center">
                                <Col md={3}><div className="fw-bold">{appointment.studentName}</div><small className="text-muted">{appointment.studentId}</small></Col>
                                <Col md={3}><div className="fw-bold">{formatDate(appointment.date)}</div><div className="text-muted"><FaClock className="me-1" />{formatTime(appointment.time)}</div></Col>
                                <Col md={2}><div className="d-flex align-items-center">{getTypeIcon(appointment.type)}<span className="ms-2">{appointment.type === 'virtual' ? 'Virtual' : 'Presencial'}</span></div></Col>
                                <Col md={3}><div className="text-muted small">{appointment.notes}</div></Col>
                                <Col md={1} className="text-end"><Button variant="outline-primary" size="sm"><FaEdit /></Button></Col>
                            </Row>
                        </ListGroup.Item>
                    )) : <ListGroup.Item>No hay citas programadas.</ListGroup.Item>}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ListaCitas;