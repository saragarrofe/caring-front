import { Link } from 'react-router-dom';
import { PageTitle } from '@components/PageTitle/PageTitle';

export default function NotFound() {
  return (
    <div className="container py-4">
      <PageTitle
        title="404 — Page not found"
        subtitle="The route you are trying to access does not exist."
      />
      <Link to="/" className="btn btn-outline-secondary btn-sm">
        Go back home
      </Link>
    </div>
  );
}
