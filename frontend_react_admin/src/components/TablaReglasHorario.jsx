import React from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaClock, FaVideo, FaMapMarkerAlt } from 'react-icons/fa';

const formatDate = (dateString) => {
    if (!dateString) return '';
    // El formato 'YYYY-MM-DD' es el que envía el backend
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const getDayName = (dayOfWeek) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayOfWeek] || '';
};

const formatTime = (time) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'p. m.' : 'a. m.';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${ampm}`;
};

// --- FUNCIÓN CORREGIDA PARA EL ÍCONO DE MODALIDAD ---
const getModalityIcon = (modality) => {
    // Convertimos a mayúsculas para ser consistentes con los datos del backend
    if (modality && modality.toUpperCase() === 'VIRTUAL') {
        return <FaVideo title="Virtual" className="ms-2 text-primary" />;
    }
    // Si no es VIRTUAL o es nulo/undefined, por defecto mostramos Presencial
    return <FaMapMarkerAlt title="Presencial" className="ms-2 text-success" />;
};

// --- EL COMPONENTE AHORA RECIBE LAS NUEVAS PROPS ---
const TablaReglasHorario = ({ scheduleRules, onAddRule, onEditRule, onDeleteRule }) => {
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
                        {scheduleRules && scheduleRules.length > 0 ? (
                            scheduleRules.map((rule) => (
                                <tr key={rule.id}>
                                    <td className="ps-4"><strong>{formatDate(rule.startDate)}</strong></td>
                                    <td><strong>{formatDate(rule.endDate)}</strong></td>
                                    <td>{rule.appointmentDuration} min</td>
                                    <td>
                                        <div style={{ maxWidth: '450px', whiteSpace: 'normal' }}>
                                            {rule.timeSlots.map((slot, index) => (
                                                <div key={index} className='d-inline-block me-2 mb-1'>
                                                    <Badge bg="light" text="dark" className="fw-normal p-2">
                                                        <FaClock className="me-1" />
                                                        {getDayName(slot.dayOfWeek)} {formatTime(slot.startTime)}-{formatTime(slot.endTime)}
                                                        {getModalityIcon(slot.modality)}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="text-end pe-4">
                                        {/* --- BOTONES CON FUNCIONALIDAD ONCLICK --- */}
                                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => onEditRule(rule)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => onDeleteRule(rule.id)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted py-4">
                                    Aún no has creado ninguna regla de agenda. ¡Haz clic en "Crear Regla" para empezar!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default TablaReglasHorario;