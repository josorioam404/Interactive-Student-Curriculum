import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AcademicReport } from './pages/AcademicReport';
import { AdminPanel } from './pages/AdminPanel';
import { ProgramSelection } from './pages/ProgramSelection'; 
import './App.css';

function App() {
  return (
    // Habilita el enrutamiento basado en el historial del navegador para la aplicación
    <BrowserRouter>
      <Routes>
        {/* Define la ruta de acceso público para la autenticación */}
        <Route path="/login" element={<Login />} />

        {/* Establece el diseño principal para las rutas protegidas internas */}
        <Route path="/" element={<MainLayout />}>
          {/* Redirige la ruta raíz a la selección de programa por defecto */}
          <Route index element={<Navigate to="/select-program" replace />} />
          
          {/* Mapea las rutas funcionales a sus respectivos componentes de página */}
          <Route path="select-program" element={<ProgramSelection />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="report" element={<AcademicReport />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>

        {/* Captura cualquier ruta no definida y redirige al inicio de sesión */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;