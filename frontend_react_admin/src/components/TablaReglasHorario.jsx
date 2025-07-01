import React from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaClock, FaVideo, FaMapMarkerAlt } from 'react-icons/fa';

const formatDate = (dateString) => new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
const getDayName = (dayOfWeek) => ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][dayOfWeek];
const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'p. m.' : 'a. m.';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${ampm}`;
};

const TablaReglasHorario = ({ scheduleRules, onAddRule }) => {
    return (
        <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <Card.Header className="bg-white border-0 py-3 d-flex justify-content-between align-items-center" style={{ borderRadius: '15px 15px 0 0' }}>
                <h5 className="mb-0 fw-bold text-dark">Reglas de Agenda Activas</h5>
                <Button variant="primary" onClick={onAddRule}>
                    <FaPlus className="me-2" />Crear Regla
                </Button>
            </Card.Header>
            <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="ps-4">Desde</th>
                            <th>Hasta</th>
                            <th>Duración Cita</th>
                            <th>Horario</th>
                            <th className="text-end pe-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleRules.map((rule) => (
                            <tr key={rule.id}>
                                <td className="ps-4"><strong>{formatDate(rule.startDate)}</strong></td>
                                <td><strong>{formatDate(rule.endDate)}</strong></td>
                                <td>{rule.appointmentDuration} min</td>
                                <td>
                                    <div style={{ maxWidth: '450px', whiteSpace: 'normal' }}>
                                        {rule.timeSlots.map(slot => (
                                            <div key={slot.id} className='d-inline-block me-2 mb-1'>
                                                <Badge bg="light" text="dark" className="fw-normal p-2">
                                                    {getDayName(slot.dayOfWeek)} {formatTime(slot.startTime)}-{formatTime(slot.endTime)}
                                                    {slot.modality === 'virtual' ? <FaVideo title="Virtual" className="ms-2 text-primary" /> : <FaMapMarkerAlt title="Presencial" className="ms-2 text-success" />}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="text-end pe-4">
                                    <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /></Button>
                                    <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default TablaReglasHorario;