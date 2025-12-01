import React from 'react';
import type { StudyPlanItem, SubjectStatus } from '../../types';
import './SubjectCard.css';

// Define las propiedades requeridas para el componente de tarjeta de asignatura
interface SubjectCardProps {
  data: StudyPlanItem;
  status: SubjectStatus | string;
  onClick: () => void;
}

/**
 * Normaliza distintos valores de estado (casos y variantes del backend)
 */
const mapStatusToClass = (rawStatus?: SubjectStatus | string): 'approved' | 'enrolled' | 'planned' | 'pending' | 'error' => {
  if (!rawStatus) return 'pending';
  const s = String(rawStatus).trim().toLowerCase();
  // Aprobada
  if (['completed', 'complete', 'approved', 'aprobada', 'aprobado', 'passed', 'passed_course', 'done'].includes(s)) {
    return 'approved';
  }
  // Inscrita
  if (['enrolled', 'inscrito', 'inscrita', 'registration', 'registered'].includes(s)) {
    return 'enrolled';
  }
  // Planeada
  if (['planned', 'planeada', 'planeado', 'plan', 'to_plan'].includes(s)) {
    return 'planned';
  }
  // Error / alerta
  if (['error', 'errored', 'failed', 'rejected', 'blocked'].includes(s)) {
    return 'error';
  }
  // Pendiente (por defecto)
  return 'pending';
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ data, status, onClick }) => {
  // Desestructura los datos y asigna valores por defecto si el objeto 'subject' no está definido
  const { subject_code, subject } = data;
  const name = subject?.name || "Asignatura Desconocida";
  const credits = subject?.credits || 0;

  // Normaliza el status antes de usarlo en la clase CSS
  const normalizedStatus = mapStatusToClass(status);

  return (
    <div 
      className={`subject-card ${normalizedStatus}`} 
      onClick={onClick}
      title={name}
    >
      <div className="card-header-sc">
        <span className="subject-code">{subject_code}</span>
        {/* Muestra un indicador visual si existe un error de prerrequisitos */}
        {normalizedStatus === 'error' && <span className="warning-icon">⚠️</span>}
      </div>
      
      <div className="card-body-sc">
        <h4 className="subject-name">{name}</h4>
      </div>

      <div className="card-footer-sc">
        <span className="credits-badge">{credits} Créditos</span>
      </div>
    </div>
  );
};

