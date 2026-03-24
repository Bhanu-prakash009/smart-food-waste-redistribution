import { Award, Star, Flame } from 'lucide-react';

export default function Leaderboard() {
  const leaders = [
    { name: 'Royal Hotel', impact: '1,240 meals', points: 450, icon: <Flame color="#f59e0b" /> },
    { name: 'Helping Hands NGO', impact: '980 meals', points: 380, icon: <Star color="#fbbf24" /> },
    { name: 'Community Kitchen', impact: '750 meals', points: 310, icon: <Award color="#94a3b8" /> },
  ];

  return (
    <div className="glass-card">
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Award color="var(--primary)" /> Top Food Saviors
      </h3>
      <div className="list-container">
        {leaders.map((l, index) => (
          <div key={l.name} className="list-item" style={{ border: 'none', background: index === 0 ? '#f0fdf4' : 'transparent', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
            <div className="flex-center gap-1" style={{ justifyContent: 'flex-start' }}>
              <span style={{ fontWeight: 800, color: '#94a3b8', width: '20px' }}>{index + 1}</span>
              {l.icon}
              <div>
                <div style={{ fontWeight: 600 }}>{l.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{l.impact} shared</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{l.points} pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
