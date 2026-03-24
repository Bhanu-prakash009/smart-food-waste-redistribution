import { useState, useEffect } from 'react';
import axios from 'axios';
import ImpactDashboard from './ImpactDashboard';
import { ShieldCheck, Users, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking user list for demo since admin API logic is secondary to UI
    setUsers([
      { id: 1, name: 'Green NGO', email: 'ngo@green.com', role: 'NGO', isVerified: true },
      { id: 2, name: 'Royal Hotel', email: 'hotel@royal.com', role: 'DONOR', isVerified: false },
      { id: 3, name: 'John Doe', email: 'john@vol.com', role: 'VOLUNTEER', isVerified: true },
    ]);
    setLoading(false);
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Global Command Center</h2>
      <ImpactDashboard />

      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <div className="flex-center gap-1" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
          <Users size={24} color="var(--primary)" />
          <h3 style={{ margin: 0 }}>Pending Registrations</h3>
        </div>

        <div className="list-container">
          {users.map((u) => (
            <div key={u.id} className="list-item">
              <div>
                <strong>{u.name}</strong> <span className={`role-badge role-${u.role.toLowerCase()}`}>{u.role}</span>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.email}</p>
              </div>
              <div>
                {!u.isVerified ? (
                  <button className="btn btn-primary btn-sm">Verify User</button>
                ) : (
                  <ShieldCheck color="var(--primary)" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
