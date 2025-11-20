import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AcademicReport } from './pages/AcademicReport';
import { AdminPanel } from './pages/AdminPanel';
// --- ESTA ES LA LÍNEA QUE FALTABA ---
import { ProgramSelection } from './pages/ProgramSelection'; 
// ------------------------------------
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas: Usan el MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Redirección inicial: Si entra a la raíz, ir a selección de programa */}
          <Route index element={<Navigate to="/select-program" replace />} />
          
          {/* Ruta de Selección de Programa */}
          <Route path="select-program" element={<ProgramSelection />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="report" element={<AcademicReport />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>

        {/* Captura cualquier ruta desconocida */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;