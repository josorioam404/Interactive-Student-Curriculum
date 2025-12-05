//Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { CurriculumGrid } from '../components/curriculum/CurriculumGrid';
import { SubjectDetailModal } from '../components/curriculum/SubjectDetailModal';
import { mockCurriculum } from '../data/mockCurriculum'; 
import type { StudyPlanItem } from '../types';
import './Dashboard.css';

interface ProgressSummary {
  completedSubjects: number;
  completedCredits: number;
  totalProgramCredits: number;
  progressPercentage: number;
  gpa: number;
  papa: number;
}

export const Dashboard: React.FC = () => {
  // Gestión del estado
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState<StudyPlanItem | null>(null);
  
  // Estado de datos
  const [curriculum, setCurriculum] = useState<StudyPlanItem[]>([]);
  const [progressSummary, setProgressSummary] = useState<ProgressSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL;

  // Verificación de rol
  const isGuestUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    const user = JSON.parse(userStr);
    return user.role === 'guest';
  };

  const getToken = () => localStorage.getItem('accessToken') || '';

  // Carga de la malla curricular
  const fetchCurriculum = async () => {
    if (isGuestUser()) {
      // Modo invitado: usa datos locales
      setCurriculum(mockCurriculum);
      return;
    }

    const token = getToken();
    if (!token) {
      setError('No se encontró token de autenticación');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${PYTHON_API_URL}/student/curriculum`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Fallo al obtener la malla curricular');
      }

      const data = await response.json();
      setCurriculum(data.curriculum || []);
    } catch (err: any) {
      console.error('Error fetching curriculum:', err);
      setError(err.message || 'Error cargando la malla');
    }
  };

  // Carga del resumen de progreso
  const fetchProgressSummary = async () => {
    if (isGuestUser()) {
      // Calcular el resumen basado en el estado actual del curriculum
      const completed = curriculum.filter(item => item.progress?.status === 'Completed');
      const completedCredits = completed.reduce((sum, item) => sum + (item.subject?.credits || 0), 0);
      const totalCredits = 160; // Ajusta según tu programa
      
      // Calcular GPA y PAPA
      const gradesWithCredits = completed
        .filter(item => typeof item.progress?.final_grade === 'number')
        .map(item => ({
          grade: item.progress!.final_grade!,
          credits: item.subject?.credits || 0
        }));
      
      const totalGradePoints = gradesWithCredits.reduce((sum, g) => sum + (g.grade * g.credits), 0);
      const totalCreditsWithGrades = gradesWithCredits.reduce((sum, g) => sum + g.credits, 0);
      
      const papa = totalCreditsWithGrades > 0 ? totalGradePoints / totalCreditsWithGrades : 0;
      const gpa = gradesWithCredits.length > 0 
        ? gradesWithCredits.reduce((sum, g) => sum + g.grade, 0) / gradesWithCredits.length 
        : 0;

      setProgressSummary({
        completedSubjects: completed.length,
        completedCredits: completedCredits,
        totalProgramCredits: totalCredits,
        progressPercentage: (completedCredits / totalCredits) * 100,
        gpa: gpa,
        papa: papa
      });
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${PYTHON_API_URL}/student/progress-summary`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Fallo al obtener resumen de progreso');
      }

      const data = await response.json();
      setProgressSummary(data);
    } catch (err: any) {
      console.error('Error fetching progress:', err);
    }
  };

  // Efecto de carga inicial
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchCurriculum();
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Recalcular el resumen cuando cambia el curriculum
  useEffect(() => {
    if (curriculum.length > 0) {
      fetchProgressSummary();
    }
  }, [curriculum]);

  // Helpers de estado y filtros
  const getSubjectStatus = (item: StudyPlanItem): 'approved' | 'enrolled' | 'planned' | 'pending' => {
    const status = item.progress?.status;
    
    if (status === 'Completed') return 'approved';
    if (status === 'Enrolled') return 'enrolled';
    if (status === 'Planned') return 'planned';
    return 'pending';
  };

  const filteredItems = curriculum.filter(item => {
    const name = item.subject?.name ?? '';
    const matchesSearch = 
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subject_code ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || (item.component ?? '') === filterType;

    const currentStatus = getSubjectStatus(item);
    const matchesStatus = filterStatus === 'all' || currentStatus === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSubjectClick = (item: StudyPlanItem) => {
    setSelectedSubject(item);
  };

  const handleCloseModal = () => {
    setSelectedSubject(null);
  };

  const handleProgressUpdate = async () => {
    if (isGuestUser()) {
      // En modo invitado, forzar la actualización del curriculum
      // Crear una copia nueva del array para forzar re-render
      setCurriculum([...curriculum]);
      return;
    }

    await Promise.all([
      fetchCurriculum(),
      fetchProgressSummary()
    ]);
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          fontSize: '18px',
          color: 'var(--color-unal-gray)'
        }}>
          Cargando malla curricular...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div style={{ 
          padding: '20px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          color: '#991b1b'
        }}>
          Error: {error}
        </div>
      </div>
    );
  }

  const safeProgressPercentage = progressSummary?.progressPercentage ?? 0;
  const safeGpa = progressSummary?.gpa ?? 0;
  const safePapa = progressSummary?.papa ?? 0;
  const safeCompletedCredits = progressSummary?.completedCredits ?? 0;
  const safeTotalProgramCredits = progressSummary?.totalProgramCredits ?? 180;

  return (
    <div className="dashboard-container">
      
      <section className="metrics-panel">
        <div className="metric-card">
          <span className="metric-label">Créditos Cursados</span>
          <div className="flex items-end gap-2">
            <span className="metric-value">
              {safeCompletedCredits}
            </span>
            <span className="metric-subtext mb-1">
              de {safeTotalProgramCredits}
            </span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${safeProgressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-label">Avance Total</span>
          <span className="metric-value">
            {(safeProgressPercentage).toFixed(1)}%
          </span>
          <div className="progress-container">
            <div 
              className="progress-bar blue" 
              style={{ width: `${safeProgressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-label">P.A. (Global)</span>
          <span className="metric-value">
            {safeGpa.toFixed(2)}
          </span>
          <span className="metric-subtext">Promedio Aritmético</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">P.A.P.A.</span>
          <span className="metric-value">
            {safePapa.toFixed(2)}
          </span>
          <span className="metric-subtext">Promedio Ponderado</span>
        </div>
      </section>

      <section className="toolbar-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar materia por código o nombre..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-unal-gray)' }}>
            <Filter size={20} />
          </div>

          <select 
            className="filter-select" 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Todos los Tipos</option>
            <option value="Foundational">Fundamentación</option>
            <option value="Disciplinary">Disciplinar</option>
            <option value="Free Elective">Libre Elección</option>
            <option value="Leveling">Nivelación</option>
          </select>

          <select 
            className="filter-select" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos los Estados</option>
            <option value="approved">Aprobada (Verde)</option>
            <option value="enrolled">Inscrita (Azul)</option>
            <option value="planned">Planeada (Azul Claro)</option>
            <option value="pending">Pendiente (Gris)</option>
          </select>
        </div>
      </section>

      <section className="curriculum-scroll-area">
        <CurriculumGrid 
          items={filteredItems} 
          onSubjectClick={handleSubjectClick}
          getSubjectStatus={getSubjectStatus}
        />
      </section>

      <SubjectDetailModal 
        isOpen={!!selectedSubject} 
        onClose={handleCloseModal} 
        data={selectedSubject}
        allSubjects={curriculum}
        onProgressUpdate={handleProgressUpdate}
      />

    </div>
  );
};

