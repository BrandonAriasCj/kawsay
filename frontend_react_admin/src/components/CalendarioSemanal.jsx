import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaVideo, FaMapMarkerAlt } from 'react-icons/fa';

const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'p. m.' : 'a. m.';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${ampm}`;
};
const getTypeIcon = (type) => type === 'virtual' ? <FaVideo className="text-primary" /> : <FaMapMarkerAlt className="text-success" />;

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
                    <h5 className="mb-0 fw-bold text-dark">Semana del {weekDays[0].toLocaleDateString()} - {weekDays[6].toLocaleDateString()}</h5>
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
                    {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
                        <div key={hour} className="calendar-row">
                            <div className="time-slot">{hour}:00</div>
                            {weekDays.map((day, dayIndex) => {
                                const dayAppointments = appointments.filter(app => app.date === day.toISOString().split('T')[0] && parseInt(app.time.split(':')[0]) === hour);
                                return (
                                    <div key={dayIndex} className="day-slot">
                                        {dayAppointments.map(appointment => (
                                            <div key={appointment.id} className="appointment-card booked">
                                                <div className="appointment-time">{formatTime(appointment.time)}</div>
                                                <div className="appointment-student">{appointment.studentName}</div>
                                                <div className="mt-1">
                                                    {getTypeIcon(appointment.type)}
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