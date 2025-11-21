import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LayoutDashboard, Settings, LogOut, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import logoUnal from '../assets/logo_unal.png';
import './MainLayout.css';

// Define la estructura de los datos del usuario para tipado
interface UserData {
  name: string;
  role: string;
  dept: string;
}

export const MainLayout: React.FC = () => {
  // Controla la visibilidad del menú en móvil y el estado colapsado en escritorio
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
          <div className="user-profile-header">
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
        {/* Renderiza la barra lateral con clases condicionales para apertura móvil y colapso */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
          
          {/* Botón para alternar el estado colapsado del menú */}
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

            {/* Renderiza elementos administrativos solo si el rol es 'admin' */}
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

        {/* Contenedor principal del contenido con scroll interno y pie de página */}
        <main className="main-content">
           <div className="page-scroll-container">
              <div className="page-content-wrapper">
                  <Outlet /> 
              </div>
              <footer className="app-footer">
                © 2025 Universidad Nacional de Colombia - Diseño de Software II
              </footer>
           </div>
        </main>
      </div>
    </div>
  );
};