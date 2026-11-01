import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import { LoginErrors, validateData } from 'src/types/LogIn';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(true);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateData(email, password);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setIsSubmitting(true);
      setErrors({});
      await login(email, password);
      navigate('/my-plants');
    } catch {
      setErrors({ form: 'Email or password incorrect' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const isDisabled = !email || !password || isSubmitting;

  const inputWrapBase =
    'relative flex items-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg)] py-[12px] pr-[14px] pl-[44px] shadow-[var(--shadow)]';

  return (
    <main className="grid min-h-[100svh] grid-rows-[auto_1fr_auto] bg-[var(--color-bg)]">
      <div
        className="h-[220px] max-[360px]:h-[190px] bg-[var(--color-bg-hero)] bg-cover bg-center bg-no-repeat [clip-path:ellipse(120%_70%_at_50%_0%)]"
        aria-hidden
      />

      <section className="mx-auto w-[min(92%,420px)] text-center">
        <h1 className="mt-[12px] mb-[4px] text-[28px] font-bold text-[var(--color-primary)]">
          Welcome back!
        </h1>
        <p className="mt-0 mb-[20px] text-[var(--color-text)] opacity-85">Log in to your account</p>

        <form onSubmit={handleSubmit} noValidate>
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
                type="email"
                placeholder="example@caring.com"
                value={email}
                onChange={handleOnChangeEmail}
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

          <div className="mb-[8px]">
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
                type="password"
                placeholder="write your password"
                value={password}
                onChange={handleOnChangePassword}
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

          <div className="mb-[16px] flex items-center justify-between gap-[12px]">
            <label className="inline-flex cursor-pointer items-center gap-[10px] text-[var(--color-text-muted)] select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="peer hidden"
              />
              <span
                className="relative inline-block h-[18px] w-[18px] rounded-full border-2 border-[var(--color-primary)] peer-checked:bg-[var(--color-primary)] peer-checked:after:absolute peer-checked:after:inset-0 peer-checked:after:bg-[var(--color-bg)] peer-checked:after:content-[''] peer-checked:after:[mask:url('data:image/svg+xml;utf8,<svg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2218%22_height=%2218%22><path_d=%22M4_9.5_8_13l6-8%22_stroke=%22white%22_stroke-width=%222%22_fill=%22none%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22/></svg>')_center/12px_12px_no-repeat]"
                aria-hidden
              />
              <span>Remember me</span>
            </label>

            <Link
              className="text-[var(--color-text-muted)] no-underline hover:underline"
              to="/forgot-password"
            >
              Forget Password?
            </Link>
          </div>

          {errors.form && (
            <div className="mb-[8px] text-[12px] text-[var(--color-danger)]">{errors.form}</div>
          )}

          <button
            type="submit"
            className="h-[56px] w-full rounded-full border-0 bg-[var(--color-primary)] text-[18px] font-semibold text-[var(--color-bg)] shadow-[var(--shadow)] transition-[transform,filter] duration-150 ease-in disabled:opacity-60 not-disabled:hover:brightness-[0.98] not-disabled:active:translate-y-px"
            disabled={isDisabled}
          >
            {isSubmitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="mt-[18px] mb-[24px] text-[var(--color-text-muted)]">
          Don’t have an account?{' '}
          <Link to="/register" className="text-[var(--color-primary)] no-underline hover:underline">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}
