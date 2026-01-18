import { useAuth0 } from '@auth0/auth0-react'
import { Search, Bell, User, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { user, logout } = useAuth0()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="h-16 bg-background-secondary border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search decisions, outcomes, or insights... (⌘K)"
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-surface transition-colors">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors"
          >
            {user?.picture ? (
              <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary-400" />
              </div>
            )}
            <div className="text-left hidden lg:block">
              <p className="text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-xs text-text-tertiary">Administrator</p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 glass-lg rounded-lg overflow-hidden z-50">
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
