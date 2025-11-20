import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnal from '../assets/logo_unal.png';
import './Login.css';

// CORRECCIÓN: Definimos la interfaz en lugar de usar 'any'
interface UserSessionData {
  name: string;
  role: string;
  dept: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Usuario ADMIN (Tus credenciales solicitadas)
    if (email === 'folmos@unal.edu.co' && password === 'Admin12345') {
      saveUserAndRedirect({ name: 'Frank Olmos', role: 'admin', dept: 'Ingeniería de Sistemas' });
    } 
    // 2. Usuario ESTUDIANTE (Ejemplo)
    else if (email === 'estudiante@unal.edu.co' && password === 'Estudiante123') {
      saveUserAndRedirect({ name: 'Pepito Pérez', role: 'student', dept: 'Ingeniería Industrial' });
    } 
    else {
      setError('Credenciales incorrectas. Por favor verifica tus datos.');
    }
  };

  const handleGuestAccess = () => {
    // 3. Usuario INVITADO
    saveUserAndRedirect({ name: 'Invitado', role: 'guest', dept: 'Visitante' });
  };

  // Aquí aplicamos el tipo UserSessionData en lugar de 'any'
  const saveUserAndRedirect = (userData: UserSessionData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/select-program');
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
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Ingresar</button>
        </form>

        <div className="login-actions">
          <button className="btn-secondary" onClick={() => alert("Funcionalidad de Registro pendiente")}>
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