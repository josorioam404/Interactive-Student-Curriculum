import React, { useState } from 'react';
import { X, Check, XCircle } from 'lucide-react';
import type { StudyPlanItem } from '../../types';
import './SubjectDetailModal.css';

interface SubjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: StudyPlanItem | null;
  allSubjects: StudyPlanItem[];
  onProgressUpdate?: () => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({ 
  isOpen, onClose, data, allSubjects, onProgressUpdate 
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

  const validatePrerequisites = (): { valid: boolean; missingNames: string[] } => {
    const requiredCodes = prereq_rules?.required || [];
    const missingNames: string[] = [];

    requiredCodes.forEach((reqCode: string) => {
      const reqSubject = allSubjects.find(s => s.subject_code === reqCode);
      const isCompleted = reqSubject?.progress?.status === 'Completed';
      if (!isCompleted) {
        missingNames.push(reqSubject?.subject?.name || `Código: ${reqCode}`);
      }
    });

    return { valid: missingNames.length === 0, missingNames };
  };

  const handleRegisterGrade = async () => {
    const gradeValue = parseFloat(grade);
    
    if (!grade || isNaN(gradeValue)) {
      showMessageFn('error', 'Por favor ingresa una nota válida');
      return;
    }

    if (gradeValue < 0 || gradeValue > 5) {
      showMessageFn('error', 'La nota debe estar entre 0.0 y 5.0');
      return;
    }

    // Determinamos el estado según la nota (Umbral 3.0)
    const newStatus = gradeValue >= 3.0 ? 'Completed' : 'Failed';

    // Solo validamos prerrequisitos si el estudiante intenta APROBAR la materia.
    if (newStatus === 'Completed') {
        const { valid, missingNames } = validatePrerequisites();
        if (!valid) {
          showMessageFn('error', `No puedes aprobar. Faltan prerrequisitos: ${missingNames.join(', ')}.`);
          return;
        }
    }

    setIsSaving(true);

    // LÓGICA PARA INVITADOS (Simulación Local)
    if (isGuestUser()) {
      setTimeout(() => {
        if (!data.progress) {
            data.progress = { subject_code, status: newStatus, final_grade: gradeValue };
        } else {
            data.progress.status = newStatus;
            data.progress.final_grade = gradeValue;
        }

        if (newStatus === 'Completed') {
            showMessageFn('success', '¡Materia Aprobada! (Modo Invitado)');
        } else {
            showMessageFn('error', 'Materia Reprobada. (Modo Invitado)');
        }
        
        setGrade('');
        setIsSaving(false);
        
        if (onProgressUpdate) {
          setTimeout(() => { onClose(); }, 1500);
        }
      }, 500);
      return;
    }

    // LÓGICA REAL (Backend)
    const token = getToken();

    try {
      const response = await fetch(
        `${PYTHON_API_URL}/student/progress?subject_code=${subject_code}&status=${newStatus}&final_grade=${gradeValue}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Parse response body to get error details
      const responseData = await response.json();

      if (!response.ok) {
        // Extract the detailed error message from the backend
        const errorMessage = responseData.detail || 'Error al actualizar el progreso';
        throw new Error(errorMessage);
      }

      if (newStatus === 'Completed') {
        showMessageFn('success', 'Calificación registrada: APROBADA');
      } else {
        showMessageFn('error', 'Calificación registrada: REPROBADA');
      }
      
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
      if (!isGuestUser()) setIsSaving(false);
    }
  };

  const prerequisites = Array.isArray(prereq_rules?.required) ? prereq_rules!.required : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{displayData.name}</h2>
            <span className="modal-subtitle">Código: {subject_code}</span>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        {message.text && (
          <div style={{
            padding: '12px',
            margin: '0 24px 16px',
            borderRadius: '6px',
            backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: message.type === 'success' ? '#065f46' : '#991b1b',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem'
          }}>
            {message.type === 'success' && <Check size={16} />}
            {message.type === 'error' && <XCircle size={16} />} 
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
                <span className="info-label">Estado:</span>
                <span className="info-value" style={{
                    color: displayData.currentStatus === 'Completed' ? 'green' : 
                           displayData.currentStatus === 'Failed' ? 'red' : 'inherit'
                }}>
                    {displayData.currentStatus === 'Completed' ? 'Aprobada' : 
                     displayData.currentStatus === 'Failed' ? 'Reprobada' : 
                     displayData.currentStatus}
                </span>
              </div>
              {typeof displayData.currentGrade === "number" && (
                <div className="info-item">
                  <span className="info-label">Nota actual:</span>
                  <span className={`info-value ${displayData.currentGrade < 3 ? 'grade-fail-text' : ''}`}>
                    {displayData.currentGrade.toFixed(2)}
                  </span>
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
                  <div key={idx} className="prereq-tag">{prereq}</div>
                ))}
              </div>
            </section>
          )}

          {/* FORMULARIO */}
          {displayData.currentStatus !== 'Completed' && (
            <section className="detail-section">
              <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
                Registrar Calificación
              </h3>

              <div style={{
                display: 'flex', flexDirection: 'column', gap: '16px',
                alignItems: 'center', maxWidth: '420px', margin: '0 auto'
              }}>
                <div style={{ width: '100%' }}>
                  <label style={{display: 'block', marginBottom: '10px', fontSize: '15px', fontWeight: 600, textAlign: 'center'}}>
                    Nota final (0.0 - 5.0):
                  </label>
                  <input
                    type="number" min="0" max="5" step="0.1"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="Ej: 2.5 o 4.0"
                    style={{
                      width: '100%', padding: '14px', border: '2px solid #d1d5db',
                      borderRadius: '8px', fontSize: '18px', textAlign: 'center', fontWeight: 600
                    }}
                  />
                </div>

                <button
                  onClick={handleRegisterGrade}
                  disabled={isSaving || !grade}
                  className={!grade || isSaving ? 'btn-disabled' : parseFloat(grade) >= 3 ? 'btn-confirm-success' : 'btn-confirm-fail'}
                  style={{
                    width: '100%', padding: '14px 24px',
                    backgroundColor: !grade ? '#9ca3af' : parseFloat(grade) >= 3 ? '#16a34a' : '#dc2626',
                    color: 'white', border: 'none', borderRadius: '8px',
                    fontSize: '16px', fontWeight: 700, cursor: !grade || isSaving ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                >
                  {isSaving ? 'Guardando...' : 
                   !grade ? 'Ingresa una nota' :
                   parseFloat(grade) >= 3 ? '✓ Registrar Aprobación' : '✕ Registrar Reprobación'}
                </button>
              </div>
            </section>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-modal btn-cancel" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};
