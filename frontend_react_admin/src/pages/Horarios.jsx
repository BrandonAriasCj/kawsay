// src/pages/Horarios.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, Alert, Row, Col } from 'react-bootstrap';

const Horarios = () => {
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const horariosSimulados = [
        { id: 1, fecha: '2023-11-10', hora_inicio: '09:00', hora_fin: '10:00', reservado: false },
        { id: 2, fecha: '2023-11-10', hora_inicio: '10:00', hora_fin: '11:00', reservado: true },
        { id: 3, fecha: '2023-11-11', hora_inicio: '14:00', hora_fin: '15:00', reservado: false },
    ];

    useEffect(() => { setHorarios(horariosSimulados); }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensaje(`Horario agregado para el ${fecha} de ${horaInicio} a ${horaFin}`);
        setTimeout(() => setMensaje(''), 3000);
    };

    return (
        <div>
            <h1>Gestión de Horarios</h1>
            <Row className="mt-4">
                <Col md={5}>
                    <Card>
                        <Card.Header as="h5">Agregar Nuevo Horario Disponible</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="date" value={fecha} onChange={e => setFecha(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hora de Inicio</Form.Label>
                                    <Form.Control type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hora de Fin</Form.Label>
                                    <Form.Control type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} required/>
                                </Form.Group>
                                <Button variant="primary" type="submit">Agregar Horario</Button>
                            </Form>
                            {mensaje && <Alert variant="success" className="mt-3">{mensaje}</Alert>}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                     <Card>
                        <Card.Header as="h5">Mis Horarios</Card.Header>
                         <ListGroup variant="flush">
                            {horarios.map(h => (
                                <ListGroup.Item key={h.id} className="d-flex justify-content-between align-items-center">
                                    <span>{h.fecha} de <strong>{h.hora_inicio}</strong> a <strong>{h.hora_fin}</strong></span>
                                    <span className={`badge rounded-pill bg-${h.reservado ? 'danger' : 'success'}`}>
                                        {h.reservado ? 'Reservado' : 'Disponible'}
                                    </span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Horarios;