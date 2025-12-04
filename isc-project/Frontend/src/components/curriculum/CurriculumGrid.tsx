import React from 'react';
import type { StudyPlanItem, SubjectStatus } from '../../types';
import { SubjectCard } from './SubjectCard'; 
import './CurriculumGrid.css';

// Define las propiedades requeridas para la grilla
interface CurriculumGridProps {
  items: StudyPlanItem[];
  onSubjectClick?: (item: StudyPlanItem) => void;
  getSubjectStatus: (item: StudyPlanItem) => SubjectStatus;
}

export const CurriculumGrid: React.FC<CurriculumGridProps> = ({ items, onSubjectClick, getSubjectStatus }) => {
  // Genera un arreglo de identificadores para los 10 semestres
  const semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  // Filtra las materias correspondientes a un semestre específico
  const getSubjectsBySemester = (sem: number) => {
    return items.filter(item => item.suggested_semester === sem);
  };

  return (
    <div className="grid-container">
      <div className="grid-track">
        {/* Itera sobre los semestres para crear las columnas */}
        {semesters.map((semester) => {
            const semesterSubjects = getSubjectsBySemester(semester);
            
            return (
              <div key={semester} className="semester-column">
                <div className="semester-header">
                  Semestre {semester}
                </div>

                {/* Renderiza tarjetas de materias o un placeholder vacío */}
                {semesterSubjects.length > 0 ? (
                  semesterSubjects.map((item) => (
                    <SubjectCard
                      key={item.id}
                      data={item}
                      status={getSubjectStatus(item)}
                      onClick={() => onSubjectClick && onSubjectClick(item)}
                    />
                  ))
                ) : (
                  <div className="empty-semester">
                    Sin asignaturas
                  </div>
                )}
              </div>
            );
        })}
      </div>
    </div>
  );
};

