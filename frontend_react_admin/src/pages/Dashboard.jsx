// src/pages/Dashboard.jsx
import React from 'react';
import { Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { 
    FaBrain, 
    FaExclamationTriangle, 
    FaUserFriends, 
    FaComments,
    FaChartPie,
    FaBell,
    FaHeart,
    FaEye,
    FaClock,
    FaShieldAlt
} from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

const Dashboard = () => {
    // Datos de riesgo psicológico
    const riskData = {
        labels: ['Sin Riesgo', 'Riesgo Leve', 'Riesgo Moderado', 'Riesgo Alto'],
        datasets: [{
            label: 'Estudiantes',
            data: [85, 45, 25, 8],
            backgroundColor: [
                'rgba(34, 197, 94, 0.8)',   // Verde - Sin riesgo
                'rgba(251, 191, 36, 0.8)',  // Amarillo - Leve
                'rgba(249, 115, 22, 0.8)',  // Naranja - Moderado
                'rgba(239, 68, 68, 0.8)'    // Rojo - Alto
            ],
            borderColor: [
                'rgba(34, 197, 94, 1)',
                'rgba(251, 191, 36, 1)',
                'rgba(249, 115, 22, 1)',
                'rgba(239, 68, 68, 1)'
            ],
            borderWidth: 2,
        }],
    };

    // Datos de interacciones con IA
    const interactionData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Interacciones con IA',
            data: [12, 19, 15, 25, 22, 18, 14],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 2,
            borderRadius: 8,
        }],
    };

    // Datos de tendencias emocionales
    const emotionalTrends = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Ansiedad',
                data: [65, 59, 80, 81],
                borderColor: 'rgba(239, 68, 68, 1)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4
            },
            {
                label: 'Depresión',
                data: [28, 48, 40, 19],
                borderColor: 'rgba(99, 102, 241, 1)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4
            },
            {
                label: 'Estrés',
                data: [45, 25, 35, 50],
                borderColor: 'rgba(251, 191, 36, 1)',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            }
        }
    };

    const barOptions = {
        ...chartOptions,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const lineOptions = {
        ...chartOptions,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    };

    const statsCards = [
        {
            title: 'Estudiantes Monitoreados',
            value: '4',
            icon: <FaBrain className="text-primary" />,
            change: '+1',
            changeType: 'positive',
            description: 'Activos en el sistema'
        },
        {
            title: 'Alertas de Riesgo',
            value: '0',
            icon: <FaExclamationTriangle className="text-warning" />,
            change: '+0',
            changeType: 'negative',
            description: 'Requieren atención'
        },
        {
            title: 'Interacciones IA',
            value: '504',
            icon: <FaComments className="text-info" />,
            change: '+11',
            changeType: 'positive',
            description: 'Esta semana'
        },
        {
            title: 'Sesiones Activas',
            value: '1',
            icon: <FaUserFriends className="text-success" />,
            change: '+0',
            changeType: 'positive',
            description: 'En curso'
        }
    ];

    const recentAlerts = [
        { 
            id: 1, 
            student: 'María González', 
            message: 'Detectados patrones de ansiedad elevada en interacciones recientes', 
            type: 'warning', 
            time: '2h',
            riskLevel: 'Moderado'
        },

    ];

    const activeSessions = [
        { id: 1, student: 'Juan Pérez', progress: 75, status: 'En progreso', timeLeft: '15 min' },
        { id: 2, student: 'Laura Torres', progress: 45, status: 'Pausado', timeLeft: '30 min' },
        { id: 3, student: 'Diego Morales', progress: 90, status: 'Finalizando', timeLeft: '5 min' }
    ];

    return (
        <div className="dashboard-container" style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <div className="mb-4">
                <h1 className="display-6 fw-bold text-dark mb-2">
                    <FaBrain className="me-3 text-primary" />
                    Panel de Salud Mental
                </h1>
                <p className="text-muted fs-5">Monitoreo y detección temprana de riesgos psicológicos</p>
            </div>

            {/* Tarjetas de estadísticas principales */}
            <Row className="mb-4">
                {statsCards.map((stat, index) => (
                    <Col key={index} lg={3} md={6} className="mb-3">
                        <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted mb-1 fw-medium">{stat.title}</p>
                                        <h2 className="fw-bold mb-1" style={{ fontSize: '2.5rem' }}>
                                            {stat.value}
                                        </h2>
                                        <p className="text-muted small mb-2">{stat.description}</p>
                                        <Badge 
                                            bg={stat.changeType === 'positive' ? 'success' : 'danger'}
                                            className="px-2 py-1"
                                            style={{ fontSize: '0.75rem' }}
                                        >
                                            {stat.change}
                                        </Badge>
                                    </div>
                                    <div className="fs-1 opacity-75">
                                        {stat.icon}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Gráficos principales */}
            <Row className="mb-4">
                <Col lg={6} className="mb-3">
                    <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-white border-0 py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                            <h5 className="mb-0 fw-bold text-dark">
                                <FaShieldAlt className="me-2 text-primary" />
                                Distribución de Riesgo Psicológico
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-4" style={{ height: '350px', position: 'relative' }}>
                            <Pie data={riskData} options={chartOptions} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} className="mb-3">
                    <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-white border-0 py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                            <h5 className="mb-0 fw-bold text-dark">
                                <FaComments className="me-2 text-info" />
                                Interacciones con IA (Semana)
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-4" style={{ height: '350px', position: 'relative' }}>
                            <Bar data={interactionData} options={barOptions} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Tendencias emocionales y alertas */}
            <Row className="mb-4">
                <Col lg={8} className="mb-3">
                    <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-white border-0 py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                            <h5 className="mb-0 fw-bold text-dark">
                                <FaHeart className="me-2 text-danger" />
                                Tendencias Emocionales (Último Mes)
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-4" style={{ height: '300px', position: 'relative' }}>
                            <Line data={emotionalTrends} options={lineOptions} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className="mb-3">
                    <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-white border-0 py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                            <h5 className="mb-0 fw-bold text-dark">
                                <FaBell className="me-2 text-warning" />
                                Alertas Recientes
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="alerts-list">
                                {recentAlerts.map((alert) => (
                                    <div key={alert.id} className="alert-item d-flex align-items-start py-3 border-bottom">
                                        <div className="flex-shrink-0 me-3">
                                            <div className={`alert-icon rounded-circle d-flex align-items-center justify-content-center`}
                                                 style={{
                                                     width: '40px',
                                                     height: '40px',
                                                     backgroundColor: alert.type === 'warning' ? '#fef3c7' : 
                                                                   alert.type === 'success' ? '#d1fae5' : 
                                                                   alert.type === 'danger' ? '#fee2e2' : '#dbeafe'
                                                 }}>
                                                {alert.type === 'warning' && <FaExclamationTriangle className="text-warning" />}
                                                {alert.type === 'success' && <FaHeart className="text-success" />}
                                                {alert.type === 'danger' && <FaExclamationTriangle className="text-danger" />}
                                                {alert.type === 'info' && <FaEye className="text-info" />}
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-1">
                                                <h6 className="mb-0 fw-bold text-dark">{alert.student}</h6>
                                                <Badge 
                                                    bg={alert.riskLevel === 'Alto' ? 'danger' : 
                                                        alert.riskLevel === 'Moderado' ? 'warning' : 
                                                        alert.riskLevel === 'Leve' ? 'info' : 'success'}
                                                    className="small"
                                                >
                                                    {alert.riskLevel}
                                                </Badge>
                                            </div>
                                            <p className="mb-1 small text-muted">{alert.message}</p>
                                            <small className="text-muted">{alert.time} atrás</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Sesiones activas */}
            <Row>
                <Col lg={12}>
                    <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                        <Card.Header className="bg-white border-0 py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                            <h5 className="mb-0 fw-bold text-dark">
                                <FaClock className="me-2 text-success" />
                                Sesiones Activas con IA
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Row>
                                {activeSessions.map((session) => (
                                    <Col key={session.id} lg={4} md={6} className="mb-3">
                                        <div className="session-card p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="mb-0 fw-bold">{session.student}</h6>
                                                <Badge 
                                                    bg={session.status === 'En progreso' ? 'primary' : 
                                                        session.status === 'Pausado' ? 'warning' : 'success'}
                                                    className="small"
                                                >
                                                    {session.status}
                                                </Badge>
                                            </div>
                                            <div className="mb-2">
                                                <div className="d-flex justify-content-between small text-muted mb-1">
                                                    <span>Progreso</span>
                                                    <span>{session.progress}%</span>
                                                </div>
                                                <ProgressBar 
                                                    now={session.progress} 
                                                    variant={session.progress > 80 ? 'success' : session.progress > 50 ? 'primary' : 'warning'}
                                                    style={{ height: '8px' }}
                                                />
                                            </div>
                                            <small className="text-muted">
                                                <FaClock className="me-1" />
                                                {session.timeLeft} restantes
                                            </small>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;