import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { engineeringPrograms } from '../data/engineeringPrograms';
import './ProgramSelection.css';

export const ProgramSelection: React.FC = () => {
    // Gestiona el estado del ID del programa seleccionado para controlar la expansión de tarjetas
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Alterna el estado de selección de una tarjeta al interactuar con ella
    const handleProgramClick = (id: string) => {
        setSelectedId(prevId => prevId === id ? null : id);
    };

    // Detiene la propagación del evento para evitar cerrar la tarjeta y navega al dashboard
    const handleLoadCurriculum = async (e: React.MouseEvent, programId: string, programName: string) => {
        e.stopPropagation();
        setIsLoading(true);
        setError('');

        try {
            // Get token from localStorage
            const token = localStorage.getItem('accessToken');
            
            if (!token) {
                setError('No authentication token found. Please login again.');
                setIsLoading(false);
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            // Find the selected program to get its code
            const selectedProgram = engineeringPrograms.find(p => p.id === programId);
            if (!selectedProgram) {
                setError('Program not found');
                setIsLoading(false);
                return;
            }

            console.log(`Updating program to: ${programName} (${selectedProgram.code})`);

            // Send program update to backend
            const response = await fetch('http://localhost:8080/auth/update-program', {
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
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || 'Failed to update program');
            }

            const data = await response.json();
            console.log('Program updated successfully:', data);

            // Update localStorage with new program code
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                user.programCode = selectedProgram.code;
                user.programName = programName;
                localStorage.setItem('user', JSON.stringify(user));
            }

            // Navigate to dashboard
            navigate('/dashboard');

        } catch (err: any) {
            console.error('Error updating program:', err);
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
                {/* Itera sobre la lista de programas para renderizar las tarjetas individuales */}
                {engineeringPrograms.map((program) => {
                    const isSelected = selectedId === program.id;
                    return (
                        <div 
                            key={program.id}
                            className={`program-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleProgramClick(program.id)}
                        >
                            {/* Renderiza el contenido principal visible de la tarjeta */}
                            <div className="card-header-content">
                                <h3 className="program-name">{program.name}</h3>
                                <p className="program-desc">{program.description}</p>
                            </div>

                            {/* Renderiza condicionalmente la sección expandida con el resumen y botón de acción */}
                            {isSelected && (
                                <div className="card-expanded-content">
                                    <div className="divider-line"></div>
                                    <div className="summary-block">
                                        <h4>Resumen del Programa</h4>
                                        <p>{program.summary}</p>
                                        <small>* Datos preliminares (Dummy Data)</small>
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
