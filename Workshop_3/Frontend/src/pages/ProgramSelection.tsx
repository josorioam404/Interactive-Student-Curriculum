import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { engineeringPrograms } from '../data/engineeringPrograms';
import './ProgramSelection.css';

export const ProgramSelection: React.FC = () => {
    // Gestiona el estado del ID del programa seleccionado para controlar la expansión de tarjetas
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const navigate = useNavigate();

    // Alterna el estado de selección de una tarjeta al interactuar con ella
    const handleProgramClick = (id: string) => {
        setSelectedId(prevId => prevId === id ? null : id);
    };

    // Detiene la propagación del evento para evitar cerrar la tarjeta y navega al dashboard
    const handleLoadCurriculum = (e: React.MouseEvent, programName: string) => {
        e.stopPropagation(); 
        console.log(`Cargando malla de: ${programName}`);
        navigate('/dashboard');
    };

    return (
        <div className="program-selection-container">
            <h1 className="page-title">Selecciona tu Programa de Ingeniería</h1>
            
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
                                        onClick={(e) => handleLoadCurriculum(e, program.name)}
                                    >
                                        Cargar Malla Curricular
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