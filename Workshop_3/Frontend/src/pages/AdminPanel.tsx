import React, { useState, useEffect } from 'react';
import { Upload, Search, UserPlus, RefreshCw } from 'lucide-react';
import './AdminPanel.css';

interface AuditLog {
  id: number;
  adminUserId: number;
  actionType: string;
  targetEntity: string;
  targetId: string;
  details: string;
  timestamp: string;
}

export const AdminPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    code: 'FISG1001',
    name: 'Fundamentos de Física I',
    credits: 4,
    prereq: ''
  });

  const [newAdminData, setNewAdminData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Estados para subir archivos 
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Accede al token para verificar que el admin esté autenticado
  const getToken = () => {
    const token = localStorage.getItem('accessToken') || '';
    return token;
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const fetchAuditLogs = async () => {
    setIsLoadingLogs(true);
    const token = getToken();
    
    if (!token) {
      showMessage('error', 'No se encontró un token de autorización. Por favor inicie sesión de nuevo.');
      setIsLoadingLogs(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/admin/logs', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAuditLogs(data);
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        showMessage('error', 'No se pudieron encontrar audit logs:' + (errorData.message || response.statusText));
      }
    } catch (error) {
      showMessage('error', 'Error de red buscando los audit logs: ' + error);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // creación de nuevo ADMIN
  const handleCreateAdmin = async () => {
    if (!newAdminData.fullName || !newAdminData.email || !newAdminData.password) {
      showMessage('error', 'Por favor llena todos los campos');
      return;
    }

    const token = getToken();
    
    if (!token) {
      showMessage('error', 'No se encontró un token de autorización. Por favor inicie sesión de nuevo.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAdminData)
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', `Admin creado: ${data.email}`);
        setNewAdminData({ fullName: '', email: '', password: '' });
        // Refrescar logs después de acción 
        fetchAuditLogs();
      } else {
        showMessage('error', data.message || 'Error al crear admin');
      }
    } catch (error) {
      showMessage('error', 'Error al crear admin: ' + error);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getActionBadgeClass = (action: string) => {
    if (action.includes('Edición') || action.includes('EDIT')) return 'edicion';
    if (action.includes('Creación') || action.includes('CREATE')) return 'creacion';
    if (action.includes('Eliminación') || action.includes('DELETE')) return 'eliminacion';
    return 'carga'; 
  };

  // Handlers para actualización de malla con archivo CSV o JSON  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFileType(file)) {
        setUploadedFile(file);
      } else {
        showMessage('error', 'Solo se permiten archivos CSV o JSON');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFileType(file)) {
        setUploadedFile(file);
      } else {
        showMessage('error', 'Solo se permiten archivos CSV o JSON');
      }
    }
  };

  const validateFileType = (file: File): boolean => {
    const validTypes = ['text/csv', 'application/json', 'text/plain'];
    const validExtensions = ['.csv', '.json'];
    const fileName = file.name.toLowerCase();
    
    return validTypes.includes(file.type) || 
           validExtensions.some(ext => fileName.endsWith(ext));
  };

  const handleUploadFile = async () => {
    if (!uploadedFile) {
      showMessage('error', 'Por favor selecciona un archivo');
      return;
    }

    setIsUploading(true);
    const token = getToken();

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch('http://localhost:8080/admin/upload-curriculum', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showMessage('success', 
          `Archivo procesado: ${data.recordsProcessed} registros, ` +
          `${data.recordsCreated} creados, ${data.recordsUpdated} actualizados`
        );
        setUploadedFile(null);
        fetchAuditLogs();
      } else {
        showMessage('error', data.message || 'Error al procesar archivo');
      }
    } catch (error) {
      showMessage('error', 'Error de red al subir archivo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="admin-container">
      
      <div className="admin-badge">
        Modo Administrador
      </div>

      {message.text && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-top-grid">
        
        <div className="admin-card">
          <h3 className="card-title">
            <UserPlus size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Gestión de Administradores
          </h3>
          <p className="card-description">
            Crear nuevos usuarios administradores para el sistema.
          </p>

          <div className="edit-form">
            <div className="form-field">
              <label>Nombre Completo</label>
              <input 
                type="text" 
                className="admin-input" 
                placeholder="Ej: Elon Musk"
                value={newAdminData.fullName}
                onChange={(e) => setNewAdminData({...newAdminData, fullName: e.target.value})}
              />
            </div>
            
            <div className="form-field">
              <label>Email</label>
              <input 
                type="email" 
                className="admin-input" 
                placeholder="Ej: elonmusk@unal.edu.co"
                value={newAdminData.email}
                onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
              />
            </div>

            <div className="form-field">
              <label>Contraseña</label>
              <input 
                type="password" 
                className="admin-input" 
                placeholder="Ej: litlekittie"
                value={newAdminData.password}
                onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
              />
            </div>

            <button 
              className="btn-primary" 
              onClick={handleCreateAdmin}
              style={{ width: '100%' }}
            >
              <UserPlus size={18} style={{ display: 'inline', marginRight: '8px' }} />
              Crear Administrador
            </button>
          </div>
        </div>

        {/* File Upload Card - EXISTING */}
        <div className="admin-card">
          <h3 className="card-title">Carga de Archivos Curriculares</h3>
          <p className="card-description">
            Sube archivos CSV o JSON para actualizar la malla curricular masivamente.
          </p>

          <div 
            className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <div className="upload-icon">
              <Upload size={48} strokeWidth={1.5} />
            </div>
            {uploadedFile ? (
              <div>
                <p className="upload-text">Archivo seleccionado:</p>
                <p className="upload-subtext">{uploadedFile.name}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                  style={{ marginTop: '8px', color: '#ef4444', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  Remover archivo
                </button>
              </div>
            ) : (
                <>
                  <p className="upload-text">Arrastra y suelta tus archivos aquí</p>
                  <p className="upload-subtext">Formatos soportados: .CSV, .JSON</p>
                </>
              )}
          </div>

          <input 
            id="file-input"
            type="file"
            accept=".csv,.json"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <button 
            className="btn-upload" 
            onClick={handleUploadFile}
            disabled={!uploadedFile || isUploading}
          >
            {isUploading ? 'Subiendo...' : 'Subir Malla Curricular'}
          </button>
        </div>

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

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 className="card-title">Historial de Cambios y Auditoría</h3>
            <p className="card-description">
              Registro de todas las modificaciones realizadas en el sistema.
            </p>
          </div>
          <button 
            className="btn-secondary"
            onClick={fetchAuditLogs}
            disabled={isLoadingLogs}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={16} className={isLoadingLogs ? 'spinning' : ''} />
            Actualizar
          </button>
        </div>
        
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Admin ID</th>
                <th>Acción</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.timestamp).toLocaleString('es-CO')}</td>
                  <td>Admin #{log.adminUserId}</td>
                  <td>
                    <span className={`action-badge ${getActionBadgeClass(log.actionType)}`}>
                      {log.actionType}
                    </span>
                  </td>
                  <td>{log.details}</td>
                </tr>
              ))}

              {auditLogs.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '24px' }}>
                    No hay registros de auditoría
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
