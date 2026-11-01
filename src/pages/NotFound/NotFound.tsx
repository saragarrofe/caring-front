import { Link } from 'react-router-dom';
import { PageTitle } from '@components/PageTitle/PageTitle';

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <PageTitle
        title="404 — Page not found"
        subtitle="The route you are trying to access does not exist."
      />
      <Link
        to="/"
        className="inline-block rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Go back home
      </Link>
    </div>
  );
}
