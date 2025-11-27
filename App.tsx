
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom';
import { LogOut, LayoutDashboard, Wallet, DollarSign, Trophy, Menu, X, Rocket, User as UserIcon } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Earn from './pages/Earn';
import Cashout from './pages/Cashout';
import Leaderboard from './pages/Leaderboard';
import UserProfile from './pages/UserProfile';
import Landing from './pages/Landing';
import AiAssistant from './components/AiAssistant';
import { MOCK_TASKS } from './constants';
import { User } from './types';

// Mock Auth State
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = () => setUser({
    id: 'u1',
    username: 'AlexUser99',
    email: 'alex.user99@example.com',
    balance: 187500, // IDR
    level: 5,
    completedTasks: 42,
    xp: 2450,
    joinDate: '2023-08-15',
    avatar: 'https://picsum.photos/200?random=100',
    location: 'Jakarta, Indonesia',
    bio: 'Pencari cuan antusias 🚀 | Gamer & Survey Expert'
  });

  const logout = () => setUser(null);

  return { user, login, logout };
};

const ProtectedLayout: React.FC<{ children: React.ReactNode; user: User; logout: () => void }> = ({ children, user, logout }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dasbor', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Hasilkan', icon: DollarSign, path: '/earn' },
    { name: 'Penarikan', icon: Wallet, path: '/cashout' },
    { name: 'Peringkat', icon: Trophy, path: '/leaderboard' },
    { name: 'Profil', icon: UserIcon, path: '/profile' },
  ];

  return (
    <div className="flex min-h-screen bg-dark text-slate-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-card sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <Rocket className="text-secondary" size={28} />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Rezeki.online
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <NavLink to="/profile" className="flex items-center gap-3 mb-4 px-2 hover:bg-slate-800 rounded-lg p-2 transition-colors">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 overflow-hidden flex-shrink-0">
               {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : 
                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-primary to-purple-500 text-white font-bold">{user.username.charAt(0)}</div>
               }
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.username}</p>
              <p className="text-xs text-secondary font-bold">Rp {user.balance.toLocaleString('id-ID')}</p>
            </div>
          </NavLink>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-card border-b border-slate-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Rocket className="text-secondary" size={24} />
          <span className="text-xl font-bold">Rezeki.online</span>
        </div>
        <div className="flex items-center gap-3">
          <NavLink to="/profile" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 overflow-hidden">
             {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : 
               <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-primary to-purple-500 text-white font-bold text-xs">{user.username.charAt(0)}</div>
             }
          </NavLink>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-dark pt-16 px-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-4 rounded-lg text-lg ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-400'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            ))}
            <button onClick={logout} className="flex items-center gap-3 px-4 py-4 text-lg text-red-400 w-full">
               <LogOut size={20} /> Keluar
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0 overflow-x-hidden">
        {children}
      </main>

      <AiAssistant 
        tasks={MOCK_TASKS} 
        onRecommend={(ids) => {
          // Dispatch custom event to notify Earn page
          const event = new CustomEvent('task-recommendation', { detail: ids });
          window.dispatchEvent(event);
          // Also navigate to Earn if not there
          if (location.pathname !== '/earn') {
            window.location.hash = '#/earn';
          }
        }} 
      />
    </div>
  );
};

function App() {
  const { user, login, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Landing onLogin={login} /> : <Navigate to="/dashboard" />} />
        
        <Route path="/dashboard" element={
          user ? (
            <ProtectedLayout user={user} logout={logout}>
              <Dashboard />
            </ProtectedLayout>
          ) : <Navigate to="/" />
        } />
        
        <Route path="/earn" element={
          user ? (
            <ProtectedLayout user={user} logout={logout}>
              <Earn />
            </ProtectedLayout>
          ) : <Navigate to="/" />
        } />

        <Route path="/cashout" element={
          user ? (
            <ProtectedLayout user={user} logout={logout}>
              <Cashout user={user} />
            </ProtectedLayout>
          ) : <Navigate to="/" />
        } />

        <Route path="/leaderboard" element={
          user ? (
            <ProtectedLayout user={user} logout={logout}>
              <Leaderboard />
            </ProtectedLayout>
          ) : <Navigate to="/" />
        } />

        <Route path="/profile" element={
          user ? (
            <ProtectedLayout user={user} logout={logout}>
              <UserProfile user={user} logout={logout} />
            </ProtectedLayout>
          ) : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
