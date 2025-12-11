import React, { useMemo } from 'react';
import type { StudyPlanItem, SubjectStatus } from '../../types';
import { SubjectCard } from './SubjectCard'; 
import './CurriculumGrid.css';

interface CurriculumGridProps {
  items: StudyPlanItem[];
  onSubjectClick?: (item: StudyPlanItem) => void;
  getSubjectStatus: (item: StudyPlanItem) => SubjectStatus;
}

export const CurriculumGrid: React.FC<CurriculumGridProps> = ({ items, onSubjectClick, getSubjectStatus }) => {
  const semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  // 1. CALCULAMOS QUÉ MATERIAS YA APROBASTE
  const completedCodes = useMemo(() => {
    const codes = new Set<string>();
    items.forEach(item => {
      const status = getSubjectStatus(item);
      // Incluimos Completed y Approved
      if (status === 'approved' || String(item.progress?.status) === 'Completed') {
        codes.add(String(item.subject_code));
      }
    });
    return codes;
  }, [items, getSubjectStatus]);

  // 2. FUNCIÓN DE RECOMENDACIÓN (VISIBILIDAD)
  const isSubjectVisible = (item: StudyPlanItem) => {
    const status = getSubjectStatus(item);
    
    // A) Si ya tienes historial con ella (Inscrita, Reprobada, Aprobada), SIEMPRE mostrarla.
    if (status !== 'pending' && status !== 'error' && item.progress?.status !== 'Not Taken') {
        return true;
    }

    // B) Semestre 1 siempre visible (Inicio de la malla)
    if (item.suggested_semester === 1) return true;

    // C) VERIFICAR PRERREQUISITOS
    const reqs = item.prereq_rules?.required || [];
    
    // Si no tiene requisitos, mostrarla
    if (reqs.length === 0) return true;

    // Verificar si TODOS los requisitos están en la lista de aprobadas
    const allReqsMet = reqs.every((reqCode: string) => completedCodes.has(String(reqCode)));
    
    return allReqsMet;
  };

  const getSubjectsBySemester = (sem: number) => {
    return items.filter(item => item.suggested_semester === sem);
  };

  return (
    <div className="grid-container">
      <div className="grid-track">
        {semesters.map((semester) => {
            const semesterSubjects = getSubjectsBySemester(semester);
            
            // FILTRADO INTELIGENTE
            const visibleSubjects = semesterSubjects.filter(isSubjectVisible);

            return (
              <div key={semester} className="semester-column">
                <div className="semester-header">
                  Semestre {semester}
                </div>

                {visibleSubjects.length > 0 ? (
                  visibleSubjects.map((item) => (
                    <SubjectCard
                      key={item.id}
                      data={item}
                      status={getSubjectStatus(item)}
                      onClick={() => onSubjectClick && onSubjectClick(item)}
                    />
                  ))
                ) : (
                  <div className="empty-semester">
                    {semesterSubjects.length > 0 
                        ? <span style={{fontSize:'0.8rem', color:'#999'}}>Bloqueado por requisitos</span> 
                        : "Sin asignaturas"}
                  </div>
                )}
              </div>
            );
        })}
      </div>
    </div>
  );
};