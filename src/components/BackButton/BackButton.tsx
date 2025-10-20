import './BackButton.css'

import { useLocation, useNavigate } from "react-router-dom";


type BackButtonProps = {
    fallback?: string;
    className?: string;
    ariaLabel?: string;
    disabledIfNoBack?: boolean;
}

export default function BackButton({ fallback = '/my-plants', className = '', ariaLabel = 'Go back', disabledIfNoBack = false }: BackButtonProps) {

    const navigate = useNavigate();
    const { key } = useLocation();
    
    const canGoBack = key !== "default" && typeof window !== "undefined" && window.history.length > 1;

    const handleClick = () => {
        if (canGoBack) {
            navigate(-1);
        } else {
           navigate(fallback, { replace: true });
        }
    }
    
    return (
        <button type="button" className={`btn-icon ${className}`} aria-label={ariaLabel} onClick={handleClick} disabled={disabledIfNoBack && !canGoBack}>
            <i className="bi bi-arrow-left" />
        </button>
    )
}