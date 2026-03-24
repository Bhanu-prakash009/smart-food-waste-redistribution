import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell } from 'lucide-react';

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8080/api/notifications/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data);
      } catch (err) {
        // Fallback for demo
        setNotifications([
          { id: 1, message: 'New food item nearby!', type: 'MATCH', isRead: false },
          { id: 2, message: 'Listing "50 Sandwiches" has expired.', type: 'EXPIRY', isRead: true }
        ]);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setShow(!show)} className="btn btn-outline btn-sm" style={{ padding: '0.4rem', borderRadius: '50%' }}>
        <Bell size={20} />
        {unreadCount > 0 && (
          <span style={{ 
            position: 'absolute', top: '-5px', right: '-5px', 
            background: '#ef4444', color: 'white', 
            fontSize: '0.7rem', padding: '0.1rem 0.3rem', 
            borderRadius: '50%', border: '2px solid white' 
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {show && (
        <div className="glass-card" style={{ 
          position: 'absolute', top: '45px', right: 0, 
          width: '300px', zindex: 1000, 
          maxHeight: '400px', overflowY: 'auto',
          padding: '1rem'
        }}>
          <h4 style={{ marginBottom: '1rem' }}>Notifications</h4>
          {notifications.map(n => (
            <div key={n.id} style={{ 
              padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9',
              opacity: n.isRead ? 0.6 : 1
            }}>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>{n.message}</p>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>{n.type}</span>
            </div>
          ))}
          {notifications.length === 0 && <p style={{ textAlign: 'center', color: '#64748b' }}>No alerts yet.</p>}
        </div>
      )}
    </div>
  );
}
