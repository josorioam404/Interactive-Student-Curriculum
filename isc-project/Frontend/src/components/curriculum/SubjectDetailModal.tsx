import React, { useState } from 'react';
import { X, Check, XCircle, BookOpen, Trash2 } from 'lucide-react';
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

  const isEnrolled = displayData.currentStatus === 'Enrolled';
  const isCompleted = displayData.currentStatus === 'Completed' || displayData.currentStatus === 'Approved';

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

  // --- VALIDACIÓN DE REQUISITOS ---
  const validatePrerequisites = (): { valid: boolean; missingNames: string[] } => {
    const requiredCodes = prereq_rules?.required || [];
    const missingNames: string[] = [];

    requiredCodes.forEach((reqCode: string) => {
      // Buscamos la materia requisito en toda la lista
      const reqSubject = allSubjects.find(s => String(s.subject_code) === String(reqCode));
      // Verificamos si está aprobada
      const status = reqSubject?.progress?.status;
      const isReqCompleted = status === 'Completed' || status === 'Approved';
      
      if (!isReqCompleted) {
        missingNames.push(reqSubject?.subject?.name || `Código: ${reqCode}`);
      }
    });

    return { valid: missingNames.length === 0, missingNames };
  };

  // --- LÓGICA DE ACTUALIZACIÓN CENTRALIZADA (SOLUCIÓN ERROR 400) ---
  const performUpdate = async (status: string, finalGrade: number | null) => {
    if (isGuestUser()) {
      // Simulación para invitado
      setTimeout(() => {
        if (!data.progress) data.progress = { subject_code: String(subject_code), status, final_grade: finalGrade || undefined };
        else { data.progress.status = status; data.progress.final_grade = finalGrade || undefined; }
        
        showMessageFn('success', status === 'Pending' ? 'Materia reiniciada' : 'Actualizado (Invitado)');
        setGrade('');
        setIsSaving(false);
        if (onProgressUpdate) setTimeout(() => { onClose(); }, 1000);
      }, 500);
      return;
    }

    const token = getToken();
    try {
      // 1. PREPARAR DATOS (Payload JSON)
      const payload = {
        subject_code: parseInt(String(subject_code), 10), // Aseguramos que sea entero
        status: status,
        final_grade: finalGrade !== null ? finalGrade : 0.0
      };

      // 2. ENVIAR COMO JSON
      const response = await fetch(`${PYTHON_API_URL}/student/progress`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' // ¡CRUCIAL!
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(`Error del servidor: ${errorText}`);
      }

      showMessageFn('success', status === 'Pending' ? 'Materia Reiniciada' : 'Progreso Guardado');
      setGrade('');
      
      if (onProgressUpdate) {
        setTimeout(() => { onProgressUpdate(); onClose(); }, 1000);
      }
    } catch (error: any) {
      console.error("Error update:", error);
      showMessageFn('error', 'No se pudo guardar. Verifica la conexión.');
    } finally {
      if (!isGuestUser()) setIsSaving(false);
    }
  };

  // --- HANDLERS DE BOTONES ---

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
    
    // Validación estricta de la nota
    if (!grade || isNaN(gradeValue) || gradeValue < 0 || gradeValue > 5) {
      showMessageFn('error', 'Ingresa una nota válida (0.0 - 5.0)');
      return;
    }

    const newStatus = gradeValue >= 3.0 ? 'Completed' : 'Failed';
    
    // Si aprueba, re-verificamos requisitos por seguridad
    if (newStatus === 'Completed') {
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
    if (!confirm("¿Seguro que quieres reiniciar esta materia? Se borrará la nota.")) return;
    setIsSaving(true);
    // 'Pending' y 0.0 limpian el registro
    await performUpdate('Pending', 0);
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
            padding: '12px', margin: '0 24px 16px', borderRadius: '6px',
            backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: message.type === 'success' ? '#065f46' : '#991b1b',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem'
          }}>
            {message.type === 'success' ? <Check size={16}/> : <XCircle size={16}/>}
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
                    color: isCompleted ? 'green' : displayData.currentStatus === 'Failed' ? 'red' : 
                           isEnrolled ? '#2563eb' : 'inherit',
                    fontWeight: 'bold'
                }}>
                    {isCompleted ? 'Aprobada' : 
                     displayData.currentStatus === 'Failed' ? 'Reprobada' : 
                     isEnrolled ? 'Inscrita (Cursando)' : 
                     'Pendiente'}
                </span>
              </div>
              {typeof displayData.currentGrade === "number" && !isEnrolled && (
                <div className="info-item">
                  <span className="info-label">Nota actual:</span>
                  <span className={`info-value ${displayData.currentGrade < 3 ? 'grade-fail-text' : ''}`}>
                    {displayData.currentGrade.toFixed(1)}
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

          {/* ACCIONES PRINCIPALES */}
          {!isCompleted && !isEnrolled && displayData.currentStatus !== 'Failed' && (
             <button onClick={handleEnroll} disabled={isSaving} className="btn-confirm" style={{width:'100%', marginBottom:'20px'}}>
                <BookOpen size={18} style={{marginRight:8}}/> Inscribir Materia
             </button>
          )}

          {(isEnrolled || displayData.currentStatus === 'Failed') && (
            <section className="detail-section" style={{textAlign:'center'}}>
              <h3 className="section-title">{isEnrolled ? 'Finalizar Materia' : 'Reintentar Materia'}</h3>
              <div style={{maxWidth: '300px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <input
                    type="number" min="0" max="5" step="0.1"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="Nota final (0.0 - 5.0)"
                    style={{padding: '10px', fontSize: '1.1rem', textAlign: 'center', borderRadius: '6px', border: '1px solid #ccc'}}
                  />
                  <button
                    onClick={handleRegisterGrade}
                    disabled={isSaving || !grade}
                    className="btn-confirm"
                    style={{backgroundColor: !grade ? '#ccc' : parseFloat(grade) >= 3 ? '#16a34a' : '#dc2626'}}
                  >
                    {isSaving ? 'Guardando...' : 'Registrar Nota'}
                  </button>
              </div>
            </section>
          )}
        </div>

        <div className="modal-actions" style={{justifyContent: 'space-between'}}>
          
          {/* BOTÓN NUEVO: Reiniciar (Solo si tiene historial y no es pendiente) */}
          {displayData.currentStatus !== 'Not Taken' && displayData.currentStatus !== 'Pending' ? (
             <button 
               onClick={handleReset} 
               className="btn-cancel" 
               style={{color: '#dc2626', borderColor: '#fca5a5', display:'flex', alignItems:'center', gap:'6px'}}
             >
                <Trash2 size={16}/> Reiniciar
             </button>
          ) : <div/>} 
          
          <button className="btn-modal btn-cancel" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};