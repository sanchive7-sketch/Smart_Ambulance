import { Ambulance, Activity, Building2, CircleAlert } from 'lucide-react';
import type { Overview } from './types';

export default function CommandCentre({ overview }: { overview: Overview | null }) {
  const cards = [
    { label: 'Active cases', value: overview?.activeCases ?? '-', icon: CircleAlert, tone: 'red' },
    { label: 'Available ambulances', value: overview?.availableAmbulances ?? '-', icon: Ambulance, tone: 'blue' },
    { label: 'Average response', value: overview ? `${overview.averageResponseMinutes} min` : '-', icon: Activity, tone: 'teal' },
    { label: 'Hospital load', value: overview ? `${overview.hospitalLoadPercent}%` : '-', icon: Building2, tone: 'amber' },
  ];

  return (
    <>
      <section className="hero">
        <p className="eyebrow">LOCAL DEVELOPMENT</p>
        <h1>Smart Emergency Response Platform</h1>
        <p>Build one reliable flow first: emergency request to medically suitable ambulance and hospital allocation.</p>
      </section>

      <section className="metrics" aria-label="Emergency overview" aria-busy={overview === null}>
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <article className={`metric ${tone}`} key={label}><Icon size={20} /><p>{label}</p><strong>{value}</strong></article>
        ))}
      </section>

      <section className="workspace">
        <article className="panel matching">
          <p className="eyebrow">SMART ALLOCATION - DEVELOPMENT EXAMPLE</p>
          <h2>Cardiac emergency: choose the capable ambulance</h2>
          <div className="comparison">
            <div className="ambulance-card rejected"><Ambulance size={24} /><h3>AMB-KA-22</h3><p>2.3 km - BLS + oxygen</p><span>Not selected: no cardiac capability</span></div>
            <div className="ambulance-card selected"><Ambulance size={24} /><h3>AMB-KA-07</h3><p>3.2 km - ALS + cardiac + oxygen</p><span>Selected: medically suitable</span></div>
          </div>
        </article>
        <aside className="panel next">
          <p className="eyebrow">NEXT IMPLEMENTATION TASKS</p>
          <ol>
            <li>Create Prisma migration and fictional seed data.</li>
            <li>Add secure login and role-based API access.</li>
            <li>Build ambulance and hospital admin management.</li>
            <li>Implement emergency request and scoring endpoint.</li>
          </ol>
          <a href="http://localhost:4000/health" target="_blank" rel="noreferrer">Open API health check</a>
        </aside>
      </section>
    </>
  );
}
