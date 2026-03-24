import { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import { Truck, MapPin, Clock } from 'lucide-react';

export default function VolunteerDashboard({ user }) {
  const [nearbyFood, setNearbyFood] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNearbyFood = async () => {
    try {
      // radius 10km default
      const res = await axios.get(`http://localhost:8080/api/food/nearby?userId=${user.id}&radius=10`);
      setNearbyFood(res.data);
    } catch (err) {
      console.error('Failed to fetch food', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyFood();
  }, []);

  const handleAcceptPickup = async (foodItemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/food/${foodItemId}/request`, {
        volunteerId: user.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Pickup accepted! You can now start tracking.');
      fetchNearbyFood();
    } catch (err) {
      alert('Error accepting pickup.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Nearby Pickup Tasks</h2>
        <button onClick={fetchNearbyFood} className="btn btn-outline btn-sm">Refresh Radar</button>
      </div>

      <MapComponent items={nearbyFood} userLocation={[user.latitude || 20.5937, user.longitude || 78.9629]} />

      <div className="grid-2">
        {nearbyFood.map((item) => (
          <div key={item.id} className="glass-card" style={{ marginBottom: '1rem' }}>
            <div className="flex-center gap-05" style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
              <Truck size={18} color="var(--primary)" />
              <h3 style={{ margin: 0 }}>{item.name}</h3>
            </div>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
              <MapPin size={16} color="#64748b" /> {item.pickupAddress || 'Location Mocked'}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
              <Clock size={16} /> Expires: {new Date(item.expiryTime).toLocaleTimeString()}
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <button 
                onClick={() => handleAcceptPickup(item.id)} 
                className="btn btn-primary" 
                style={{ width: '100%' }}
              >
                Accept Delivery Job
              </button>
            </div>
          </div>
        ))}
        {nearbyFood.length === 0 && <p>No tasks found within 10km.</p>}
      </div>
    </div>
  );
}
