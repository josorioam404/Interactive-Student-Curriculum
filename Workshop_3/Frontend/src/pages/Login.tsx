import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 
import logoUnal from '../assets/logo_unal.png';
import './Login.css';

// Define la estructura de datos para la sesión del usuario
interface UserSessionData {
  name: string;
  role: string;
  dept: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // Gestiona el estado local para las credenciales, visibilidad de contraseña y errores
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');

  // Valida las credenciales contra datos estáticos y redirige según el rol
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'folmos@unal.edu.co' && password === 'Admin12345') {
      saveUserAndRedirect({ name: 'Frank Olmos', role: 'admin', dept: 'Ingeniería de Sistemas' });
    } 
    else if (email === 'estudiante@unal.edu.co' && password === 'Estudiante123') {
      saveUserAndRedirect({ name: 'Pepito Pérez', role: 'student', dept: 'Ingeniería Industrial' });
    } 
    else {
      setError('Credenciales incorrectas. Por favor verifica tus datos.');
    }
  };

  // Habilita el acceso limitado para usuarios invitados
  const handleGuestAccess = () => {
    saveUserAndRedirect({ name: 'Invitado', role: 'guest', dept: 'Visitante' });
  };

  // Persiste la sesión del usuario en el almacenamiento local y navega al dashboard
  const saveUserAndRedirect = (userData: UserSessionData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logoUnal} alt="Logo UNAL" className="login-logo" onError={(e) => e.currentTarget.style.display='none'}/>
        
        <h1 className="login-title">Bienvenido a UNAL Académico</h1>
        <p className="login-description">
          Inicia sesión o regístrate para gestionar tu plan de estudios.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico o Usuario</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="tu.correo@unal.edu.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              {/* Alterna el tipo de input entre text y password según la visibilidad */}
              <input
                type={showPassword ? "text" : "password"} 
                id="password"
                className="form-input password-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">Ingresar</button>
        </form>

        <div className="login-actions">
          <button className="btn-secondary" onClick={() => navigate('/signup')}>
            Registrarse
          </button>
        </div>

        <div className="login-footer">
          <button className="link-btn" onClick={handleGuestAccess}>
            Explorar como Invitado
          </button>
          <button className="link-btn small" onClick={() => alert("Funcionalidad de recuperación pendiente")}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};
