import { useState } from 'react';
import axios from 'axios';
import { Package, MapPin, Calculator, Image as ImageIcon } from 'lucide-react';

export default function DonorDashboard({ user }) {
  const [formData, setFormData] = useState({
    name: '', quantity: '', expiryTime: '', 
    pickupAddress: user.location, 
    category: 'Cooked',
    latitude: user.latitude || 20.5937,
    longitude: user.longitude || 78.9629,
    estimatedMeals: 10
  });
  
  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      // Ensure date is in ISO format (YYYY-MM-DDTHH:mm:ss)
      const formattedData = {
        ...formData,
        expiryTime: formData.expiryTime.includes('T') ? formData.expiryTime : formData.expiryTime.replace(' ', 'T')
      };
      
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/food/add?donorId=${user.id}`, formattedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Food listing added successfully! Notifications sent to nearby NGOs.');
      setFormData({ ...formData, name: '', quantity: '', expiryTime: '' });
    } catch (err) {
      alert('Error adding food listing');
    }
  };

  return (
    <div className="grid-2">
      <div className="glass-card">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Broadcast Surplus Food</h2>
        <form onSubmit={handleAddFood}>
          <div className="form-group">
            <label><Package size={16} /> Food Item / Description</label>
            <input type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g., Curry & Rice" required />
          </div>

          <div className="form-group">
            <label>Quantity / Weight</label>
            <input type="text" className="input-field" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} placeholder="e.g., 5kg or 20 plates" required />
          </div>

          
          <div className="grid-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label>Category</label>
              <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="Cooked">Cooked Food</option>
                <option value="Raw">Raw Ingredients</option>
                <option value="Bakery">Bakery / Bread</option>
                <option value="Fruits">Fruits / Veggies</option>
              </select>
            </div>
            <div className="form-group">
              <label><Calculator size={16} /> Est. Meals</label>
              <input type="number" className="input-field" value={formData.estimatedMeals} onChange={e => setFormData({...formData, estimatedMeals: e.target.value})} />
            </div>
          </div>

          <div className="form-group">
            <label><MapPin size={16} /> Pickup Address for this item</label>
            <input type="text" className="input-field" value={formData.pickupAddress} onChange={e => setFormData({...formData, pickupAddress: e.target.value})} required />
          </div>

          <div className="form-group">
            <label>Expiry Time</label>
            <input type="datetime-local" className="input-field" value={formData.expiryTime} onChange={e => setFormData({...formData, expiryTime: e.target.value})} required />
          </div>


          <button type="submit" className="btn btn-primary" style={{ width: '100%', paddingTop: '1rem', paddingBottom: '1rem' }}>
            List Food & Find NGOs
          </button>
        </form>
      </div>

      <div>
        <div className="glass-card" style={{ marginBottom: '2rem', background: 'var(--primary)', color: 'white' }}>
          <h2 style={{ marginBottom: '1rem', color: 'white' }}>Donor Status</h2>
          <div style={{ fontSize: '1.1rem' }}>
            <p>Verification: <strong>{user.isVerified ? 'Verified ✓' : 'Pending Verification'}</strong></p>
            <p style={{ marginTop: '0.5rem' }}>Total Impact: <strong>120 Meals Served</strong></p>
          </div>
        </div>
        
        <div className="glass-card">
          <h3>Why use Coordinates?</h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
            Our smart matching algorithm uses your GPS coordinates to find the nearest Volunteer 
            available for pickup, ensuring food stays fresh and delivery is fast.
          </p>
        </div>
      </div>
    </div>
  );
}
