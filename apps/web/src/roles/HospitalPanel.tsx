import { useState } from 'react';

type CaseRow = {
  id: string;
  type: string;
  severity: string;
  beds: number;
  status: 'pending' | 'accepted' | 'rejected';
};

const initial: CaseRow[] = [
  { id: 'EM-1042', type: 'Cardiac', severity: 'Critical', beds: 1, status: 'pending' },
  { id: 'EM-1043', type: 'Trauma', severity: 'Serious', beds: 2, status: 'pending' },
  { id: 'EM-1044', type: 'Respiratory', severity: 'Serious', beds: 1, status: 'pending' },
];

export default function HospitalPanel({ notify }: { notify: (text: string) => void }) {
  const [rows, setRows] = useState(initial);

  function decide(id: string, status: CaseRow['status']) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    notify(`${id} ${status}`);
  }

  return (
    <section className="workspace single">
      <article className="panel">
        <p className="eyebrow">HOSPITAL - INCOMING CASES</p>
        <h2>St. Mary General - ICU 4, Beds 18</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Case</th><th>Type</th><th>Severity</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.type}</td>
                  <td>{r.severity}</td>
                  <td><span className={`badge ${r.status}`}>{r.status}</span></td>
                  <td>
                    <div className="row compact">
                      <button className="btn primary small" type="button" disabled={r.status !== 'pending'} onClick={() => decide(r.id, 'accepted')}>Accept</button>
                      <button className="btn ghost small" type="button" disabled={r.status !== 'pending'} onClick={() => decide(r.id, 'rejected')}>Decline</button>
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
