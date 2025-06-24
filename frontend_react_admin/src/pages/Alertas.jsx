// src/pages/Alertas.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';

const Alertas = () => {
    const [alumnoId, setAlumnoId] = useState('');
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    const alumnosSimulados = [
        { id: 1, nombre: 'Juan Pérez' }, { id: 2, nombre: 'Ana Gómez' }, { id: 3, nombre: 'Pedro Martinez' },
    ];
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setMensajeExito(`Alerta enviada a ${alumnosSimulados.find(a => a.id == alumnoId)?.nombre}`);
        setAlumnoId('');
        setMensajeAlerta('');
        setTimeout(() => setMensajeExito(''), 4000);
    };

    return (
        <>
            <h1 className="mb-4">Enviar Alertas</h1>
            <Row>
                <Col lg={8} xl={6}>
                    <Card>
                        <Card.Header>Redactar Alerta para Estudiante</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seleccionar Alumno</Form.Label>
                                    <Form.Select value={alumnoId} onChange={e => setAlumnoId(e.target.value)} required>
                                        <option value="">Elige un alumno...</option>
                                        {alumnosSimulados.map(alumno => (
                                            <option key={alumno.id} value={alumno.id}>{alumno.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mensaje de la Alerta</Form.Label>
                                    <Form.Control as="textarea" rows={4} value={mensajeAlerta} onChange={e => setMensajeAlerta(e.target.value)} placeholder="Ej: Se ha detectado un comportamiento de riesgo. Por favor, agenda una cita lo antes posible." required />
                                </Form.Group>
                                {}
                                <Button variant="danger" type="submit">Enviar Alerta Urgente</Button>
                            </Form>
                            {mensajeExito && <Alert variant="success" className="mt-3">{mensajeExito}</Alert>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Alertas;