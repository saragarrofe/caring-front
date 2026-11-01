type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-6">
      <h1 className="mb-1 font-bold">{title}</h1>
      {subtitle && <p className="mb-0 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
