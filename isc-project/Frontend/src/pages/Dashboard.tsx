import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, User, Plus } from 'lucide-react';
import { CurriculumGrid } from '../components/curriculum/CurriculumGrid';
import { SubjectDetailModal } from '../components/curriculum/SubjectDetailModal';
import { AddSubjectModal } from '../components/curriculum/AddSubjectModal';
import { mockCurriculum } from '../data/mockCurriculum';
import { allCurricula } from '../data/allCurricula'; 
import type { StudyPlanItem } from '../types';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  // --- ESTADOS ---
  const [viewMode, setViewMode] = useState<'recommended' | 'custom'>('recommended');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customSubjects, setCustomSubjects] = useState<StudyPlanItem[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); 
  
  const [selectedSubject, setSelectedSubject] = useState<StudyPlanItem | null>(null);
  const [curriculum, setCurriculum] = useState<StudyPlanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL;

  // --- CARGA DE DATOS LOCALES ---
  useEffect(() => {
    const savedCustom = localStorage.getItem('myCustomSubjects');
    if (savedCustom) {
      try { setCustomSubjects(JSON.parse(savedCustom)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveCustomSubject = (newSubject: StudyPlanItem) => {
    const updated = [...customSubjects, newSubject];
    setCustomSubjects(updated);
    localStorage.setItem('myCustomSubjects', JSON.stringify(updated));
  };

  const isGuestUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    const user = JSON.parse(userStr);
    return user.role === 'guest';
  };

  const getToken = () => localStorage.getItem('accessToken') || '';

  // --- FETCHING DE DATOS ---
  const fetchCurriculum = async () => {
    setIsLoading(true);
    setError(''); 
    let baseCurriculum: StudyPlanItem[] = [];

    if (isGuestUser()) {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const programCode = user?.programCode;

      if (programCode && allCurricula[programCode]) {
        baseCurriculum = allCurricula[programCode];
      } else {
        baseCurriculum = mockCurriculum; 
      }
    } else {
      const token = getToken();
      if (!token) { setIsLoading(false); return; }

      try {
        const response = await fetch(`${PYTHON_API_URL}/student/curriculum`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Fallo al obtener la malla curricular real');

        const data = await response.json();
        baseCurriculum = data.curriculum || [];
      } catch (err: any) {
        console.error('Error fetching curriculum:', err);
        setError('No se pudo conectar con la Base de Datos. Mostrando datos locales.');
        baseCurriculum = mockCurriculum;
      }
    }
    
    setCurriculum(baseCurriculum);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCurriculum();
  }, []);

  // --- LÓGICA DE VISUALIZACIÓN ---
  const itemsToDisplay = useMemo(() => {
    return viewMode === 'recommended' ? curriculum : [...curriculum, ...customSubjects];
  }, [viewMode, curriculum, customSubjects]);

  // --- LÓGICA DE ESTADO MEJORADA (AQUÍ ESTÁ EL CAMBIO IMPORTANTE) ---
  const getSubjectStatus = (item: StudyPlanItem): string => {
    const status = item.progress?.status;
    const grade = item.progress?.final_grade;

    // Si está Completada PERO la nota es < 3.0, es REPROBADA
    if (status === 'Completed') {
        if (grade !== undefined && grade !== null && grade < 3.0) {
            return 'failed'; 
        }
        return 'approved';
    }

    // Casos estándar
    if (status === 'Enrolled') return 'enrolled';
    if (status === 'Planned') return 'planned';
    if (status === 'Approved') return 'approved';
    
    return 'pending';
  };

  const filteredItems = useMemo(() => {
    return itemsToDisplay.filter(item => {
      const name = item.subject?.name ?? '';
      const code = item.subject_code ?? '';
      
      const matchesSearch = 
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const typeStr = (item.component || item.subject?.component_type || '').toLowerCase();
      const filterLower = filterType.toLowerCase();
      const matchesType = filterType === 'all' || typeStr.includes(filterLower);

      const currentStatus = getSubjectStatus(item);
      const matchesStatus = filterStatus === 'all' || currentStatus === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [itemsToDisplay, searchTerm, filterType, filterStatus]);

  // --- CÁLCULO DE MÉTRICAS ---
  const metrics = useMemo(() => {
    // Solo contamos las materias REALMENTE APROBADAS (nota >= 3.0)
    const completed = itemsToDisplay.filter(i => {
        const grade = i.progress?.final_grade;
        return i.progress?.status === 'Completed' && (grade === undefined || grade === null || grade >= 3.0);
    });
    
    const creditsCompleted = completed.reduce((sum, i) => sum + (i.subject?.credits || 0), 0);
    const totalCreditsProgram = 160; 
    
    const gradedSubjects = completed.filter(i => i.progress?.final_grade !== undefined && i.progress?.final_grade !== null);
    
    let sumGrades = 0;
    let sumWeighted = 0;
    let sumCreditsGraded = 0;

    gradedSubjects.forEach(sub => {
      const grade = sub.progress!.final_grade!;
      const credits = sub.subject?.credits || 0;
      
      sumGrades += grade;
      sumWeighted += (grade * credits);
      sumCreditsGraded += credits;
    });

    const pa = gradedSubjects.length > 0 ? (sumGrades / gradedSubjects.length) : 0;
    const papa = sumCreditsGraded > 0 ? (sumWeighted / sumCreditsGraded) : 0;
    const percentage = Math.min((creditsCompleted / totalCreditsProgram) * 100, 100);

    return { creditsCompleted, totalCreditsProgram, percentage, pa, papa };
  }, [itemsToDisplay]);

  const handleProgressUpdate = async () => {
    await fetchCurriculum();
  };

  if (isLoading) return <div className="dashboard-container"><div style={{padding: '40px', textAlign: 'center'}}>Cargando malla...</div></div>;

  return (
    <div className="dashboard-container">
      
      {/* MÉTRICAS */}
      <section className="metrics-panel">
        <div className="metric-card">
          <span className="metric-label">Créditos Cursados</span>
          <div className="flex items-end gap-2">
            <span className="metric-value">{metrics.creditsCompleted}</span>
            <span className="metric-subtext">de {metrics.totalCreditsProgram}</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${metrics.percentage}%` }}></div>
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-label">Avance Total</span>
          <span className="metric-value">{metrics.percentage.toFixed(1)}%</span>
          <div className="progress-container">
            <div className="progress-bar blue" style={{ width: `${metrics.percentage}%` }}></div>
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-label">P.A. (Global)</span>
          <span className="metric-value">{metrics.pa.toFixed(2)}</span>
          <span className="metric-subtext">Promedio Aritmético</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">P.A.P.A.</span>
          <span className="metric-value">{metrics.papa.toFixed(2)}</span>
          <span className="metric-subtext">Promedio Ponderado</span>
        </div>
      </section>

      {error && (
        <div style={{margin: '0 0 15px', padding: '10px 15px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '0.9rem'}}>
          ⚠️ {error}
        </div>
      )}

      {/* TOOLBAR */}
      <section className="toolbar-container">
        <div style={{ display: 'flex', gap: '10px', marginRight: 'auto', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setViewMode('recommended')}
            className={`view-toggle-btn ${viewMode === 'recommended' ? 'active' : ''}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer',
              border: viewMode === 'recommended' ? '2px solid var(--unal-red)' : '1px solid #ddd',
              backgroundColor: viewMode === 'recommended' ? '#fff0f0' : 'white',
              color: viewMode === 'recommended' ? 'var(--unal-red)' : '#666',
              transition: 'all 0.2s'
            }}
          >
            <Grid size={18} /> <span className="hidden-mobile">Malla Recomendada</span>
          </button>

          <button 
            onClick={() => setViewMode('custom')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer',
              border: viewMode === 'custom' ? '2px solid var(--unal-red)' : '1px solid #ddd',
              backgroundColor: viewMode === 'custom' ? '#fff0f0' : 'white',
              color: viewMode === 'custom' ? 'var(--unal-red)' : '#666',
              transition: 'all 0.2s'
            }}
          >
            <User size={18} /> <span className="hidden-mobile">Mi Malla</span>
          </button>
        </div>

        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar materia..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-group">
            {viewMode === 'custom' && (
                <button 
                onClick={() => setIsAddModalOpen(true)}
                style={{
                    backgroundColor: 'var(--unal-dark)', color: 'white', border: 'none', borderRadius: '6px', padding: '10px 16px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
                >
                <Plus size={18} /> <span className="hidden-mobile">Agregar</span>
                </button>
            )}

          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--unal-gray)' }}>
            <Filter size={20} />
          </div>

          <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">Tipos</option>
            <option value="fundamenta">Fundamentación</option>
            <option value="disciplinar">Disciplinar</option>
            <option value="libre">Libre Elección</option>
            <option value="nivelaci">Nivelación</option>
          </select>

          <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Estados</option>
            <option value="approved">Aprobada</option>
            <option value="failed">Reprobada</option> {/* Agregamos opción de filtro */}
            <option value="enrolled">Inscrita</option>
            <option value="planned">Planeada</option>
            <option value="pending">Pendiente</option>
          </select>
        </div>
      </section>

      {/* GRID */}
      <section className="curriculum-scroll-area">
        <CurriculumGrid 
          items={filteredItems} 
          onSubjectClick={(item) => setSelectedSubject(item)}
          getSubjectStatus={(item) => getSubjectStatus(item) as any}
        />
      </section>

      <SubjectDetailModal 
        isOpen={!!selectedSubject} 
        onClose={() => setSelectedSubject(null)} 
        data={selectedSubject}
        allSubjects={itemsToDisplay} 
        onProgressUpdate={handleProgressUpdate} 
      />

      <AddSubjectModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={saveCustomSubject}
      />

    </div>
  );
};