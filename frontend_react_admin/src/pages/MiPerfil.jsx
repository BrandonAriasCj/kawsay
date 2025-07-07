import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import api from '../services/axiosInstance'; // Asegúrate de que la ruta sea correcta

const MiPerfil = () => {
    const [perfil, setPerfil] = useState({
        nombreProfesional: '',
        especialidad: '',
        descripcion: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                // --- CORRECCIÓN 1: Se quita '/api' ---
                const response = await api.get('/perfil-psicologo');
                if (response.data) {
                    setPerfil(response.data);
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.log("No se encontró un perfil existente, se creará uno nuevo.");
                } else {
                    setError('No se pudo cargar tu perfil. Inténtalo de nuevo más tarde.');
                    console.error("Error al cargar perfil:", err);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchPerfil();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);
        try {
            // --- CORRECCIÓN 2: Se quita '/api' ---
            await api.post('/perfil-psicologo', perfil);
            setSuccess('¡Perfil actualizado con éxito!');
        } catch (err) {
            setError('Hubo un error al guardar el perfil.');
            console.error("Error al guardar perfil:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    }

    return (
        <Card>
            <Card.Header as="h5">Gestionar Mi Perfil Profesional</Card.Header>
            <Card.Body>
                <p>Esta información será visible para los estudiantes cuando seleccionen un profesional para agendar una cita.</p>
                <hr />
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nombreProfesional">
                        <Form.Label>Nombre Profesional Completo</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreProfesional"
                            value={perfil.nombreProfesional || ''}
                            onChange={handleChange}
                            placeholder="Aquí pon tu nombre..."
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="especialidad">
                        <Form.Label>Especialidad Principal</Form.Label>
                        <Form.Control
                            type="text"
                            name="especialidad"
                            value={perfil.especialidad || ''}
                            onChange={handleChange}
                            placeholder="Aquí pon tu especialidad..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descripcion">
                        <Form.Label>Descripción Breve (Bio)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={perfil.descripcion || ''}
                            onChange={handleChange}
                            placeholder="Aquí pon tu descripción..."
                        />
                    </Form.Group>
                    
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    {success && <Alert variant="success" className="mt-3">{success}</Alert>}

                    <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Guardar Cambios'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default MiPerfil;