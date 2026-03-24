import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import DonorDashboard from './DonorDashboard';
import NgoDashboard from './NgoDashboard';
import VolunteerDashboard from './VolunteerDashboard';
import AdminDashboard from './AdminDashboard';
import ImpactDashboard from './ImpactDashboard';
import NotificationBell from './NotificationBell';
import Leaderboard from './Leaderboard';
import { LayoutDashboard, Heart, Truck, ShieldAlert, BarChart3, LogOut, Flame } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div className="flex-center" style={{ height: '100vh' }}>Loading Secure Session...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f9ff' }}>
      {/* Sidebar Navigation */}
      <aside style={{ 
        width: '260px', 
        background: 'white', 
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh'
      }}>
        <div className="nav-logo" style={{ marginBottom: '3rem', padding: '0 1rem' }}>
          🌱 Smart Food
        </div>

        <nav style={{ flex: 1 }}>
          <Link to="/dashboard" className="list-item gap-1" style={{ border: 'none', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/dashboard/impact" className="list-item gap-1" style={{ border: 'none', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
            <BarChart3 size={20} /> Our Impact
          </Link>
          
          {user.role === 'ADMIN' && (
            <Link to="/dashboard/admin" className="list-item gap-1" style={{ border: 'none', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              <ShieldAlert size={20} /> Admin Panel
            </Link>
          )}

          <div style={{ marginTop: '2rem' }}>
             <Leaderboard />
          </div>
        </nav>

        <button onClick={handleLogout} className="btn btn-outline gap-05" style={{ marginTop: 'auto', width: '100%' }}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Welcome back, {user.name}</h1>
            <p style={{ color: '#64748b' }}>Account Role: <span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role}</span></p>
          </div>
          <div className="flex-center gap-1">
            <NotificationBell userId={user.id} />
            <div className="glass-card" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
              Status: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>● Active</span>
            </div>
          </div>
        </header>

        <section className="container-fluid">
          <Routes>
            <Route index element={
               user.role === 'DONOR' ? <DonorDashboard user={user} /> :
               user.role === 'NGO' ? <NgoDashboard user={user} /> :
               user.role === 'VOLUNTEER' ? <VolunteerDashboard user={user} /> :
               <AdminDashboard />
            } />
            <Route path="impact" element={<ImpactDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}
