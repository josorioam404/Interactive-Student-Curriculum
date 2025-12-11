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
  // Detectamos variantes de inscrita
  if (['enrolled', 'inscrito', 'inscrita', 'cursando'].includes(s)) return 'enrolled';
  if (['planned', 'planeada', 'planeado'].includes(s)) return 'planned';
  if (['failed', 'reprobada', 'reprobado', 'loss'].includes(s)) return 'failed';
  
  return 'pending';
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ data, status, onClick }) => {
  const { subject_code, subject, progress } = data;
  const name = subject?.name || "Asignatura Desconocida";
  const credits = subject?.credits || 0;
  
  const normalizedStatus = mapStatusToClass(status);
  
  // Lógica de visualización del footer
  const isEnrolled = normalizedStatus === 'enrolled';
  const hasGrade = progress?.final_grade !== undefined && progress?.final_grade !== null;
  const grade = progress?.final_grade;

  return (
    <div 
      className={`subject-card ${normalizedStatus}`} 
      onClick={onClick}
      title={name}
    >
      <div className="card-header-sc">
        <span className="subject-code">{subject_code}</span>
        {normalizedStatus === 'failed' && <span style={{fontSize:'0.8rem', fontWeight:'bold'}}>✕</span>}
        {normalizedStatus === 'approved' && <span style={{fontSize:'0.8rem', fontWeight:'bold'}}>✓</span>}
        {/* Icono de reloj/loading para inscritas */}
        {isEnrolled && <span style={{fontSize:'0.8rem', fontWeight:'bold'}}>⏱</span>}
      </div>
      
      <div className="card-body-sc">
        <h4 className="subject-name">{name}</h4>
      </div>

      <div className="card-footer-sc">
        {/* IZQUIERDA: Badge "CURSANDO" o la Nota */}
        <span className="left-indicator">
            {isEnrolled ? (
                <span className="cursando-badge">CURSANDO</span>
            ) : hasGrade ? (
                <span className="grade-display">Nota: {Number(grade).toFixed(1)}</span>
            ) : null}
        </span>

        {/* DERECHA: Créditos */}
        <span className="credits-badge">{credits} Créditos</span>
      </div>
    </div>
  );
};