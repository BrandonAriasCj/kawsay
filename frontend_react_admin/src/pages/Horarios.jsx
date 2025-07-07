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
    const [psicologoPerfil, setPsicologoPerfil] = useState({ nombreProfesional: 'Cargando...', especialidad: '' });
    const [scheduleRules, setScheduleRules] = useState([]);
    const [showRuleModal, setShowRuleModal] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('availability');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const initialRuleFormState = {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        appointmentDuration: 60,
        timeSlots: [{ dayOfWeek: 1, startTime: '08:00', endTime: '14:00', modality: 'virtual' }]
    };
    const [newRuleForm, setNewRuleForm] = useState(initialRuleFormState);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [reglasRes, citasRes, perfilRes] = await Promise.all([
                    api.get('/horarios-citas/reglas'),
                    api.get('/horarios-citas/citas/mis-citas'),
                    api.get('/perfil-psicologo')
                ]);

                setScheduleRules(reglasRes.data);
                setBookedAppointments(citasRes.data);
                if (perfilRes.data) {
                    setPsicologoPerfil(perfilRes.data);
                }
            } catch (error) {
                console.error("Error al cargar los datos iniciales:", error);
            }
        };
        cargarDatos();
    }, []);

    const handleRuleFormChange = (e) => setNewRuleForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleTimeSlotChange = (index, field, value) => {
        const updatedTimeSlots = [...newRuleForm.timeSlots];
        updatedTimeSlots[index] = { ...updatedTimeSlots[index], [field]: value };
        setNewRuleForm(prev => ({ ...prev, timeSlots: updatedTimeSlots }));
    };

    const addTimeSlot = () => setNewRuleForm(prev => ({ ...prev, timeSlots: [...prev.timeSlots, { dayOfWeek: 1, startTime: '08:00', endTime: '14:00', modality: 'virtual' }] }));

    const removeTimeSlot = (index) => setNewRuleForm(prev => ({ ...prev, timeSlots: prev.timeSlots.filter((_, i) => i !== index) }));

    const handleOpenCreateModal = () => {
        setEditingRule(null);
        setNewRuleForm(initialRuleFormState);
        setShowRuleModal(true);
    };

    const handleOpenEditModal = (rule) => {
        setEditingRule(rule);
        setNewRuleForm({
            id: rule.id,
            startDate: rule.startDate,
            endDate: rule.endDate,
            appointmentDuration: rule.appointmentDuration,
            timeSlots: rule.timeSlots,
        });
        setShowRuleModal(true);
    };

    const handleRuleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            ...newRuleForm,
            timeSlots: newRuleForm.timeSlots.map(({ dayOfWeek, startTime, endTime, modality }) => ({
                dayOfWeek, startTime, endTime, modality
            }))
        };
        
        try {
            if (editingRule) {
                await api.put(`/horarios-citas/reglas/${editingRule.id}`, payload);
            } else {
                await api.post('/horarios-citas/reglas', payload);
            }

            const reglasResponse = await api.get('/horarios-citas/reglas');
            setScheduleRules(reglasResponse.data);

            setShowRuleModal(false);
            setEditingRule(null);
        } catch (error) {
            console.error("Error al guardar la regla:", error);
            alert("No se pudo guardar la regla.");
        }
    };
    
    const handleDeleteRule = async (ruleId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta regla?")) {
            try {
                await api.delete(`/horarios-citas/reglas/${ruleId}`);
                setScheduleRules(prev => prev.filter(rule => rule.id !== ruleId));
            } catch (error) {
                console.error("Error al eliminar la regla:", error);
                alert("No se pudo eliminar la regla.");
            }
        }
    };

    return (
        <div className="schedules-container">
            <div className="mb-4">
                <h1 className="display-6 fw-bold text-dark mb-2"><FaCalendarAlt className="me-3 text-primary" />Mi Horario</h1>
                <p className="text-muted fs-5">Gestiona tus reglas de disponibilidad y revisa tus citas programadas.</p>
                <Alert variant="info" className="mt-3">
                    <FaUserClock className="me-2" />
                    <strong>{psicologoPerfil.nombreProfesional}</strong> - {psicologoPerfil.especialidad || 'Sin especialidad definida'}
                </Alert>
            </div>

            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
                <Tab eventKey="availability" title={<span><FaCalendarCheck className="me-2" />Reglas de Agenda</span>}>
                    <TablaReglasHorario
                        scheduleRules={scheduleRules}
                        onAddRule={handleOpenCreateModal}
                        onEditRule={handleOpenEditModal}
                        onDeleteRule={handleDeleteRule}
                    />
                </Tab>
                <Tab eventKey="appointments" title={<span><FaUser className="me-2" />Citas Programadas</span>}>
                    <ListaCitas appointments={bookedAppointments} />
                </Tab>
                <Tab eventKey="calendar" title={<span><FaCalendarAlt className="me-2" />Vista Semanal</span>}>
                    <CalendarioSemanal appointments={bookedAppointments} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
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
                isEditing={!!editingRule}
            />
        </div>
    );
};

export default Horarios;