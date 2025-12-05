//SubjectDetailModal.tsx

import React, { useState } from 'react';
import { X, AlertTriangle, Check } from 'lucide-react';
import type { StudyPlanItem } from '../../types';
import './SubjectDetailModal.css';

interface SubjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: StudyPlanItem | null;
  allSubjects: StudyPlanItem[]; // Recibimos todas las materias para buscar los prerrequisitos
  onProgressUpdate?: () => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  data, 
  allSubjects, 
  onProgressUpdate 
}) => {
  const [grade, setGrade] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL;  

  if (!isOpen || !data) return null;

  const { subject_code, subject, progress, prereq_rules } = data;

  const displayData = {
    name: subject?.name || "Asignatura Desconocida",
    credits: subject?.credits || 0,
    weeklyHours: subject?.weekly_hours || 0,
    description: subject?.description || "Sin descripción disponible",
    currentStatus: progress?.status || 'Not Taken',
    currentGrade: progress?.final_grade
  };

  const getToken = () => localStorage.getItem('accessToken') || '';

  const isGuestUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    const user = JSON.parse(userStr);
    return user.role === 'guest';
  };

  const showMessageFn = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  // --- LÓGICA DE VALIDACIÓN DE PRERREQUISITOS ---
  const validatePrerequisites = (): { valid: boolean; missingNames: string[] } => {
    // Obtenemos los códigos requeridos (asegurando que sea un array)
    const requiredCodes = prereq_rules?.required || [];
    const missingNames: string[] = [];

    requiredCodes.forEach((reqCode: string) => {
      // Buscamos la materia prerrequisito en la lista completa
      const reqSubject = allSubjects.find(s => s.subject_code === reqCode);
      
      // Verificamos si existe y si su estado es 'Completed'
      // El backend debe entregar el estado 'Completed' cuando una materia se ha aprobado
      const isCompleted = reqSubject?.progress?.status === 'Completed';

      if (!isCompleted) {
        // Guardamos el nombre para mostrárselo al usuario
        missingNames.push(reqSubject?.subject?.name || `Código: ${reqCode}`);
      }
    });

    return { 
      valid: missingNames.length === 0, 
      missingNames 
    };
  };

  const handleMarkCompleted = async () => {
    const gradeValue = parseFloat(grade);
    
    if (!grade || isNaN(gradeValue)) {
      showMessageFn('error', 'Por favor ingresa una nota válida');
      return;
    }

    if (gradeValue < 0 || gradeValue > 5) {
      showMessageFn('error', 'La nota debe estar entre 0.0 y 5.0');
      return;
    }

    // 1. VALIDAMOS PRERREQUISITOS ANTES DE CUALQUIER ACCIÓN
    const { valid, missingNames } = validatePrerequisites();
    
    if (!valid) {
      showMessageFn('error', `No puedes aprobar esta materia. Debes aprobar primero: ${missingNames.join(', ')}.`);
      return;
    }

    setIsSaving(true);

    // LÓGICA PARA INVITADOS (Simulación Local)
    if (isGuestUser()) {
      setTimeout(() => {
        // Simulamos la aprobación actualizando el objeto localmente para que la UI responda
        if (!data.progress) {
            data.progress = { subject_code, status: 'Completed', final_grade: gradeValue };
        } else {
            data.progress.status = 'Completed';
            data.progress.final_grade = gradeValue;
        }

        showMessageFn('success', 'Materia aprobada (Modo Invitado)');
        setGrade('');
        setIsSaving(false);
        
        if (onProgressUpdate) {
          setTimeout(() => {
            onClose(); 
          }, 1500);
        }
      }, 1000);
      return;
    }

    // LÓGICA REAL (Backend)
    const token = getToken();

    try {
      const response = await fetch(
        `${PYTHON_API_URL}/student/progress?subject_code=${subject_code}&status=Completed&final_grade=${gradeValue}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error('Error al actualizar el progreso');

      showMessageFn('success', 'Materia marcada como aprobada');
      setGrade('');

      if (onProgressUpdate) {
        setTimeout(() => {
          onProgressUpdate();
          onClose();
        }, 1500);
      }
    } catch (error: any) {
      console.error('Error:', error);
      showMessageFn('error', error.message || 'Error al guardar');
    } finally {
      if (!isGuestUser()) {
        setIsSaving(false);
      }
    }
  };

  const prerequisites = Array.isArray(prereq_rules?.required)
    ? prereq_rules!.required
    : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{displayData.name}</h2>
            <span className="modal-subtitle">Código: {subject_code}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {message.text && (
          <div style={{
            padding: '12px',
            margin: '0 24px 16px',
            borderRadius: '6px',
            backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: message.type === 'success' ? '#065f46' : '#991b1b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem'
          }}>
            {message.type === 'success' && <Check size={16} style={{flexShrink: 0}} />}
            {message.type === 'error' && <AlertTriangle size={16} style={{flexShrink: 0}} />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="modal-content">

          <section className="detail-section">
            <h3 className="section-title">Información General</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Créditos:</span>
                <span className="info-value">{displayData.credits}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Horas semanales:</span>
                <span className="info-value">{displayData.weeklyHours} h/sem</span>
              </div>

              <div className="info-item">
                <span className="info-label">Estado actual:</span>
                <span className="info-value">{displayData.currentStatus}</span>
              </div>

              {typeof displayData.currentGrade === "number" && (
                <div className="info-item">
                  <span className="info-label">Nota actual:</span>
                  <span className="info-value">{displayData.currentGrade.toFixed(2)}</span>
                </div>
              )}
            </div>
          </section>

          <section className="detail-section">
            <h3 className="section-title">Descripción</h3>
            <p className="description-text">{displayData.description}</p>
          </section>

          {prerequisites.length > 0 && (
            <section className="detail-section">
              <h3 className="section-title">Prerrequisitos</h3>
              <div className="prereq-list">
                {prerequisites.map((prereq: string, idx: number) => (
                  <div key={idx} className="prereq-tag">
                    {prereq}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Solo mostramos el formulario si la materia NO está completada */}
          {displayData.currentStatus !== 'Completed' && (
            <section className="detail-section">
              <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
                Marcar como Aprobada
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'center',
                maxWidth: '420px',
                margin: '0 auto'
              }}>
                <div style={{ width: '100%' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--color-unal-dark)',
                      textAlign: 'center'
                    }}
                  >
                    Nota final (0.0 - 5.0):
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="Ej: 4.5"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '18px',
                      textAlign: 'center',
                      fontWeight: 600
                    }}
                  />
                </div>

                <button
                  onClick={handleMarkCompleted}
                  disabled={isSaving || !grade}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    backgroundColor: !grade || isSaving ? '#9ca3af' : '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: !grade || isSaving ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSaving ? 'Guardando...' : '✓ Marcar Aprobada'}
                </button>
                
                {isGuestUser() && (
                  <small style={{ color: 'var(--color-unal-gray)', marginTop: '-8px' }}>
                    Modo invitado: Los cambios no se guardarán permanentemente.
                  </small>
                )}
              </div>
            </section>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-modal btn-cancel" onClick={onClose}>
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};

