import React, { useState, useEffect } from 'react';
import { Alert, Tabs, Tab } from 'react-bootstrap';
import { FaCalendarAlt, FaUserClock, FaCalendarCheck, FaUser } from 'react-icons/fa';

import api from '../services/axiosInstance'; 

import TablaReglasHorario from '../components/TablaReglasHorario'; 
import ListaCitas from '../components/ListaCitas'; 
import CalendarioSemanal from '../components/CalendarioSemanal'; 
import ModalEditorRegla from '../components/ModalEditorRegla'; 

import '../styles/Horarios.css'; 

const Horarios = () => {
   
    const currentPsychologist = {
        id: 1,
        name: 'Dr. María González',
        specialty: 'Ansiedad y Depresión',
    };
    const [showRuleModal, setShowRuleModal] = useState(false);
    const [scheduleRules, setScheduleRules] = useState([]);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('availability');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const initialRuleFormState = {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        appointmentDuration: 60,
        timeSlots: [
            { id: Date.now(), dayOfWeek: 1, startTime: '08:00', endTime: '14:00', modality: 'virtual' }
        ]
    };
    const [newRuleForm, setNewRuleForm] = useState(initialRuleFormState);
    
    // 2. useEffect ahora usa tu instancia 'api' para cargar datos reales
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Llamada para obtener las reglas del psicólogo logueado
                const reglasResponse = await api.get('/api/horarios-citas/reglas');
                setScheduleRules(reglasResponse.data);

                // Llamada para obtener las citas del psicólogo logueado
                const citasResponse = await api.get('/api/horarios-citas/citas/mis-citas');
                setBookedAppointments(citasResponse.data);

            } catch (error) {
                console.error("Error al cargar los datos del horario:", error);
            }
        };

        cargarDatos();
    }, []);

    const handleRuleFormChange = (e) => setNewRuleForm({ ...newRuleForm, [e.target.name]: e.target.value });
    
    const handleTimeSlotChange = (index, field, value) => {
        const updatedTimeSlots = [...newRuleForm.timeSlots];
        updatedTimeSlots[index] = { ...updatedTimeSlots[index], [field]: value };
        setNewRuleForm({ ...newRuleForm, timeSlots: updatedTimeSlots });
    };

    const addTimeSlot = () => {
        const newSlot = { id: Date.now(), dayOfWeek: 1, startTime: '08:00', endTime: '14:00', modality: 'virtual' };
        setNewRuleForm({ ...newRuleForm, timeSlots: [...newRuleForm.timeSlots, newSlot] });
    };

    const removeTimeSlot = (index) => {
        const updatedTimeSlots = newRuleForm.timeSlots.filter((_, i) => i !== index);
        setNewRuleForm({ ...newRuleForm, timeSlots: updatedTimeSlots });
    };

    // 3. handleRuleSubmit ahora usa 'api' para enviar la nueva regla al backend
   const handleRuleSubmit = async (e) => {
    e.preventDefault();

    try {
        const sanitizedSlots = newRuleForm.timeSlots.map(({ dayOfWeek, startTime, endTime, modality }) => ({
            dayOfWeek,
            startTime,
            endTime,
            modality: modality.toUpperCase() // convertir a VIRTUAL o PRESENCIAL
        }));

        const payload = {
            startDate: newRuleForm.startDate,
            endDate: newRuleForm.endDate,
            appointmentDuration: newRuleForm.appointmentDuration,
            timeSlots: sanitizedSlots,
            
        };

        console.log("Enviando payload limpio:", payload);
        await api.post('/api/horarios-citas/reglas', payload);

        const reglasResponse = await api.get('/api/horarios-citas/reglas');
        setScheduleRules(reglasResponse.data);

        setShowRuleModal(false);
        setNewRuleForm(initialRuleFormState);
    } catch (error) {
        console.error("Error al crear la regla:", error);
    }
};

    const openNewRuleModal = () => {
        setNewRuleForm(initialRuleFormState);
        setShowRuleModal(true);
    };

    // El JSX no cambia en absoluto. Sigue renderizando basado en los estados.
    return (
        <div className="schedules-container">
            <div className="mb-4">
                <h1 className="display-6 fw-bold text-dark mb-2"><FaCalendarAlt className="me-3 text-primary" />Mi Horario</h1>
                <p className="text-muted fs-5">Gestiona tus reglas de disponibilidad y revisa tus citas programadas.</p>
                <Alert variant="info" className="mt-3"><FaUserClock className="me-2" /><strong>Dr. {currentPsychologist.name}</strong> - {currentPsychologist.specialty}</Alert>
            </div>

            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
                <Tab eventKey="availability" title={<span><FaCalendarCheck className="me-2" />Reglas de Agenda</span>}>
                    <TablaReglasHorario
                        scheduleRules={scheduleRules}
                        onAddRule={openNewRuleModal}
                    />
                </Tab>

                <Tab eventKey="appointments" title={<span><FaUser className="me-2" />Citas Programadas</span>}>
                    <ListaCitas
                        appointments={bookedAppointments}
                    />
                </Tab>

                <Tab eventKey="calendar" title={<span><FaCalendarAlt className="me-2" />Vista Semanal</span>}>
                    <CalendarioSemanal
                        appointments={bookedAppointments}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </Tab>
            </Tabs>

            <ModalEditorRegla
                show={showRuleModal}
                onHide={() => setShowRuleModal(false)}
                ruleData={newRuleForm}
                onFormChange={handleRuleFormChange}
                onTimeSlotChange={handleTimeSlotChange}
                onAddTimeSlot={addTimeSlot}
                onRemoveTimeSlot={removeTimeSlot}
                onSubmit={handleRuleSubmit}
            />
        </div>
    );
};

export default Horarios;