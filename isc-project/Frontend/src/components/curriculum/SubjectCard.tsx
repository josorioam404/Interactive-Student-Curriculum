import React from 'react';
import type { StudyPlanItem, SubjectStatus } from '../../types';
import './SubjectCard.css';

interface SubjectCardProps {
  data: StudyPlanItem;
  status: SubjectStatus | string;
  onClick: () => void;
}

const mapStatusToClass = (rawStatus?: SubjectStatus | string): string => {
  if (!rawStatus) return 'pending';
  const s = String(rawStatus).trim().toLowerCase();
  
  if (['approved', 'aprobada'].includes(s)) return 'approved';
  if (['enrolled', 'cursando', 'inscrita'].includes(s)) return 'enrolled';
  if (['planned', 'planeada'].includes(s)) return 'planned';
  // Lógica para detectar Reprobada (Failed)
  if (['failed', 'reprobada'].includes(s)) return 'failed';

  return 'pending';
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ data, status, onClick }) => {
  const { subject_code, subject, progress } = data;
  const name = subject?.name || "Asignatura Desconocida";
  const credits = subject?.credits || 0;
  
  const cssClass = mapStatusToClass(status);
  
  const isEnrolled = cssClass === 'enrolled';
  const isFailed = cssClass === 'failed';
  const isApproved = cssClass === 'approved';
  
  const grade = progress?.final_grade;
  const hasGrade = grade !== undefined && grade !== null;

  return (
    <div 
      className={`subject-card ${cssClass}`} 
      onClick={onClick}
      title={name}
    >
      <div className="card-header-sc">
        <span className="subject-code">{subject_code}</span>
        {isFailed && <span style={{fontSize:'0.9rem', fontWeight:'bold', color: '#b91c1c'}}>✕</span>}
        {isApproved && <span style={{fontSize:'0.9rem', fontWeight:'bold', color: '#047857'}}>✓</span>}
        {isEnrolled && <span style={{fontSize:'0.9rem', fontWeight:'bold', color: '#1d4ed8'}}>⏱</span>}
      </div>
      
      <div className="card-body-sc">
        <h4 className="subject-name">{name}</h4>
      </div>

      <div className="card-footer-sc">
        <span className="left-indicator">
            {isEnrolled ? (
                <span className="cursando-badge">CURSANDO</span>
            ) : hasGrade ? (
                <span className="grade-display" style={{ fontWeight: 800 }}>
                    Nota: {Number(grade).toFixed(1)}
                </span>
            ) : (
                isFailed ? <span style={{fontSize:'0.7rem', color:'#b91c1c', fontWeight:700}}>REPROBADA</span> : null
            )}
        </span>

        <span className="credits-badge">{credits} Créditos</span>
      </div>
    </div>
  );
};
