import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-4">
      <h1>404 — Página no encontrada</h1>
      <p>La ruta a la que intentas acceder no existe.</p>
      <Link to="/">Volver a la home</Link>
    </div>
  );
}
