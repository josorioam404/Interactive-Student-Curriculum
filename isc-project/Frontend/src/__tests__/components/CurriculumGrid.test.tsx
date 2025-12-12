import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CurriculumGrid } from '../../components/curriculum/CurriculumGrid';

const mockItems = [
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

const mockGetSubjectStatus = vi.fn(() => 'approved');

describe('CurriculumGrid', () => {
  it('renders curriculum grid correctly', () => {
    render(
      <CurriculumGrid 
        items={mockItems} 
        onSubjectClick={vi.fn()} 
        getSubjectStatus={mockGetSubjectStatus}
      />
    );
    
    expect(screen.getByText('Semestre 1')).toBeInTheDocument();
  });

  it('renders with empty items array', () => {
    render(
      <CurriculumGrid 
        items={[]} 
        onSubjectClick={vi.fn()} 
        getSubjectStatus={mockGetSubjectStatus}
      />
    );
    
    expect(screen.getByText('Semestre 1')).toBeInTheDocument();
  });
});