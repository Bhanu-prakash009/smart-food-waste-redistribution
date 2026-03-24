import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, MapPin, Shield } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'DONOR',
    location: '',
    latitude: 20.5937, // Default India
    longitude: 78.9629
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please check your details.';
      alert(msg);
    }
  };

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setFormData({
          ...formData,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        alert('Location captured! Coordinates updated.');
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%', padding: '2rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary)' }}>Join the Movement</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label><User size={16} /> Full Name / Organization</label>
            <input type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label><Mail size={16} /> Email Address</label>
            <input type="email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label><Lock size={16} /> Password</label>
            <input type="password" className="input-field" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>
          <div className="form-group">
            <label><Shield size={16} /> Your Role</label>
            <select className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ backgroundColor: 'white' }}>
              <option value="DONOR">Food Donor (Restaurant/Hotel)</option>
              <option value="NGO">NGO / Organization</option>
              <option value="VOLUNTEER">Individual Volunteer (Pickup/Delivery)</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>
          <div className="form-group">
            <label><MapPin size={16} /> Pickup/Base Address</label>
            <input type="text" className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g., Downtown, Mumbai" required />
            <button type="button" onClick={getMyLocation} className="btn btn-outline btn-sm" style={{ marginTop: '0.5rem' }}>
              📍 Attach Current GPS Coordinates
            </button>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register & Start Saving Food</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Already part of the community? <Link to="/login" style={{ fontWeight: '600' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
