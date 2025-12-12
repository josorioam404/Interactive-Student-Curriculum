import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CurriculumGrid from '../../components/curriculum/CurriculumGrid';

const mockCurriculum = [
  {
    id: 1,
    subject_code: 'MATH101',
    suggested_semester: 1,
    component: 'Core',
    is_obligatory: true,
    subject: {
      name: 'Calculus I',
      credits: 4,
      weekly_hours: 6,
      description: 'Introduction to calculus'
    },
    progress: {
      status: 'Completed',
      final_grade: 4.2
    }
  }
];

describe('CurriculumGrid', () => {
  it('renders curriculum subjects correctly', () => {
    render(<CurriculumGrid curriculum={mockCurriculum} onSubjectUpdate={vi.fn()} />);
    
    expect(screen.getByText('Calculus I')).toBeInTheDocument();
    expect(screen.getByText('MATH101')).toBeInTheDocument();
  });

  it('calls onSubjectUpdate when subject is clicked', () => {
    const mockUpdate = vi.fn();
    render(<CurriculumGrid curriculum={mockCurriculum} onSubjectUpdate={mockUpdate} />);
    
    const mathSubject = screen.getByText('Calculus I');
    fireEvent.click(mathSubject);
    
    expect(mockUpdate).toHaveBeenCalledWith(mockCurriculum[0]);
  });
});