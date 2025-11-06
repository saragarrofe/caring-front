import './../Auth.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginErrors } from 'src/types/LogIn';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);

  const navigate = useNavigate();

  const validateForm = () => {
    const next: LoginErrors = {};
    const regex = /^\S+@\S+\.\S+$/;
    if (!email) next.email = 'Email is required';
    else if (!regex.test(email)) next.email = 'Invalid email format';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 700));
      navigate('/my-plants');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !email || !password || isSubmitting;

  return (
    <main className="auth">
      <div
        className="auth-hero"
        style={{ backgroundImage: "url('/assets/hero-plants.jpg')" }} // cambiar
        aria-hidden
      />

      <section className="auth-card">
        <h1 className="auth-title">Welcome back!</h1>
        <p className="auth-sub">Log in to your account</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-16">
            <label htmlFor="email" className="form-label sr-only">
              Email
            </label>
            <div className={`input ${errors.email ? 'is-invalid' : ''}`}>
              <span className="input-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                placeholder="example@caring.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <div id="email-error" className="invalid">
                {errors.email}
              </div>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="form-label sr-only">
              Password
            </label>
            <div className={`input ${errors.password ? 'is-invalid' : ''}`}>
              <span className="input-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <input
                id="password"
                type="password"
                placeholder="write your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
            </div>
            {errors.password && (
              <div id="password-error" className="invalid">
                {errors.password}
              </div>
            )}
          </div>

          <div className="row-between mb-16">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="check" aria-hidden />
              <span>Remember me</span>
            </label>

            <Link className="link-muted" to="/forgot-password">
              Forget Password?
            </Link>
          </div>

          <button type="submit" className="btn-primary" disabled={isDisabled}>
            {isSubmitting ? 'Entrando…' : 'Log In'}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{' '}
          <Link to="/register" className="link-accent">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}
