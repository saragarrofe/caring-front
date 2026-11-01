import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Mi jardín', icon: '' },
  { to: '/coleccion', label: 'Colección', icon: '🃏' },
  { to: '/explora', label: 'El botánico', icon: '' },
] as const;

export function Sidebar() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full bg-card/90 p-1.5 shadow-soft backdrop-blur">
      {items.map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
        >
          <span>{i.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
