// src/pages/Reportes.jsx
import React, { useState, useEffect } from 'react';
import { Form, Card } from 'react-bootstrap';
import axiosIns from '../services/axiosInstance'

const Reportes = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [reportes, setReportes] = useState([]);

    const alumnosSimulados = [
        { id: 1, nombre: 'Juan Pérez' }, { id: 2, nombre: 'Ana Gómez' }, { id: 3, nombre: 'Pedro Martinez' },
    ];
    const reportesSimulados = {
        1: [{ id: 101, fecha: '2023-10-26', resumen: 'El alumno muestra señales de estrés académico.' }],
        2: [{ id: 102, fecha: '2023-10-25', resumen: 'Interacción social positiva, sin alertas.' }],
        3: [{ id: 103, fecha: '2023-10-27', resumen: 'Presenta un posible cuadro de ansiedad, se recomienda seguimiento.'}, { id: 104, fecha: '2023-10-20', resumen: 'Bajo rendimiento en las últimas evaluaciones.'}]
    };

    useEffect(() => { setAlumnos(alumnosSimulados); }, []);

    useEffect(()=>{
            axiosIns.get(`/api/reportes/all`)
            .then(response => {
                setReportes(() => response.data);
                console.log("asdfasd");
                console.log(reportes);
            })
            .catch(err => console.log(err));
            console.log("Se ejecuta la seccion del axios")
    }, []);

    const handleAlumnoChange = (e) => {
        const alumnoId = e.target.value;
        setSelectedAlumno(alumnoId);
        setReportes(reportesSimulados[alumnoId] || []);
    };

    return (
        <div>
            <h1>Resúmenes de Reportes de IA por Alumno</h1>
            <Form.Group className="mb-3">
                <Form.Label>Seleccione un Alumno</Form.Label>
                <Form.Select onChange={handleAlumnoChange}>
                    <option>Elige un alumno...</option>
                    {alumnos.map(alumno => (<option key={alumno.id} value={alumno.id}>{alumno.nombre}</option>))}
                </Form.Select>
            </Form.Group>
            <hr />
            {selectedAlumno && (
                <div>
                    <h3>Reportes para {alumnos.find(a => a.id == selectedAlumno)?.nombre}</h3>
                    {reportes.length > 0 ? (
                        reportes.map(reporte => (
                             <Card key={reporte.id} className="mb-3">
                                <Card.Header>Reporte del {reporte.fecha}</Card.Header>
                                <Card.Body>
                                    <Card.Text>{reporte.resumen}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : <p>No hay reportes para este alumno.</p>}
                </div>
            )}
        </div>
    );
};
export default Reportes;