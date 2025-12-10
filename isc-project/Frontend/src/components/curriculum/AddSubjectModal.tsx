import React, { useState } from 'react';
import { X } from 'lucide-react';
import './SubjectDetailModal.css'; // Reutilizamos estilos existentes para mantener consistencia

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (subject: any) => void;
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ isOpen, onClose, onAdd }) => {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    grade: '',
    credits: 3,
    semester: 1, // Por defecto semestre 1
    type: 'Libre Elección'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.code || !formData.grade) return;
    const gradeVal = parseFloat(formData.grade);
    if (gradeVal < 0 || gradeVal > 5) {
        alert("La nota debe estar entre 0.0 y 5.0");
        return;
    }

    // Construcción del objeto compatible con StudyPlanItem
    const newItem = {
        id: Date.now(), // ID temporal único basado en timestamp
        program_code_sia: "MANUAL",
        subject_code: formData.code,
        suggested_semester: Number(formData.semester), // Importante para la grilla
        component: formData.type,
        is_obligatory: false,
        subject: {
            code: formData.code,
            name: formData.name,
            credits: Number(formData.credits),
            weekly_hours: 4,
            component_type: formData.type
        },
        progress: {
            subject_code: formData.code,
            status: 'Completed', // Asumimos aprobada si ya tiene nota
            final_grade: gradeVal
        }
    };

    onAdd(newItem);
    onClose();
    // Limpiar formulario
    setFormData({ name: '', code: '', grade: '', credits: 3, semester: 1, type: 'Libre Elección' }); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        
        <div className="modal-header">
          <h2 className="modal-title">Agregar Asignatura Manual</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="modal-content">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Nombre */}
                <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem'}}>Nombre Asignatura</label>
                    <input 
                        style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Ej: Guitarra Funcional"
                        required
                    />
                </div>
                
                {/* Código y Créditos */}
                <div style={{display: 'flex', gap: '15px'}}>
                    <div style={{flex: 1}}>
                        <label style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem'}}>Código</label>
                        <input 
                            style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                            value={formData.code}
                            onChange={e => setFormData({...formData, code: e.target.value})}
                            placeholder="Ej: 123456"
                            required
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <label style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem'}}>Créditos</label>
                        <input 
                            type="number" min="0" max="10"
                            style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                            value={formData.credits}
                            onChange={e => setFormData({...formData, credits: parseInt(e.target.value)})}
                        />
                    </div>
                </div>

                {/* Nota y Semestre */}
                <div style={{display: 'flex', gap: '15px'}}>
                    <div style={{flex: 1}}>
                        <label style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem'}}>Nota (0.0 - 5.0)</label>
                        <input 
                            type="number" step="0.1" min="0" max="5"
                            style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                            value={formData.grade}
                            onChange={e => setFormData({...formData, grade: e.target.value})}
                            placeholder="Ej: 4.5"
                            required
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <label style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem'}}>Semestre Ubicación</label>
                        <select
                            style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                            value={formData.semester}
                            onChange={e => setFormData({...formData, semester: parseInt(e.target.value)})}
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i+1} value={i+1}>Semestre {i+1}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tipo de Asignatura */}
                <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem'}}>Tipo (Componente)</label>
                    <select 
                        style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                        <option value="Libre Elección">Libre Elección</option>
                        <option value="Nivelación">Nivelación</option>
                        <option value="Fundamentación">Fundamentación (Extra)</option>
                        <option value="Disciplinar">Disciplinar (Extra)</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="btn-confirm" 
                    style={{marginTop: '10px', width: '100%', padding: '12px', fontSize: '1rem'}}
                >
                    + Agregar a Mi Malla
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};