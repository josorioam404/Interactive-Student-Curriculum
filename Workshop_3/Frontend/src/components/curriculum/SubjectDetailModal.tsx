import React from 'react';
import { X, AlertTriangle, Clock, MapPin } from 'lucide-react';
import type { StudyPlanItem } from '../../types';
import './SubjectDetailModal.css';

// Define las propiedades para el control y datos del modal de detalle
interface SubjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: StudyPlanItem | null;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({ isOpen, onClose, data }) => {
  // Retorna nulo si el modal no debe mostrarse o no hay datos disponibles
  if (!isOpen || !data) return null;

  const { subject_code, subject } = data;
  
  // Simula datos de horario estructurados para la visualización de la interfaz
  const mockScheduleData = [
    { day: 'Martes', time: '10:00 - 12:00', room: 'Edif. 454 - Salón 401' },
    { day: 'Jueves', time: '10:00 - 12:00', room: 'Edif. 454 - Salón 401' }
  ];

  // Prepara los datos de visualización asignando valores por defecto para evitar errores
  const displayData = {
    name: subject?.name || "Asignatura Desconocida",
    credits: subject?.credits || 0,
    theoryHours: subject?.theory_hours || 2,
    practiceHours: subject?.practice_hours || 2,
    labHours: subject?.lab_hours || 0,
    professor: subject?.professor || "Dr. Profesor Asignado",
    description: subject?.description || "Esta asignatura proporciona los fundamentos teóricos y prácticos necesarios para comprender los conceptos avanzados del área de estudio, enfocándose en metodologías de análisis y diseño."
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Detiene la propagación del evento clic para evitar cerrar el modal al interactuar con el contenido */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Encabezado del modal con título y botón de cierre */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{displayData.name}</h2>
            <span className="modal-subtitle">Código: {subject_code}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Contenido principal con información detallada */}
        <div className="modal-content">
          
          {/* Sección de Información General */}
          <section className="detail-section">
            <h3 className="section-title">Información General</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Créditos:</span>
                <span className="info-value">{displayData.credits}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Horas teóricas:</span>
                <span className="info-value">{displayData.theoryHours} h/sem</span>
              </div>
              <div className="info-item">
                <span className="info-label">Horas prácticas:</span>
                <span className="info-value">{displayData.practiceHours} h/sem</span>
              </div>
              <div className="info-item">
                <span className="info-label">Horas laboratorio:</span>
                <span className="info-value">{displayData.labHours} h/sem</span>
              </div>
            </div>
          </section>

          {/* Sección de Detalles Específicos (Profesor y Horario) */}
          <section className="detail-section">
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem'}}>
                
                <div>
                    <span className="info-label">Docente:</span>
                    <div className="info-value">{displayData.professor}</div>
                </div>

                {/* Renderiza la lista de horarios y salones */}
                <div>
                    <span className="info-label" style={{marginBottom: '8px', display: 'block'}}>Horarios y Salones:</span>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                        {mockScheduleData.map((slot, idx) => (
                            <div key={idx} style={{
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                backgroundColor: '#f9f9f9',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #eee'
                            }}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '6px', minWidth: '140px'}}>
                                    <Clock size={14} className="text-gray-500"/>
                                    <span style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--unal-dark)'}}>
                                        {slot.day}
                                    </span>
                                    <span style={{fontSize: '0.85rem', color: 'var(--unal-gray)'}}>{slot.time}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                                    <MapPin size={14} className="text-gray-500"/>
                                    <span style={{fontSize: '0.85rem', color: 'var(--unal-dark)'}}>{slot.room}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <h3 className="section-title">Descripción</h3>
            <p className="description-text">{displayData.description}</p>
          </section>

          {/* Sección de Prerrequisitos (Datos simulados) */}
          <section className="detail-section">
            <h3 className="section-title">Prerrequisitos</h3>
            <div className="prereq-list">
              <div className="prereq-tag">2015702 - Cálculo Diferencial</div>
              <div className="prereq-tag">2016377 - Programación Básica</div>
              <div className="prereq-tag prereq-warning">
                <AlertTriangle size={14} />
                <span>Falta aprobar: Álgebra Lineal</span>
              </div>
            </div>
          </section>

        </div>

        {/* Pie de página con botones de acción */}
        <div className="modal-actions">
            <button className="btn-modal btn-cancel" onClick={onClose}>Cerrar</button>
            <button className="btn-modal btn-cancel" disabled title="Funcionalidad próximamente">Simular Inscripción</button>
            <button className="btn-modal btn-confirm" disabled title="Funcionalidad próximamente">Marcar Aprobada</button>
        </div>

      </div>
    </div>
  );
};