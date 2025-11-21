import React from 'react';
import { mockAcademicHistory, mockCreditDistribution } from '../data/mockAcademicHistory';
import './AcademicReport.css';

export const AcademicReport: React.FC = () => {
  // Calcula las métricas académicas basándose en los datos históricos simulados
  const totalCreditsTaken = mockAcademicHistory.reduce((sum, item) => sum + item.credits, 0);
  const totalGradesSum = mockAcademicHistory.reduce((sum, item) => sum + item.grade, 0);
  
  // Calcula el Promedio Aritmético (P.A.)
  const pa = (totalGradesSum / mockAcademicHistory.length).toFixed(2);

  // Calcula el Promedio Académico Ponderado Acumulado (P.A.P.A.)
  const weightedSum = mockAcademicHistory.reduce((sum, item) => sum + (item.grade * item.credits), 0);
  const papa = (weightedSum / totalCreditsTaken).toFixed(2);

  // Estructura los datos para la visualización del gráfico de distribución
  const chartData = [
    { label: 'Básico', ...mockCreditDistribution.fundamentacion },
    { label: 'Disciplinar', ...mockCreditDistribution.disciplinar },
    { label: 'Libre', ...mockCreditDistribution.libre },
  ];

  // Determina el valor máximo para escalar dinámicamente el eje Y del gráfico
  const maxCredits = Math.max(...chartData.map(d => d.total));

  return (
    <div className="report-container">
      <h1 className="report-title">Reporte Académico</h1>

      {/* Renderiza las tarjetas de resumen con los promedios calculados */}
      <section className="summary-cards-grid">
        <div className="summary-card">
          <h3>Promedio General (P.A.)</h3>
          <span className="value">{pa}</span>
          <span className="description">Basado en {mockAcademicHistory.length} asignaturas cursadas.</span>
        </div>
        
        <div className="summary-card">
          <h3>Promedio Ponderado (P.A.P.A.)</h3>
          <span className="value">{papa}</span>
          <span className="description">Promedio ajustado según el peso (créditos) de cada asignatura.</span>
        </div>

        <div className="summary-card">
          <h3>Créditos Completados</h3>
          {/* Visualiza el progreso respecto a un total estimado de créditos */}
          <span className="value">{totalCreditsTaken} / 160</span>
          <span className="description">Total de créditos aprobados sobre el total del programa.</span>
        </div>
      </section>

      {/* Genera el gráfico de barras utilizando CSS puro y cálculos porcentuales */}
      <section className="chart-section">
        <h3 className="chart-title">Distribución de Créditos por Componente</h3>
        
        <div className="chart-container">
            {/* Líneas de referencia visual para el gráfico */}
            <div className="chart-grid-line" style={{bottom: '0%'}}></div>
            <div className="chart-grid-line" style={{bottom: '50%'}}></div>
            <div className="chart-grid-line" style={{bottom: '100%'}}></div>

            {chartData.map((item) => {
                // Calcula las alturas relativas para las barras CSS
                const totalHeight = (item.total / maxCredits) * 100; 
                const completedHeight = (item.completed / item.total) * 100; 

                return (
                    <div key={item.label} className="bar-group">
                        {/* Barra de fondo que representa el total requerido */}
                        <div className="bar-total" style={{height: `${totalHeight}%`}}>
                            {/* Barra interna que representa el progreso actual */}
                            <div className="bar-filled" style={{height: `${completedHeight}%`}}></div>
                        </div>
                        <span className="bar-label">{item.label}</span>
                        <span style={{fontSize: '0.75rem', color: '#888', marginTop:'4px'}}>
                            {item.completed} / {item.total}
                        </span>
                    </div>
                );
            })}
        </div>

        <div className="chart-legend">
            <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: 'var(--unal-red)'}}></div>
                <span>Completados</span>
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#f0f0f0'}}></div>
                <span>Pendientes</span>
            </div>
        </div>
      </section>

      {/* Renderiza la tabla de histórico de calificaciones */}
      <section className="table-section">
        <h3 className="chart-title">Calificaciones Finales por Semestre</h3>
        <table className="grades-table">
            <thead>
                <tr>
                    <th>Semestre</th>
                    <th>Código</th>
                    <th>Asignatura</th>
                    <th>Créditos</th>
                    <th>Calificación</th>
                </tr>
            </thead>
            <tbody>
                {mockAcademicHistory.map((record, index) => (
                    <tr key={index}>
                        <td>{record.semester}</td>
                        <td>{record.code}</td>
                        <td>{record.subject}</td>
                        <td>{record.credits}</td>
                        {/* Aplica estilo condicional para resaltar notas superiores a 4.0 */}
                        <td className={record.grade >= 4.0 ? 'grade-good' : 'grade-average'}>
                            {record.grade.toFixed(1)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </section>

    </div>
  );
};