import './Home.css';

import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import { getUserPlants, saveUserPlants } from '../../mocks/userPlants';
import { Plant, WateringEntry } from 'src/types/plant';
import { getWateringReminder } from '@utils/reminders';
import { addDays, daysUntil } from '@utils/dates';
import { PlantUrgentCard } from '@components/PlantUrgentCard/PlantUrgentCard';
import { UpcomingList } from '@components/UpcomingList/UpcomingList';

export default function Home() {
  const { user } = useAuth();
  const [plants, setPlants] = useState<Plant[]>(getUserPlants);

  const { urgent, upcoming } = useMemo(() => {
    const urgentList: Plant[] = [];
    const upcomingList: Plant[] = [];

    for (const plant of plants) {
      const reminder = getWateringReminder(plant);
      if (reminder.status === 'overdue' || reminder.status === 'due') {
        urgentList.push(plant);
      } else {
        const nextDate = addDays(new Date(plant.lastWatered), plant.wateringFrequency);
        const days = daysUntil(nextDate);
        if (days > 0 && days <= 5) {
          upcomingList.push(plant);
        }
      }
    }

    upcomingList.sort((a, b) => {
      const daysA = daysUntil(addDays(new Date(a.lastWatered), a.wateringFrequency));
      const daysB = daysUntil(addDays(new Date(b.lastWatered), b.wateringFrequency));
      return daysA - daysB;
    });

    return { urgent: urgentList, upcoming: upcomingList };
  }, [plants]);

  const handleWater = useCallback((plantId: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: WateringEntry = { date: today };

    setPlants((prev) => {
      const next = prev.map((p) => {
        if (p.id !== plantId) return p;
        return {
          ...p,
          lastWatered: today,
          wateringHistory: [...(p.wateringHistory ?? []), newEntry],
        };
      });
      saveUserPlants(next);
      return next;
    });
  }, []);

  const totalPlants = plants.length;
  const overdueCount = urgent.filter(
    (p) => getWateringReminder(p).status === 'overdue',
  ).length;
  const dueCount = urgent.filter(
    (p) => getWateringReminder(p).status === 'due',
  ).length;

  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="dashboard">
      <header className="dashboard__greeting">
        <h1 className="dashboard__hello">Good morning, {firstName}</h1>
        <p className="dashboard__date">{dateLabel}</p>
      </header>

      <div className="dashboard__stats">
        <div className="dashboard__stat">
          <span className="dashboard__stat-value">{totalPlants}</span>
          <span className="dashboard__stat-label">Total plants</span>
        </div>
        <div className="dashboard__stat">
          <span className={`dashboard__stat-value${overdueCount > 0 ? ' dashboard__stat-value--danger' : ''}`}>
            {overdueCount}
          </span>
          <span className="dashboard__stat-label">Overdue</span>
        </div>
        <div className="dashboard__stat">
          <span className={`dashboard__stat-value${dueCount > 0 ? ' dashboard__stat-value--warning' : ''}`}>
            {dueCount}
          </span>
          <span className="dashboard__stat-label">Water today</span>
        </div>
      </div>

      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">
            <i className="bi bi-exclamation-triangle" />
            Needs attention
          </h2>
          <Link to="/my-plants" className="dashboard__section-link">
            View all <i className="bi bi-chevron-right" />
          </Link>
        </div>

        {urgent.length > 0 ? (
          <div className="dashboard__urgent-scroll">
            {urgent.map((plant) => (
              <PlantUrgentCard
                key={plant.id}
                plant={plant}
                onWater={handleWater}
              />
            ))}
          </div>
        ) : (
          <div className="dashboard__all-good">
            <span className="dashboard__all-good-icon">&#127793;</span>
            <div className="dashboard__all-good-text">
              <p className="dashboard__all-good-title">All plants are happy!</p>
              <p className="dashboard__all-good-sub">No watering needed right now.</p>
            </div>
          </div>
        )}
      </section>

      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">
            <i className="bi bi-calendar-event" />
            Upcoming this week
          </h2>
        </div>
        <UpcomingList plants={upcoming} />
      </section>
    </div>
  );
}
