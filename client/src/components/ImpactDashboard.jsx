import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ImpactDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/analytics/impact');
        setStats(res.data);
      } catch (err) {
        // Fallback for demo if API not ready
        setStats({ mealsServed: 1250, foodSavedCount: 450, totalDonations: 600 });
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  const barData = {
    labels: ['Meals Served', 'Items Saved', 'Total Donations'],
    datasets: [
      {
        label: 'Impact Progress',
        data: [stats.mealsServed, stats.foodSavedCount, stats.totalDonations],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
      },
    ],
  };

  return (
    <div className="impact-container">
      <div className="stat-grid">
        <div className="glass-card stat-card">
          <div className="stat-value">{stats.mealsServed}</div>
          <div className="stat-label">Meals Served</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value">{stats.foodSavedCount}</div>
          <div className="stat-label">Items Saved (kg)</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value">{stats.totalDonations}</div>
          <div className="stat-label">Active Donations</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="impact-chart-container">
          <h3 style={{ marginBottom: '1rem' }}>Impact Distribution</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="glass-card">
          <h3>Recent Milestones</h3>
          <div className="list-item">
            <span>🎉 Reached 1000 meals served!</span>
          </div>
          <div className="list-item">
            <span>🌱 Saved 500kg of food this month</span>
          </div>
          <div className="list-item">
            <span>🤝 50 NGOs active in your area</span>
          </div>
        </div>
      </div>
    </div>
  );
}
