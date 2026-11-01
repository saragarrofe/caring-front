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
      // TODO: replace with real API call
      await new Promise((res) => setTimeout(res, 700));
      navigate('/my-plants');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { name, email, password, confirmPassword } = values;
  const isDisabled = !name || !email || !password || !confirmPassword || isSubmitting;

  const inputWrapBase =
    'relative flex items-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg)] py-[12px] pr-[14px] pl-[44px] shadow-[var(--shadow)]';

  return (
    <main className="grid min-h-[100svh] grid-rows-[auto_1fr_auto] bg-[var(--color-bg)]">
      <div
        className="h-[220px] max-[360px]:h-[190px] bg-[var(--color-bg-hero)] bg-cover bg-center bg-no-repeat [clip-path:ellipse(120%_70%_at_50%_0%)]"
        style={{
          backgroundImage: "url('/assets/hero-plants.jpg')",
        }} // TODO: change
        aria-hidden
      />

      <section className="mx-auto w-[min(92%,420px)] text-center">
        <h1 className="mt-[12px] mb-[4px] text-[28px] font-bold text-[var(--color-primary)]">
          Create Account
        </h1>
        <p className="mt-0 mb-[20px] text-[var(--color-text)] opacity-85">
          Join Caring and start your plant care journey
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-[16px]">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className={`${inputWrapBase} ${errors.name ? 'border-[var(--color-danger)]' : ''}`}>
              <span className="absolute left-[14px] text-[var(--color-text-faint)]" aria-hidden>
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
                className="w-full border-0 text-[16px] text-[var(--color-text)] outline-0"
              />
            </div>
            {errors.name && (
              <div id="name-error" className="mt-[6px] text-[12px] text-[var(--color-danger)]">
                {errors.name}
              </div>
            )}
          </div>

          <div className="mb-[16px]">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div
              className={`${inputWrapBase} ${errors.email ? 'border-[var(--color-danger)]' : ''}`}
            >
              <span className="absolute left-[14px] text-[var(--color-text-faint)]" aria-hidden>
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
                className="w-full border-0 text-[16px] text-[var(--color-text)] outline-0"
              />
            </div>
            {errors.email && (
              <div id="email-error" className="mt-[6px] text-[12px] text-[var(--color-danger)]">
                {errors.email}
              </div>
            )}
          </div>

          <div className="mb-[16px]">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div
              className={`${inputWrapBase} ${errors.password ? 'border-[var(--color-danger)]' : ''}`}
            >
              <span className="absolute left-[14px] text-[var(--color-text-faint)]" aria-hidden>
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
                className="w-full border-0 text-[16px] text-[var(--color-text)] outline-0"
              />
            </div>
            {errors.password && (
              <div id="password-error" className="mt-[6px] text-[12px] text-[var(--color-danger)]">
                {errors.password}
              </div>
            )}
          </div>

          <div className="mb-[16px]">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm password
            </label>
            <div
              className={`${inputWrapBase} ${errors.confirmPassword ? 'border-[var(--color-danger)]' : ''}`}
            >
              <span className="absolute left-[14px] text-[var(--color-text-faint)]" aria-hidden>
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
                className="w-full border-0 text-[16px] text-[var(--color-text)] outline-0"
              />
            </div>
            {errors.confirmPassword && (
              <div
                id="confirmPassword-error"
                className="mt-[6px] text-[12px] text-[var(--color-danger)]"
              >
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="h-[56px] w-full rounded-full border-0 bg-[var(--color-primary)] text-[18px] font-semibold text-[var(--color-bg)] shadow-[var(--shadow)] transition-[transform,filter] duration-150 ease-in disabled:opacity-60 not-disabled:hover:brightness-[0.98] not-disabled:active:translate-y-px"
            disabled={isDisabled}
          >
            {isSubmitting ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="mt-[18px] mb-[24px] text-[var(--color-text-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-primary)] no-underline hover:underline">
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}
