import './Welcome.css';
import { Link } from "react-router-dom";


export default function Welcome() {
  return (
    <main className="welcome">
      <header className="welcome-header">
        <h1 className="welcome-title">Welcome to Caring</h1>
        <p className="welcome-sub">Reminders, tips and a happy jungle at home</p>
      </header>
        <div className="welcome-cta">
            <Link to="/login" className="btn btn-lg btn-success w-100 mb-2">LOG IN</Link>
            <Link to="/register" className="btn btn-lg btn-outline-secondary w-100">SIGN UP</Link>
            <div className="text-center mt-3">
              <div className="welcome-legal">
                    By signing in you confirm our&nbsp;
                    {/* TO DO: Añadir handleTerms */}
                    <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
                    &nbsp;&amp;&nbsp;
                    {/* TO DO: Añadir handlePrivacyPolicy */}
                    <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a> 
                </div>
            </div>
        </div>
        {/* TO DO: Añadir handleSkipRegistration */}
        <button className="welcome-skip" onClick={() => { window.location.href = '/discover'; }}> 
            Skip registration
        </button>

    </main>
  );
}