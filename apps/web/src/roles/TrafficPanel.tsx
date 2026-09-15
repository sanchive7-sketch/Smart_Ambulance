import { useState } from 'react';

type Corridor = {
  id: string;
  emergencyId: string;
  route: string;
  reason: string;
  status: 'requested' | 'approved' | 'rejected';
};

const initial: Corridor[] = [
  { id: 'GC-201', emergencyId: 'EM-1042', route: 'MG Road to St. Mary General', reason: 'Critical cardiac, ETA 11 min', status: 'requested' },
  { id: 'GC-202', emergencyId: 'EM-1043', route: 'Ring Road to City Trauma', reason: 'Serious trauma, ETA 14 min', status: 'requested' },
];

export default function TrafficPanel({ notify }: { notify: (text: string) => void }) {
  const [rows, setRows] = useState(initial);

  function decide(id: string, status: Corridor['status']) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    notify(`${id} ${status}`);
  }

  return (
    <section className="workspace single">
      <article className="panel">
        <p className="eyebrow">TRAFFIC CONTROL - GREEN CORRIDOR</p>
        <h2>Corridor approvals</h2>
        <p className="safety-note">Digital request and approval only. This panel never operates public traffic signals.</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Request</th><th>Route</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}<br /><small>{r.emergencyId}</small></td>
                  <td>{r.route}</td>
                  <td>{r.reason}</td>
                  <td><span className={`badge ${r.status}`}>{r.status}</span></td>
                  <td>
                    <div className="row compact">
                      <button className="btn primary small" type="button" disabled={r.status !== 'requested'} onClick={() => decide(r.id, 'approved')}>Approve</button>
                      <button className="btn ghost small" type="button" disabled={r.status !== 'requested'} onClick={() => decide(r.id, 'rejected')}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
