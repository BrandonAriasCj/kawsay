import React from 'react';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { FaCalendarCheck, FaPlus, FaTrash } from 'react-icons/fa';

const daysOfWeek = [
    { value: 1, label: 'Lunes' }, { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' }, { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' }, { value: 6, label: 'Sábado' },
    { value: 0, label: 'Domingo' }
];

const ModalEditorRegla = ({ show, onHide, ruleData, onFormChange, onTimeSlotChange, onAddTimeSlot, onRemoveTimeSlot, onSubmit }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title><FaCalendarCheck className="me-2 text-primary" />Crear Regla de Agenda</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col md={6}><Form.Group><Form.Label>Fecha Desde*</Form.Label><Form.Control type="date" name="startDate" value={ruleData.startDate} onChange={onFormChange} required /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>Fecha Hasta*</Form.Label><Form.Control type="date" name="endDate" value={ruleData.endDate} onChange={onFormChange} required /></Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-4">
                        <Form.Label>Tiempo de cita (minutos)*</Form.Label>
                        <Form.Select name="appointmentDuration" value={ruleData.appointmentDuration} onChange={onFormChange}>
                            <option value={30}>30 minutos</option><option value={45}>45 minutos</option><option value={60}>60 minutos</option><option value={90}>90 minutos</option>
                        </Form.Select>
                    </Form.Group>
                    <h5 className="mb-3">Franja Horaria</h5>
                    {ruleData.timeSlots.map((slot, index) => (
                        <Card key={slot.id || index} className="mb-3 bg-light border-0"><Card.Body>
                            <Row className="align-items-center">
                                <Col md={3}><Form.Group><Form.Label>Día*</Form.Label><Form.Select value={slot.dayOfWeek} onChange={(e) => onTimeSlotChange(index, 'dayOfWeek', parseInt(e.target.value))} required>{daysOfWeek.map(day => <option key={day.value} value={day.value}>{day.label}</option>)}</Form.Select></Form.Group></Col>
                                <Col md={3}><Form.Group><Form.Label>Hora Desde*</Form.Label><Form.Control type="time" value={slot.startTime} onChange={(e) => onTimeSlotChange(index, 'startTime', e.target.value)} required /></Form.Group></Col>
                                <Col md={3}><Form.Group><Form.Label>Hora Hasta*</Form.Label><Form.Control type="time" value={slot.endTime} onChange={(e) => onTimeSlotChange(index, 'endTime', e.target.value)} required /></Form.Group></Col>
                                <Col md={2}><Form.Group><Form.Label>Modalidad*</Form.Label><Form.Select value={slot.modality} onChange={(e) => onTimeSlotChange(index, 'modality', e.target.value)} required><option value="virtual">Virtual</option><option value="presencial">Presencial</option></Form.Select></Form.Group></Col>
                                <Col md={1} className="text-end pt-4"><Button variant="danger" size="sm" onClick={() => onRemoveTimeSlot(index)}><FaTrash /></Button></Col>
                            </Row>
                        </Card.Body></Card>
                    ))}
                    <Button variant="outline-primary" onClick={onAddTimeSlot}><FaPlus className="me-2" />Añadir Franja Horaria</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                    <Button variant="primary" type="submit">Guardar Regla</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalEditorRegla;