import React from 'react';
import type { StudyPlanItem, SubjectStatus } from '../../types';
import './SubjectCard.css';

interface SubjectCardProps {
  data: StudyPlanItem;
  status: SubjectStatus | string;
  onClick: () => void;
}

const mapStatusToClass = (rawStatus?: SubjectStatus | string): 'approved' | 'enrolled' | 'planned' | 'pending' | 'error' | 'failed' => {
  if (!rawStatus) return 'pending';
  const s = String(rawStatus).trim().toLowerCase();
  
  if (['completed', 'complete', 'approved', 'aprobada', 'aprobado'].includes(s)) return 'approved';
  if (['enrolled', 'inscrito', 'inscrita'].includes(s)) return 'enrolled';
  if (['planned', 'planeada', 'planeado'].includes(s)) return 'planned';
  
  // Nuevo estado específico para Reprobada
  if (['failed', 'reprobada', 'reprobado', 'loss'].includes(s)) return 'failed';
  
  if (['error', 'errored', 'rejected', 'blocked'].includes(s)) return 'error';
  
  return 'pending';
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ data, status, onClick }) => {
  const { subject_code, subject, progress } = data;
  const name = subject?.name || "Asignatura Desconocida";
  const credits = subject?.credits || 0;
  
  // Si la materia fue reprobada, mostramos la nota en rojo en la tarjeta
  const showGrade = progress?.status === 'Failed' && progress?.final_grade !== undefined;

  const normalizedStatus = mapStatusToClass(status);

  return (
    <div 
      className={`subject-card ${normalizedStatus}`} 
      onClick={onClick}
      title={name}
    >
      <div className="card-header-sc">
        <span className="subject-code">{subject_code}</span>
        {normalizedStatus === 'error' && <span className="warning-icon">⚠️</span>}
        {/* Icono visual si reprobó */}
        {normalizedStatus === 'failed' && <span style={{fontSize:'0.8rem'}}>✕</span>}
      </div>
      
      <div className="card-body-sc">
        <h4 className="subject-name">{name}</h4>
      </div>

      <div className="card-footer-sc">
        {showGrade ? (
            <span className="credits-badge grade-badge-fail">Nota: {progress?.final_grade}</span>
        ) : (
            <span className="credits-badge">{credits} Créditos</span>
        )}
      </div>
    </div>
  );
};