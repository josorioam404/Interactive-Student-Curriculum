import { render, screen, fireEvent } from '@testing-library/react';
import { CurriculumGrid } from '../curriculum/CurriculumGrid';

const mockCurriculum = [
  {
    id: '1',
    name: 'Matemáticas I',
    credits: 4,
    semester: 1,
    status: 'completed' as const,
    grade: 4.2,
    prerequisites: []
  },
  {
    id: '2',
    name: 'Programación I',
    credits: 3,
    semester: 1,
    status: 'available' as const,
    prerequisites: []
  },
  {
    id: '3',
    name: 'Matemáticas II',
    credits: 4,
    semester: 2,
    status: 'locked' as const,
    prerequisites: ['1']
  }
];

describe('CurriculumGrid', () => {
  test('renders curriculum subjects correctly', () => {
    render(<CurriculumGrid curriculum={mockCurriculum} onSubjectClick={() => {}} />);
    
    expect(screen.getByText('Matemáticas I')).toBeInTheDocument();
    expect(screen.getByText('Programación I')).toBeInTheDocument();
    expect(screen.getByText('Matemáticas II')).toBeInTheDocument();
  });

  test('displays subject credits correctly', () => {
    render(<CurriculumGrid curriculum={mockCurriculum} onSubjectClick={() => {}} />);
    
    expect(screen.getByText('4 créditos')).toBeInTheDocument();
    expect(screen.getByText('3 créditos')).toBeInTheDocument();
  });

  test('shows completed status with grade', () => {
    render(<CurriculumGrid curriculum={mockCurriculum} onSubjectClick={() => {}} />);
    
    expect(screen.getByText('4.2')).toBeInTheDocument();
  });

  test('calls onSubjectClick when subject is clicked', () => {
    const mockOnClick = jest.fn();
    render(<CurriculumGrid curriculum={mockCurriculum} onSubjectClick={mockOnClick} />);
    
    fireEvent.click(screen.getByText('Matemáticas I'));
    
    expect(mockOnClick).toHaveBeenCalledWith(mockCurriculum[0]);
  });

  test('groups subjects by semester correctly', () => {
    render(<CurriculumGrid curriculum={mockCurriculum} onSubjectClick={() => {}} />);
    
    expect(screen.getByText('Semestre 1')).toBeInTheDocument();
    expect(screen.getByText('Semestre 2')).toBeInTheDocument();
  });

  test('applies correct CSS classes for different statuses', () => {
    render(<CurriculumGrid curriculum={mockCurriculum} onSubjectClick={() => {}} />);
    
    const completedSubject = screen.getByText('Matemáticas I').closest('.subject-card');
    const availableSubject = screen.getByText('Programación I').closest('.subject-card');
    const lockedSubject = screen.getByText('Matemáticas II').closest('.subject-card');
    
    expect(completedSubject).toHaveClass('completed');
    expect(availableSubject).toHaveClass('available');
    expect(lockedSubject).toHaveClass('locked');
  });
});