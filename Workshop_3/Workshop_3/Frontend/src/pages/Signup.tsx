import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 
import logoUnal from '../assets/logo_unal.png';
import './Signup.css';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estructura de datos para gestionar errores en campos de registro
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Validación de formato para datos de registro de usuario
  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = 'Por favor completa este campo';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Por favor completa este campo';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Por favor ingresa un correo válido';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Por favor completa este campo';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Por favor completa este campo';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newUser = {
        fullName,
        email,
        password,
        selectedProgramCodeSia: null
      };

      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) {
        setErrors({
          ...errors,
          email: "Error registrando usuario"
        });
        return;
      }

      navigate("/login", {
        state: { message: "Registro exitoso" }
      });

    } catch (err) {
      console.error(err);
      setErrors({ ...errors, email: "Error del servidor" });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img 
          src={logoUnal} 
          alt="Logo UNAL" 
          className="signup-logo" 
          onError={(e) => e.currentTarget.style.display='none'}
        />
        
        <h1 className="signup-title">Bienvenido a UNAL Académico</h1>
        <p className="signup-description">
          Regístrate para gestionar tu plan de estudios.
        </p>

        <form onSubmit={handleSignup} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Nombre de usuario</label>
            <input
              type="text"
              id="fullName"
              className={`form-input ${errors.fullName ? 'input-error' : ''}`}
              placeholder="Ej: Linus Torvalds"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({...errors, fullName: ''});
              }}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="tu.correo@unal.edu.co"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({...errors, email: ''});
              }}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"} 
                id="password"
                className={`form-input password-input ${errors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({...errors, password: ''});
                }}
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
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"} 
                id="confirmPassword"
                className={`form-input password-input ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                }}
              />
              <button 
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn-primary">Registrarse</button>
        </form>

        <div className="signup-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <button 
              className="link-btn" 
              onClick={() => navigate('/login')}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
