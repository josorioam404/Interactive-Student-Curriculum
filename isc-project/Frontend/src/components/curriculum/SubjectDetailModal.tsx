import React, { useState } from 'react';
import { X, Check, XCircle, BookOpen, Save, RotateCcw } from 'lucide-react';
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
  const UNAL_RED = '#94191c';

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

  // --- LÓGICA DE ESTADOS ---
  const isEnrolled = displayData.currentStatus === 'Enrolled';
  
  // Aprobada: Está completada Y nota >= 3.0
  const isPassed = (displayData.currentStatus === 'Completed' || displayData.currentStatus === 'Approved') && 
                   (displayData.currentGrade === undefined || displayData.currentGrade === null || displayData.currentGrade >= 3.0);

  // Reprobada: Está completada PERO nota < 3.0
  const isFailed = (displayData.currentStatus === 'Completed' || displayData.currentStatus === 'Failed') && 
                   (displayData.currentGrade !== undefined && displayData.currentGrade !== null && displayData.currentGrade < 3.0);

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
      const reqSubject = allSubjects.find(s => String(s.subject_code) === String(reqCode));
      const status = reqSubject?.progress?.status;
      const grade = reqSubject?.progress?.final_grade;
      const passed = (status === 'Completed' || status === 'Approved') && (!grade || grade >= 3.0);
      
      if (!passed) {
        missingNames.push(reqSubject?.subject?.name || `Código: ${reqCode}`);
      }
    });

    return { valid: missingNames.length === 0, missingNames };
  };

  // --- GUARDADO SEGURO (SOLUCIÓN 422) ---
  const performUpdate = async (status: string, finalGrade: number | null) => {
    if (isGuestUser()) {
      setTimeout(() => {
        if (!data.progress) data.progress = { subject_code: String(subject_code), status, final_grade: finalGrade || undefined };
        else { data.progress.status = status; data.progress.final_grade = finalGrade || undefined; }
        showMessageFn('success', 'Actualizado (Invitado)');
        setGrade('');
        setIsSaving(false);
        if (onProgressUpdate) setTimeout(() => { onClose(); }, 1000);
      }, 500);
      return;
    }

    const token = getToken();
    try {
      const params = new URLSearchParams();
      params.append('subject_code', String(subject_code));
      params.append('status', status);
      
      if (finalGrade !== null && finalGrade !== undefined && !isNaN(finalGrade)) {
        params.append('final_grade', finalGrade.toString());
      }

      const url = `${PYTHON_API_URL}/student/progress?${params.toString()}`;

      const response = await fetch(url, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(`Error ${response.status}: ${errorText}`);
      }

      await response.json(); 
      showMessageFn('success', status === 'Not Taken' ? 'Materia Reiniciada' : 'Progreso Guardado');
      setGrade('');
      if (onProgressUpdate) {
        setTimeout(() => { onProgressUpdate(); onClose(); }, 1000);
      }
    } catch (error: any) {
      console.error("Error update:", error);
      showMessageFn('error', 'Error de conexión. Intenta de nuevo.');
    } finally {
      if (!isGuestUser()) setIsSaving(false);
    }
  };

  const handleEnroll = async () => {
    const { valid, missingNames } = validatePrerequisites();
    if (!valid) {
      showMessageFn('error', `Faltan requisitos: ${missingNames.join(', ')}.`);
      return;
    }
    setIsSaving(true);
    await performUpdate('Enrolled', null);
  };

  const handleRegisterGrade = async () => {
    const gradeValue = parseFloat(grade);
    if (!grade || isNaN(gradeValue) || gradeValue < 0 || gradeValue > 5) {
      showMessageFn('error', 'Ingresa una nota válida (0.0 - 5.0)');
      return;
    }
    // SIEMPRE 'Completed' para guardar la nota (incluso si reprueba)
    const newStatus = 'Completed'; 
    if (gradeValue >= 3.0) {
        const { valid, missingNames } = validatePrerequisites();
        if (!valid) {
          showMessageFn('error', `Error lógico: Faltan requisitos: ${missingNames.join(', ')}.`);
          return;
        }
    }
    setIsSaving(true);
    await performUpdate(newStatus, gradeValue);
  };

  const handleReset = async () => {
    if (!confirm("¿Deseas reiniciar esta materia? Se borrará la nota.")) return;
    setIsSaving(true);
    // Para borrar totalmente usamos 'Not Taken'
    await performUpdate('Not Taken', 0);
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
          <button className="close-btn" onClick={onClose}> <X size={24} /> </button>
        </div>

        {message.text && (
          <div style={{
            margin: '0 24px 16px', padding: '12px', borderRadius: '8px',
            backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
            color: message.type === 'success' ? '#065f46' : '#991b1b',
            border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
            display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {message.type === 'success' ? <Check size={18}/> : <XCircle size={18}/>}
            <span style={{fontWeight: 500}}>{message.text}</span>
          </div>
        )}

        <div className="modal-content">
          <section className="detail-section">
            <h3 className="section-title">Información General</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Créditos</span>
                <span className="info-value">{displayData.credits}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado Actual</span>
                <span className="info-value" style={{
                    color: isPassed ? '#10b981' : isFailed ? '#ef4444' : isEnrolled ? '#3b82f6' : 'inherit',
                    fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                    {isPassed ? '✓ Aprobada' : isFailed ? '✕ Reprobada' : isEnrolled ? '⏱ Cursando' : 'Pendiente'}
                </span>
              </div>
              {typeof displayData.currentGrade === "number" && !isEnrolled && (
                <div className="info-item">
                  <span className="info-label">Nota Definitiva</span>
                  <span className={`info-value ${displayData.currentGrade < 3 ? 'grade-fail-text' : ''}`} style={{fontSize: '1.2rem'}}>
                    {displayData.currentGrade.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="detail-section">
            <h3 className="section-title">Descripción</h3>
            <p className="description-text" style={{lineHeight: '1.6', color: '#555'}}>
              {displayData.description}
            </p>
          </section>

          {prerequisites.length > 0 && (
            <section className="detail-section">
              <h3 className="section-title">Prerrequisitos</h3>
              <div className="prereq-list">
                {prerequisites.map((prereq: string, idx: number) => (
                  <div key={idx} className="prereq-tag" style={{
                      backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb',
                      padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem'
                  }}>
                    {prereq}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACCIONES */}
          {!isPassed && !isEnrolled && (
             <div style={{ marginTop: '30px', padding: '0 20px' }}>
                <button onClick={handleEnroll} disabled={isSaving} style={{
                    width: '100%', padding: '14px', backgroundColor: UNAL_RED, color: 'white',
                    border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    boxShadow: '0 4px 6px rgba(148, 25, 28, 0.2)', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <BookOpen size={20} strokeWidth={2}/> 
                    {isSaving ? 'Procesando...' : isFailed ? 'Repetir Asignatura' : 'Inscribir Asignatura'}
                </button>
             </div>
          )}

          {(isEnrolled || isFailed) && (
            <section className="detail-section" style={{
                marginTop: '30px', backgroundColor: '#fafafa', padding: '24px',
                borderRadius: '12px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
              <h3 className="section-title" style={{border: 'none', marginBottom: '16px', textAlign: 'center'}}>
                {isEnrolled ? 'Registrar Nota Final' : 'Corregir Nota'}
              </h3>
              
              <div style={{width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <input type="number" min="0" max="5" step="0.1" value={grade} onChange={(e) => setGrade(e.target.value)}
                    placeholder="Ej: 3.5" style={{
                        width: '100%', padding: '12px', fontSize: '1.2rem', textAlign: 'center', fontWeight: 'bold',
                        borderRadius: '8px', border: '2px solid #e5e7eb', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = UNAL_RED}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <button onClick={handleRegisterGrade} disabled={isSaving || !grade} style={{
                        width: '100%', padding: '12px', backgroundColor: !grade ? '#e5e7eb' : UNAL_RED,
                        color: !grade ? '#9ca3af' : 'white', border: 'none', borderRadius: '8px', fontWeight: 600,
                        cursor: !grade ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        transition: 'background-color 0.2s'
                    }}
                  >
                    <Save size={18} /> {isSaving ? 'Guardando...' : 'Confirmar Nota'}
                  </button>
              </div>
            </section>
          )}
        </div>

        <div className="modal-actions" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: '16px', marginTop: '10px', borderTop: '1px solid #f0f0f0'
        }}>
          {displayData.currentStatus !== 'Not Taken' && displayData.currentStatus !== 'Pending' ? (
             <button onClick={handleReset} disabled={isSaving} style={{
                 background: 'transparent', border: '1px solid #ef4444', color: '#ef4444',
                 padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
                 display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 500, transition: 'background 0.2s'
               }}
               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
             >
                <RotateCcw size={16} /> Reiniciar
             </button>
          ) : <div/>} 
          
          <button className="btn-modal btn-cancel" onClick={onClose} style={{fontWeight: 500}}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};