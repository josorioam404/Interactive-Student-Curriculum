import React from 'react';
import type { StudyPlanItem, SubjectStatus } from '../../types';
import { SubjectCard } from './SubjectCard'; 
import './CurriculumGrid.css';

interface CurriculumGridProps {
  items: StudyPlanItem[];
  // Nueva prop opcional para manejar el click
  onSubjectClick?: (item: StudyPlanItem) => void;
}

export const CurriculumGrid: React.FC<CurriculumGridProps> = ({ items, onSubjectClick }) => {
  const semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  const getSubjectsBySemester = (sem: number) => {
    return items.filter(item => item.suggested_semester === sem);
  };

  const getSubjectStatus = (sem: number): SubjectStatus => {
    if (sem < 2) return 'approved';
    if (sem === 2) return 'enrolled';
    if (sem === 3) return 'planned';
    return 'pending';
  };

  return (
    <div className="grid-container">
      <div className="grid-track">
        {semesters.map((semester) => {
            const semesterSubjects = getSubjectsBySemester(semester);
            
            return (
              <div key={semester} className="semester-column">
                <div className="semester-header">
                  Semestre {semester}
                </div>

                {semesterSubjects.length > 0 ? (
                  semesterSubjects.map((item) => (
                    <SubjectCard
                      key={item.id}
                      data={item}
                      status={getSubjectStatus(semester)}
                      // Aquí llamamos a la función que nos pasó el Dashboard
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