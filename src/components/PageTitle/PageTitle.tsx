type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-4">
      <h1 className="fw-bold mb-1">{title}</h1>
      {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
    </div>
  );
}
