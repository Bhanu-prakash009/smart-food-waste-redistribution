import { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import { Search, Map as MapIcon, Filter } from 'lucide-react';

export default function NgoDashboard({ user }) {
  const [availableFood, setAvailableFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(10); // Default 10km

  const fetchNearbyFood = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/food/nearby?userId=${user.id}&radius=${radius}`);
      setAvailableFood(res.data);
    } catch (err) {
      console.error('Failed to fetch food', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyFood();
  }, [radius]);

  const handleRequestFood = async (foodItemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/food/${foodItemId}/request`, {
        ngoId: user.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Pickup request accepted! A volunteer is being matched for delivery.');
      fetchNearbyFood(); 
    } catch (err) {
      alert('Failed to request food.');
    }
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Food Radar</h2>
            <p style={{ color: '#64748b' }}>Discover surplus food within your community radius.</p>
          </div>
          <div className="flex-center gap-1">
            <span style={{ fontSize: '0.9rem' }}>Search Radius:</span>
            <select className="input-field" style={{ marginBottom: 0, width: '120px' }} value={radius} onChange={e => setRadius(e.target.value)}>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="25">25 km</option>
              <option value="50">50 km</option>
            </select>
            <button onClick={fetchNearbyFood} className="btn btn-primary btn-sm">Scan Now</button>
          </div>
        </div>
      </div>

      <MapComponent items={availableFood} userLocation={[user.latitude || 20.5937, user.longitude || 78.9629]} />

      <div className="grid-2">
        {loading ? (
          <p>Scanning for surplus food...</p>
        ) : availableFood.length === 0 ? (
          <div className="glass-card flex-center" style={{ gridColumn: 'span 2', padding: '4rem', flexDirection: 'column' }}>
            <Search size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
            <p>No surplus food found within {radius}km of your location.</p>
          </div>
        ) : (
          availableFood.map(item => (
            <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                   <span className="badge badge-success">{item.category}</span>
                   <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.quantity}</span>
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
                   📍 {item.pickupAddress}
                </p>
              </div>
              <button onClick={() => handleRequestFood(item.id)} className="btn btn-primary" style={{ width: '100%' }}>
                Claim for Distribution
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
