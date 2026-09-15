import type { Overview } from './types';

export default function AdminPanel({ overview, notify }: { overview: Overview | null; notify: (text: string) => void }) {
  const ambulances = [
    { code: 'AMB-KA-07', caps: 'ALS + cardiac', status: 'available' },
    { code: 'AMB-KA-22', caps: 'BLS + oxygen', status: 'available' },
    { code: 'AMB-KA-31', caps: 'ALS + trauma', status: 'assigned' },
  ];
  const audit = [
    { id: 'A-901', action: 'assignment.created', entity: 'EM-1042' },
    { id: 'A-902', action: 'hospital.accepted', entity: 'EM-1042' },
    { id: 'A-903', action: 'corridor.requested', entity: 'GC-201' },
  ];

  return (
    <section className="workspace single">
      <article className="panel">
        <p className="eyebrow">ADMIN - FLEET AND AUDIT</p>
        <h2>Active cases {overview?.activeCases ?? '-'} - {overview?.availableAmbulances ?? '-'} ambulances free</h2>
        <div className="role-grid">
          <div>
            <h3>Fleet</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Unit</th><th>Capability</th><th>Status</th></tr></thead>
                <tbody>
                  {ambulances.map((a) => (
                    <tr key={a.code}><td>{a.code}</td><td>{a.caps}</td><td><span className={`badge ${a.status}`}>{a.status}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <button className="btn ghost small" type="button" onClick={() => notify('Manual reassignment opens after matching API lands')}>Reassign</button>
            </div>
          </div>
          <div>
            <h3>Audit trail</h3>
            <ul className="audit">
              {audit.map((a) => (
                <li key={a.id}><strong>{a.action}</strong><span>{a.entity} - {a.id}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}
