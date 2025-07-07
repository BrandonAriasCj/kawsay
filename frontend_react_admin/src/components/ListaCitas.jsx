import React from 'react';
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { FaClock, FaEdit, FaVideo, FaMapMarkerAlt, FaUserGraduate } from 'react-icons/fa';

// --- ¡ESTA ES LA FUNCIÓN CORREGIDA! ---
const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  
  // El formato "YYYY-MM-DD" es universal.
  const date = new Date(dateString);

  // Verificamos si la fecha es válida
  if (isNaN(date.getTime())) return 'Fecha inválida';

  // toLocaleDateString() con la opción timeZone: 'UTC' le dice a JavaScript:
  // "Formatea esta fecha como si estuvieras en la zona horaria UTC".
  // Esto previene la conversión automática a la zona horaria local del navegador.
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC' // ¡La clave está aquí!
  });
};

const formatTime = (timeString) => {
  if (!timeString) return '--';
  const [hour, minute] = timeString.split(':');
  const h = parseInt(hour, 10);
  const date = new Date();
  date.setHours(h, parseInt(minute, 10));
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const getTypeIcon = (type) => {
    const modality = type ? type.toUpperCase() : '';
    return modality === 'VIRTUAL' ? <FaVideo className="text-primary" title="Virtual" /> : <FaMapMarkerAlt className="text-success" title="Presencial" />;
}

const ListaCitas = ({ appointments }) => {
    return (
        <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <Card.Header className="bg-white border-0 py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                <h5 className="mb-0 fw-bold text-dark">Próximas Citas Reservadas</h5>
            </Card.Header>
            <Card.Body className="p-0">
                <ListGroup variant="flush">
                    {appointments && appointments.length > 0 ? appointments.map((appointment) => (
                        <ListGroup.Item key={appointment.id} className="py-3">
                            <Row className="align-items-center">
                                <Col md={4} className="d-flex align-items-center">
                                    <FaUserGraduate className="me-3 text-muted" size="1.5em" />
                                    <div>
                                        <div className="fw-bold">{appointment.estudianteNombre || 'Nombre no disponible'}</div>
                                    </div>
                                </Col>
                                
                                <Col md={4}>
                                    <div className="fw-bold">{formatDate(appointment.fechaCita)}</div>
                                    <div className="text-muted">
                                        <FaClock className="me-1" />
                                        {formatTime(appointment.horaInicio)}
                                    </div>
                                </Col>
                                
                                <Col md={3}>
                                    <div className="d-flex align-items-center">
                                        {getTypeIcon(appointment.modalidad)}
                                        <span className="ms-2 text-capitalize">
                                            {appointment.modalidad ? appointment.modalidad.toLowerCase() : 'N/A'}
                                        </span>
                                    </div>
                                </Col>
                                
                            </Row>
                        </ListGroup.Item>
                    )) : (
                        <ListGroup.Item className="text-center text-muted py-4">
                            No hay citas programadas por el momento.
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ListaCitas;