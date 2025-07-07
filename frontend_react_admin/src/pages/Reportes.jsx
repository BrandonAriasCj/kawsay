import React, { useState, useEffect } from 'react';
import { Form, Card, Spinner } from 'react-bootstrap';
import instance from '../services/axiosInstance';
import ReactMarkdown from 'react-markdown';

const Reportes = () => {
    const [todosLosReportes, setTodosLosReportes] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [reportesFiltrados, setReportesFiltrados] = useState([]);
    const [selectedAlumnoId, setSelectedAlumnoId] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        instance.get("/reportes/all")
            .then(response => {
                const reportesRecibidos = response.data;
                setTodosLosReportes(reportesRecibidos);
                setReportesFiltrados(reportesRecibidos); 
                const alumnosMap = new Map();
                reportesRecibidos.forEach(reporte => {
                    alumnosMap.set(reporte.usuario_id, reporte.nombreAlumno);
                });
                
                const listaAlumnos = Array.from(alumnosMap, ([id, nombre]) => ({ id, nombre }));
                setAlumnos(listaAlumnos);
            })
            .catch(err => console.error("Error al cargar reportes:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleAlumnoChange = (e) => {
        const alumnoId = e.target.value;
        setSelectedAlumnoId(alumnoId);

        if (alumnoId) {
      
            const filtrados = todosLosReportes.filter(reporte => reporte.usuario_id === alumnoId);
            setReportesFiltrados(filtrados);
        } else {
          
            setReportesFiltrados(todosLosReportes);
        }
    };

    const getNombreAlumnoSeleccionado = () => {
        if (!selectedAlumnoId) return '';
        const alumno = alumnos.find(a => a.id === selectedAlumnoId);
        return alumno ? alumno.nombre : '';
    };

    return (
        <div>
            <h1>Resúmenes de Reportes de IA por Alumno</h1>
            <Form.Group className="mb-3">
                <Form.Label>Seleccione un Alumno</Form.Label>
                <Form.Select onChange={handleAlumnoChange} value={selectedAlumnoId}>
                    <option value="">Todos los Alumnos</option>
                    {alumnos.map(alumno => (
                        <option key={alumno.id} value={alumno.id}>{alumno.nombre}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <hr />

            {isLoading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <div>
                    <h3>
                        {selectedAlumnoId ? `Reportes para ${getNombreAlumnoSeleccionado()}` : 'Todos los Reportes'}
                    </h3>
                    {reportesFiltrados.length > 0 ? (
                        reportesFiltrados.map(reporte => (
                             <Card key={reporte.id} className="mb-3">
                                <Card.Header>
                                    {}
                                    <strong>{`Reporte para ${reporte.nombreAlumno}`}</strong>
                                    <span className="text-muted float-end">
                                        {new Date(reporte.timestamp).toLocaleString('es-ES')}
                                    </span>
                                </Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{reporte.contenido}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        ))
                    ) : <p>No se encontraron reportes.</p>}
                </div>
            )}
        </div>
    );
};

export default Reportes;