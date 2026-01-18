import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  GitCompare, 
  Sparkles,
  Building2,
  Settings
} from 'lucide-react'
import { cn } from '@lib/utils'

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Decision Capture', href: '/capture', icon: Target },
  { name: 'Timeline View', href: '/timeline', icon: TrendingUp },
  { name: 'Compare', href: '/compare', icon: GitCompare },
  { name: 'Simulation Lab', href: '/simulate', icon: Sparkles },
  { name: 'Institutional', href: '/dashboard/government', icon: Building2 },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-background-secondary border-r border-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <h1 className="text-xl font-heading font-bold text-text-primary">
          <span className="text-primary-500">H</span>DIP
        </h1>
        <span className="ml-2 text-xs text-text-tertiary font-mono">v1.0</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('w-5 h-5', isActive && 'text-primary-400')} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-border">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface hover:text-text-primary transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </div>
    </aside>
  )
}
