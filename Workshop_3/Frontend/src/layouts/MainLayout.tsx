//MainLayout.tsx

import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LayoutDashboard, Settings, LogOut, UserCircle, ChevronLeft, ChevronRight, Mail, User } from 'lucide-react';
import logoUnal from '../assets/logo_unal.png';
import './MainLayout.css';

// Define la estructura de los datos del usuario para tipado
interface UserData {
  name: string;
  role: string;
  dept: string;
  email?: string; // Campo opcional (los invitados pueden no tenerlo en el objeto base)
}

export const MainLayout: React.FC = () => {
  // Controla la visibilidad de los menús
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Estado para el Modal de Perfil
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  // Inicializa el estado del usuario leyendo directamente del almacenamiento local
  const [user, setUser] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Redirige al login si no existe una sesión de usuario activa
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Gestiona el cierre de sesión limpiando el almacenamiento y el estado
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/login');
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
          {/* Botón de menú visible solo en dispositivos móviles */}
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
          {/* Se añade onClick para abrir el modal de perfil */}
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
        {/* Barra Lateral */}
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

        {/* Contenido Principal */}
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
                <UserCircle size={64} color="var(--color-unal-gray)" />
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

              <div className="profile-info-group">
                <label>Rol</label>
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? 'Administrador' : user.role === 'guest' ? 'Invitado' : 'Estudiante'}
                </span>
              </div>
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
