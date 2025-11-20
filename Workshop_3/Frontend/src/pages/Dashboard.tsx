import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CurriculumGrid } from '../components/curriculum/CurriculumGrid';
import { SubjectDetailModal } from '../components/curriculum/SubjectDetailModal';
import { mockCurriculum } from '../data/mockCurriculum';
import type { StudyPlanItem } from '../types';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState<StudyPlanItem | null>(null);

  // Función auxiliar para determinar el estado (Simulación temporal igual que en la Grilla)
  // Cuando integremos el Backend, este estado vendrá directo en el objeto 'item'
  const getSimulatedStatus = (sem: number) => {
    if (sem < 2) return 'approved';
    if (sem === 2) return 'enrolled';
    if (sem === 3) return 'planned';
    return 'pending';
  };

  const filteredItems = mockCurriculum.filter(item => {
    // 1. Filtro de Búsqueda
    const matchesSearch = 
      (item.subject?.name.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      item.subject_code.includes(searchTerm);
    
    // 2. Filtro por Tipo (Componente)
    const matchesType = filterType === 'all' || item.component === filterType;

    // 3. Filtro por Estado (AHORA SÍ ES FUNCIONAL CON LA SIMULACIÓN)
    const currentStatus = getSimulatedStatus(item.suggested_semester);
    const matchesStatus = filterStatus === 'all' || currentStatus === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSubjectClick = (item: StudyPlanItem) => {
    setSelectedSubject(item);
  };

  const handleCloseModal = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="dashboard-container">
      
      {/* 1. PANEL DE MÉTRICAS (CORREGIDO) */}
      <section className="metrics-panel">
        <div className="metric-card">
          <span className="metric-label">Créditos Cursados</span>
          <div className="flex items-end gap-2">
            <span className="metric-value">20</span>
            <span className="metric-subtext mb-1">de 180</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: '11%' }}></div>
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-label">Avance Total</span>
          <span className="metric-value">11%</span>
          <div className="progress-container">
             <div className="progress-bar blue" style={{ width: '11%' }}></div>
          </div>
        </div>

        {/* TERMINOLOGÍA CORREGIDA AQUÍ */}
        <div className="metric-card">
          <span className="metric-label">P.A. (Global)</span>
          <span className="metric-value">4.25</span>
          <span className="metric-subtext">Promedio Aritmético</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">P.A.P.A.</span>
          <span className="metric-value">4.18</span>
          <span className="metric-subtext">Promedio Ponderado</span>
        </div>
      </section>

      {/* 2. BARRA DE HERRAMIENTAS */}
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
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--unal-gray)' }}>
             <Filter size={20} />
          </div>

          <select 
            className="filter-select" 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Todos los Tipos</option>
            <option value="fundamentacion">Fundamentación</option>
            <option value="disciplinar">Disciplinar</option>
            <option value="libre">Libre Elección</option>
          </select>

          {/* FILTRO DE ESTADOS AHORA FUNCIONAL */}
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

      {/* 3. ZONA DE MALLA */}
      <section className="curriculum-scroll-area">
        <CurriculumGrid 
            items={filteredItems} 
            onSubjectClick={handleSubjectClick} 
        />
      </section>

      {/* 4. MODAL */}
      <SubjectDetailModal 
        isOpen={!!selectedSubject} 
        onClose={handleCloseModal} 
        data={selectedSubject} 
      />

    </div>
  );
};