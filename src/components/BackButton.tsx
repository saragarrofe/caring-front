import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
  fallback?: string;
  className?: string;
  ariaLabel?: string;
  disabledIfNoBack?: boolean;
};

export default function BackButton({
  fallback = '/my-plants',
  className = '',
  ariaLabel = 'Go back',
  disabledIfNoBack = false,
}: BackButtonProps) {
  const navigate = useNavigate();
  const { key } = useLocation();

  const canGoBack = key !== 'default' && typeof window !== 'undefined' && window.history.length > 1;

  const handleClick = () => {
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  };

  return (
    <button
      type="button"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border-0 bg-transparent text-[var(--color-text)] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)] ${className}`}
      aria-label={ariaLabel}
      onClick={handleClick}
      disabled={disabledIfNoBack && !canGoBack}
    >
      <ArrowLeft size={20} />
    </button>
  );
}
