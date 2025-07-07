import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaVideo, FaMapMarkerAlt, FaUserGraduate } from 'react-icons/fa';

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
};

const CalendarioSemanal = ({ appointments, selectedDate, setSelectedDate }) => {
    const getWeekDays = () => {
        const days = [];
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - (selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1));
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }
        return days;
    };
    const weekDays = getWeekDays();

    return (
        <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <Card.Header className="bg-white border-0 py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold text-dark">Semana del {weekDays[0].toLocaleDateString('es-ES')} - {weekDays[6].toLocaleDateString('es-ES')}</h5>
                    <div>
                        <Button variant="outline-primary" size="sm" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))}>← Anterior</Button>
                        <Button variant="outline-primary" size="sm" className="ms-2" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))}>Siguiente →</Button>
                    </div>
                </div>
            </Card.Header>
            <Card.Body className="p-0">
                <div className="weekly-calendar">
                    <div className="calendar-header">
                        <div className="time-column">Hora</div>
                        {weekDays.map((day, index) => (
                            <div key={index} className="day-header">
                                <div className="day-name">{day.toLocaleDateString('es-ES', { weekday: 'short' })}</div>
                                <div className="day-date">{day.getDate()}</div>
                            </div>
                        ))}
                    </div>
                    {/* Genera las filas de horas de 8am a 7pm (19:00) */}
                    {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
                        <div key={hour} className="calendar-row">
                            <div className="time-slot">{hour}:00</div>
                            {weekDays.map((day, dayIndex) => {
                                // --- CORRECCIÓN CLAVE EN EL FILTRADO ---
                                const dayAppointments = appointments.filter(app => 
                                    app.fechaCita === day.toISOString().split('T')[0] && 
                                    parseInt(app.horaInicio.split(':')[0], 10) === hour
                                );
                                return (
                                    <div key={dayIndex} className="day-slot">
                                        {dayAppointments.map(appointment => (
                                            <div key={appointment.id} className="appointment-card booked">
                                                {/* --- CORRECCIÓN EN LA RENDERIZACIÓN --- */}
                                                <div className="appointment-time">{formatTime(appointment.horaInicio)}</div>
                                                <div className="appointment-student d-flex align-items-center">
                                                    <FaUserGraduate size="0.8em" className="me-2" />
                                                    {appointment.estudianteNombre || 'N/A'}
                                                </div>
                                                <div className="appointment-type mt-1">
                                                    {getTypeIcon(appointment.modalidad)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CalendarioSemanal;