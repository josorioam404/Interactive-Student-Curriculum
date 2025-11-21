import React, { useState } from 'react';
import { Upload, Search } from 'lucide-react';
import { mockChangeHistory } from '../data/mockAdminData';
import './AdminPanel.css';

export const AdminPanel: React.FC = () => {
  // Gestiona el estado local para la búsqueda y la simulación de datos del formulario
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    code: 'FISG1001',
    name: 'Fundamentos de Física I',
    credits: 4,
    prereq: ''
  });

  // Actualiza el término de búsqueda basado en la entrada del usuario
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Determina la clase CSS para la etiqueta de acción basada en el tipo de evento
  const getActionBadgeClass = (action: string) => {
    if (action.includes('Edición')) return 'edicion';
    if (action.includes('Creación')) return 'creacion';
    if (action.includes('Eliminación')) return 'eliminacion';
    return 'carga'; 
  };

  return (
    <div className="admin-container">
      
      <div className="admin-badge">
        Modo Administrador
      </div>

      <div className="admin-top-grid">
        
        {/* Renderiza la tarjeta de carga masiva de archivos */}
        <div className="admin-card">
          <h3 className="card-title">Carga de Archivos Curriculares</h3>
          <p className="card-description">
            Sube archivos CSV o JSON para actualizar la malla curricular masivamente.
          </p>
          
          <div className="upload-zone">
            <div className="upload-icon">
              <Upload size={48} strokeWidth={1.5} />
            </div>
            <p className="upload-text">Arrastra y suelta tus archivos aquí</p>
            <p className="upload-subtext">Formatos soportados: .CSV, .JSON</p>
          </div>

          <button className="btn-upload" onClick={() => alert("Funcionalidad de carga simulada")}>
            Subir Malla Curricular
          </button>
        </div>

        {/* Renderiza la tarjeta de gestión individual de asignaturas */}
        <div className="admin-card">
          <h3 className="card-title">Gestión de Asignaturas</h3>
          <p className="card-description">
            Edita los detalles de las asignaturas existentes individualmente.
          </p>

          <div className="search-wrapper">
            <Search className="search-icon-admin" size={18} />
            <input 
              type="text" 
              className="search-input-admin"
              placeholder="Buscar por Código o Nombre..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="edit-form">
            <div className="form-field">
              <label>Código</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.code}
                readOnly 
              />
            </div>
            
            <div className="form-field">
              <label>Título</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="form-field">
              <label>Créditos</label>
              <input 
                type="number" 
                className="admin-input" 
                value={formData.credits}
                onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
              />
            </div>

            <div className="form-field">
              <label>Prerrequisitos</label>
              <select className="admin-input" defaultValue="">
                <option value="" disabled>Seleccionar Prerrequisito</option>
                <option value="mate">MATE1001 - Cálculo Diferencial</option>
                <option value="prog">PROG1001 - Programación Básica</option>
              </select>
            </div>

            <div className="form-actions">
              <button className="btn-secondary">
                Descartar
              </button>
              <button className="btn-primary" onClick={() => alert("Cambios guardados (Simulación)")}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Renderiza la tabla de historial de cambios */}
      <div className="admin-card">
        <h3 className="card-title">Historial de Cambios</h3>
        <p className="card-description">Registro de todas las modificaciones realizadas en el sistema.</p>
        
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {mockChangeHistory.map((log) => (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td>{log.user}</td>
                  <td>
                    <span className={`action-badge ${getActionBadgeClass(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};