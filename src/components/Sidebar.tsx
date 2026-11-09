import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/home', label: 'Mi jardín', icon: '' },
  { to: '/my-plants', label: 'Colección', icon: '🃏' },
  { to: '/explora', label: 'El botánico', icon: '' },
  { to: '/profile', label: 'Perfil', icon: '' },
] as const;

const sidebarLinkVariants = cva(
  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95',
  {
    variants: {
      status: {
        active: 'bg-primary text-primary-foreground shadow-sm font-semibold',
        inactive: 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
      },
    },
    defaultVariants: {
      status: 'inactive',
    },
  },
);

export function Sidebar() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full bg-card/90 p-1.5 shadow-soft backdrop-blur">
      {items.map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          className={({ isActive }) =>
            cn(sidebarLinkVariants({ status: isActive ? 'active' : 'inactive' }))
          }
        >
          <span className="active:text-green-500">{i.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
