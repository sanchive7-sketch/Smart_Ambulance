import { useState } from 'react';
import { Ambulance, MapPin } from 'lucide-react';

type MissionStatus = 'offered' | 'accepted' | 'rejected' | 'enroute' | 'completed';

export default function DriverPanel({ notify }: { notify: (text: string) => void }) {
  const [status, setStatus] = useState<MissionStatus>('offered');
  const [consented, setConsented] = useState(false);
  const [sharing, setSharing] = useState(false);

  const sharingActive = consented && sharing && (status === 'accepted' || status === 'enroute');

  function change(next: MissionStatus, message: string) {
    setStatus(next);
    notify(message);
  }

  return (
    <section className="workspace single">
      <article className="panel">
        <p className="eyebrow">DRIVER APP - ACTIVE MISSION</p>
        <div className="mission">
          <Ambulance size={28} />
          <div>
            <h2>AMB-KA-07 - Cardiac pickup</h2>
            <p>3.2 km away - ALS + cardiac + oxygen. Patient at 12.9716, 77.5946.</p>
          </div>
          <span className={`badge ${status}`}>{status}</span>
        </div>
        <div className="row">
          <button className="btn primary" type="button" disabled={status !== 'offered'} onClick={() => change('accepted', 'Mission accepted')}>Accept</button>
          <button className="btn ghost" type="button" disabled={status !== 'offered'} onClick={() => change('rejected', 'Mission declined')}>Reject</button>
          <button className="btn ghost" type="button" disabled={status !== 'accepted'} onClick={() => change('enroute', 'En route to patient')}>Start trip</button>
          <button className="btn ghost" type="button" disabled={status !== 'enroute'} onClick={() => change('completed', 'Mission completed')}>Complete</button>
        </div>
        <div className="consent">
          <label className="check"><input type="checkbox" checked={consented} onChange={(e) => setConsented(e.target.checked)} /> I consent to share location during this mission</label>
          <label className="check"><input type="checkbox" checked={sharing} disabled={!consented} onChange={(e) => setSharing(e.target.checked)} /> Share live location</label>
          <p className="hint"><MapPin size={14} /> {sharingActive ? 'Sharing location with command centre' : 'Location is off. Sharing needs consent and an accepted mission.'}</p>
        </div>
      </article>
    </section>
  );
}
