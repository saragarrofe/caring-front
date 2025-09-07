import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  type LoginErrors = {
    email?: string;
    password?: string;
  };
  
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const validateForm = () => {
    const next: typeof errors = {};
    const regex = /^\S+@\S+\.\S+$/; 

    if(!email) {
      next.email = 'Email is required';
    } else {
      if(!regex.test(email)){
        next.email = 'Invalid email format';
      }
    }

    if(!password) {
      next.password = 'Password is required';
    } else {
      if(password.length < 6) {
        next.password = 'Password must be at least 6 characters';
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // futura llamada a la api
      await new Promise((res) => setTimeout(res, 700));
      navigate('/my-plants');
    } catch (error) {
      setErrors((prev) => ({
        ...prev, 
        password: 'Invalid email or password',
      }))
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !email || !password || isSubmitting;

  return (
    <>
    <div className="container py-4" style={{ maxWidth: 420 }}>
      <h2 className="mb-3">Login</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={handleChangeEmail}
            placeholder="tú@correo.com"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <div id="email-error" className="invalid-feedback">
              {errors.email}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={password}
            onChange={handleChangePassword}
            placeholder="••••••"
            required
            minLength={6}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <div id="password-error" className="invalid-feedback">
              {errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isDisabled}
        >
          {isSubmitting ? 'Entrando…' : 'Login'}
        </button>
      </form>
    </div>
    </>
  );

}