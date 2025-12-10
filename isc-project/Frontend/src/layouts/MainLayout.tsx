import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LayoutDashboard, Settings, LogOut, UserCircle, ChevronLeft, ChevronRight, Mail, User, GraduationCap, Edit3 } from 'lucide-react'; 
import logoUnal from '../assets/logo_unal.png';
import './MainLayout.css';

// Interfaz actualizada para incluir datos del programa
interface UserData {
  name: string;
  role: string;
  dept: string;
  email?: string;
  programCode?: string; 
  programName?: string;
}

export const MainLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // --- PROTECCIÓN DE RUTA: ASOCIACIÓN DE CARRERA ---
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Si es estudiante (no guest, no admin) y NO tiene programa, forzar selección
    if (user.role !== 'guest' && user.role !== 'admin' && !user.programCode) {
      // Evitar bucle infinito si ya está en la página de selección
      if (location.pathname !== '/select-program') {
        navigate('/select-program');
      }
    }
  }, [user, navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/login');
  };

  const handleChangeProgram = () => {
    setIsProfileOpen(false);
    navigate('/select-program');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Mapa Curricular', icon: <BookOpen size={20} /> },
    { path: '/report', label: 'Reporte Académico', icon: <LayoutDashboard size={20} /> },
  ];

  const adminItems = [
    { path: '/admin', label: 'Panel Administrativo', icon: <Settings size={20} /> },
  ];

  if (!user) return null;

  return (
    <div className="layout-container">
      
      <header className="main-header">
        <div className="header-left">
          <button className="menu-btn-mobile" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X color="white" /> : <Menu color="white" />}
          </button>
          
          <div className="brand-container-header">
            <img 
               src={logoUnal} 
               alt="UNAL" 
               className="header-logo"
               onError={(e) => e.currentTarget.style.display = 'none'} 
            />
            <div className="brand-text">
              <span className="brand-main">UNAL Académico</span>
              <span className="brand-sub">Sede Bogotá</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div 
            className="user-profile-header" 
            onClick={() => setIsProfileOpen(true)}
            title="Ver información de perfil"
          >
            <div className="text-right hidden md:block">
              <p className="user-name">{user.name}</p>
              <p className="user-role-label">
                {user.role === 'admin' ? 'Administrador' : user.role === 'guest' ? 'Invitado' : 'Estudiante'}
              </p>
            </div>
            <UserCircle size={32} className="text-white opacity-90" />
          </div>
          
          <button onClick={handleLogout} className="logout-header-btn" title="Cerrar Sesión">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="layout-body">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
          <button 
            className="sidebar-toggle-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expandir menú" : "Contraer menú"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
                title={isCollapsed ? item.label : ''} 
              >
                {item.icon}
                <span className="nav-item-label">{item.label}</span>
              </Link>
            ))}

            {user.role === 'admin' && (
              <>
                <div className="nav-divider">ADMINISTRACIÓN</div>
                {adminItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                    title={isCollapsed ? item.label : ''}
                  >
                    {item.icon}
                    <span className="nav-item-label">{item.label}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>
        </aside>

        <main className="main-content">
           <div className="page-scroll-container">
              <div className="page-content-wrapper">
                  <Outlet /> 
              </div>
              <footer className="app-footer">
                © 2025 Universidad Nacional de Colombia - Ingeniería de Software II
              </footer>
           </div>
        </main>
      </div>

      {/* --- MODAL DE PERFIL --- */}
      {isProfileOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsProfileOpen(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h3>Mi Perfil</h3>
              <button className="profile-close-btn" onClick={() => setIsProfileOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="profile-modal-body">
              <div className="profile-avatar-large">
                <UserCircle size={64} color="var(--unal-gray)" />
              </div>
              
              <div className="profile-info-group">
                <label>Nombre</label>
                <div className="profile-value">
                  <User size={16} />
                  <span>{user.name}</span>
                </div>
              </div>

              <div className="profile-info-group">
                <label>Correo Electrónico</label>
                <div className="profile-value">
                  <Mail size={16} />
                  <span>{user.email || 'No disponible (Invitado)'}</span>
                </div>
              </div>

              {/* Nueva sección: Programa Académico */}
              <div className="profile-info-group">
                <label>Programa Académico</label>
                <div className="profile-value">
                  <GraduationCap size={16} />
                  <span>{user.programName || user.programCode || 'Sin Asignar'}</span>
                </div>
              </div>

              <div className="profile-info-group">
                <label>Rol</label>
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? 'Administrador' : user.role === 'guest' ? 'Invitado' : 'Estudiante'}
                </span>
              </div>

              {/* Botón para cambiar programa */}
              <button 
                onClick={handleChangeProgram}
                style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    border: '1px solid var(--unal-red)',
                    color: 'var(--unal-red)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    width: '100%',
                    justifyContent: 'center'
                }}
              >
                <Edit3 size={16}/> Cambiar Carrera
              </button>

            </div>

            <div className="profile-modal-footer">
              <button className="btn-close-profile" onClick={() => setIsProfileOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};