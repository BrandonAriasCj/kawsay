// src/pages/Dashboard.jsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    // Datos de ejemplo. Esto vendrá de la API.
    const riskData = {
        labels: ['Riesgo Bajo', 'Riesgo Medio', 'Riesgo Alto'],
        datasets: [ {
            label: '# de Estudiantes',
            data: [120, 55, 15], 
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        } ],
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Resumen visual del estado de los estudiantes.</p>
            <Row className="mt-4">
                <Col md={7}>
                    <Card>
                        <Card.Header>Distribución de Riesgo de Estudiantes</Card.Header>
                        <Card.Body style={{ height: '350px', position: 'relative' }}>
                            <Pie data={riskData} options={{ maintainAspectRatio: false, responsive: true }} />
                        </Card.Body>
                    </Card>
                </Col>
                 <Col md={5}>
                     <Card>
                        <Card.Header>Alertas Recientes</Card.Header>
                        <Card.Body>
                            <p>Aquí irá una lista de alertas...</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;