import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { engineeringPrograms } from '../data/engineeringPrograms';
import './ProgramSelection.css';

export const ProgramSelection: React.FC = () => {
    // Guardamos el ID del programa seleccionado
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleProgramClick = (id: string) => {
        // Si ya está seleccionado, lo deseleccionamos (toggle), si no, lo seleccionamos
        setSelectedId(prevId => prevId === id ? null : id);
    };

    const handleLoadCurriculum = (e: React.MouseEvent, programName: string) => {
        e.stopPropagation(); // Evita que el click llegue a la tarjeta y la cierre
        console.log(`Cargando malla de: ${programName}`);
        navigate('/dashboard');
    };

    return (
        <div className="program-selection-container">
            <h1 className="page-title">Selecciona tu Programa de Ingeniería</h1>
            
            <div className="programs-grid">
                {engineeringPrograms.map((program) => {
                    const isSelected = selectedId === program.id;

                    return (
                        <div 
                            key={program.id}
                            className={`program-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleProgramClick(program.id)}
                        >
                            {/* Contenido Principal de la Tarjeta */}
                            <div className="card-header-content">
                                <h3 className="program-name">{program.name}</h3>
                                <p className="program-desc">{program.description}</p>
                            </div>

                            {/* SECCIÓN DESPLEGABLE (Solo visible si está seleccionado) */}
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