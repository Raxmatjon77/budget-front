import { Link, useLocation } from 'react-router-dom';
import { Wallet, LayoutDashboard, Receipt, TrendingUp, List } from 'lucide-react';
import { cn } from '@/utils/format';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: List },
  { path: '/statistics', label: 'Statistics', icon: TrendingUp },
];

export function AppHeader() {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-neutral-900">
              Family Finance
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
