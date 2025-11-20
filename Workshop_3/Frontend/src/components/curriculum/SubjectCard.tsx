import React from 'react';
import type { StudyPlanItem, SubjectStatus } from '../../types';
import './SubjectCard.css';

interface SubjectCardProps {
  data: StudyPlanItem;
  status: SubjectStatus;
  onClick: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ data, status, onClick }) => {
  // Extraemos datos. Si 'subject' viene undefined, usamos valores por defecto.
  const { subject_code, subject } = data;
  const name = subject?.name || "Asignatura Desconocida";
  const credits = subject?.credits || 0;

  return (
    <div 
      className={`subject-card ${status}`} 
      onClick={onClick}
      title={name}
    >
      <div className="card-header-sc">
        <span className="subject-code">{subject_code}</span>
        {/* Ícono de alerta si hay error de prerrequisitos */}
        {status === 'error' && <span className="warning-icon">⚠️</span>}
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