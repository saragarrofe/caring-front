import './../Auth.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterErrors } from 'src/types/LogIn';
import { RegisterFormValues } from 'src/types/Register';

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const [values, setValues] = useState<RegisterFormValues>({ ...initialValues });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next: RegisterErrors = {};
    const { name, email, password, confirmPassword } = values;
    const regex = /^\S+@\S+\.\S+$/;

    if (!name.trim()) next.name = 'Name is required.';
    if (!email) next.email = 'Email is required.';
    else if (!regex.test(email)) next.email = 'Invalid email format.';
    if (!password) next.password = 'Password is required.';
    else if (password.length < 6) next.password = 'Must be at least 6 characters.';
    if (!confirmPassword) next.confirmPassword = 'Confirm password is required.';
    else if (confirmPassword !== password) next.confirmPassword = 'Passwords do not match.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setIsSubmitting(true);
      // aquí irá la llamada real (api)
      await new Promise((res) => setTimeout(res, 700));
      navigate('/my-plants');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { name, email, password, confirmPassword } = values;
  const isDisabled = !name || !email || !password || !confirmPassword || isSubmitting;

  return (
    <main className="auth">
      <div
        className="auth-hero"
        style={{
          backgroundImage: "url('/assets/hero-plants.jpg')",
        }} // cambiar
        aria-hidden
      />

      <section className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">Join Caring and start your plant care journey</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-16">
            <label htmlFor="name" className="form-label sr-only">
              Name
            </label>
            <div className={`input ${errors.name ? 'is-invalid' : ''}`}>
              <span className="input-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M4 20a8 8 0 0 1 16 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </span>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </div>
            {errors.name && (
              <div id="name-error" className="invalid">
                {errors.name}
              </div>
            )}
          </div>

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
                name="email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={handleChange}
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

          <div className="mb-16">
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
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
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

          <div className="mb-16">
            <label htmlFor="confirmPassword" className="form-label sr-only">
              Confirm password
            </label>
            <div className={`input ${errors.confirmPassword ? 'is-invalid' : ''}`}>
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
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={handleChange}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
            </div>
            {errors.confirmPassword && (
              <div id="confirmPassword-error" className="invalid">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary" disabled={isDisabled}>
            {isSubmitting ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="link-accent">
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}
