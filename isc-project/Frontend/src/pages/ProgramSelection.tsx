//ProgramSelection.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { engineeringPrograms } from '../data/engineeringPrograms';
import './ProgramSelection.css';

export const ProgramSelection: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const JAVA_API_URL = import.meta.env.VITE_JAVA_API_URL;

    const handleProgramClick = (id: string) => {
        setSelectedId(prevId => prevId === id ? null : id);
    };

    const handleLoadCurriculum = async (e: React.MouseEvent, programId: string, programName: string) => {
        e.stopPropagation();
        setIsLoading(true);
        setError('');

        try {
            // Recupera el usuario para verificar el rol
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                navigate('/login');
                return;
            }
            
            const user = JSON.parse(userStr);
            const isGuest = user.role === 'guest';

            const selectedProgram = engineeringPrograms.find(p => p.id === programId);
            if (!selectedProgram) {
                setError('Programa no encontrado');
                setIsLoading(false);
                return;
            }

            // Si NO es invitado, realiza la petición al backend para persistir el cambio
            if (!isGuest) {
                const token = localStorage.getItem('accessToken');
                
                if (!token) {
                    setError('Sesión expirada. Por favor inicie sesión de nuevo.');
                    setTimeout(() => navigate('/login'), 2000);
                    return;
                }

                const response = await fetch(`${JAVA_API_URL}/auth/update-program`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        programCode: selectedProgram.code
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
                    throw new Error(errorData.message || 'Error al actualizar el programa');
                }
                
                // Consume la respuesta para completar el flujo
                await response.json();
            }

            // Actualiza localStorage (tanto para Guest como para User autenticado)
            user.programCode = selectedProgram.code;
            user.programName = programName;
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/dashboard');

        } catch (err: any) {
            setError(err.message || 'Error al actualizar el programa');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="program-selection-container">
            <h1 className="page-title">Selecciona tu Programa de Ingeniería</h1>
            
            {error && (
                <div style={{
                    padding: '12px',
                    marginBottom: '20px',
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fca5a5',
                    borderRadius: '8px',
                    color: '#991b1b',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            <div className="programs-grid">
                {engineeringPrograms.map((program) => {
                    const isSelected = selectedId === program.id;
                    return (
                        <div 
                            key={program.id}
                            className={`program-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleProgramClick(program.id)}
                        >
                            <div className="card-header-content">
                                <h3 className="program-name">{program.name}</h3>
                                <p className="program-desc">{program.description}</p>
                            </div>

                            {isSelected && (
                                <div className="card-expanded-content">
                                    <div className="divider-line"></div>
                                    <div className="summary-block">
                                        <h4>Resumen del Programa</h4>
                                        <p>{program.summary}</p>
                                        <small>* Visualización de Malla Curricular</small>
                                    </div>
                                    <button 
                                        className="load-curriculum-btn" 
                                        onClick={(e) => handleLoadCurriculum(e, program.id, program.name)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Cargando...' : 'Cargar Malla Curricular'}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
