import { useState } from 'react';
import type { FormEvent } from 'react';
import { LocateFixed, Send } from 'lucide-react';

export default function UserPanel({ notify }: { notify: (text: string) => void }) {
  const [emergencyType, setEmergencyType] = useState('cardiac');
  const [severity, setSeverity] = useState('critical');
  const [latitude, setLatitude] = useState('12.9716');
  const [longitude, setLongitude] = useState('77.5946');
  const [patientSummary, setPatientSummary] = useState('');
  const [locating, setLocating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function locate() {
    if (!('geolocation' in navigator)) {
      notify('Geolocation is not available in this browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
        setLocating(false);
        notify('Location captured from device');
      },
      () => {
        setLocating(false);
        notify('Could not read location, enter it manually');
      },
      { timeout: 8000 },
    );
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    notify('SOS draft saved locally, API wiring is next');
  }

  if (submitted) {
    return (
      <section className="workspace single">
        <article className="panel">
          <p className="eyebrow">USER APP - CONFIRMATION PREVIEW</p>
          <h2>Help request ready for dispatch</h2>
          <dl className="summary">
            <div><dt>Type</dt><dd>{emergencyType}</dd></div>
            <div><dt>Severity</dt><dd>{severity}</dd></div>
            <div><dt>Location</dt><dd>{latitude}, {longitude}</dd></div>
            <div><dt>Notes</dt><dd>{patientSummary || 'No additional notes'}</dd></div>
          </dl>
          <div className="row">
            <button className="btn primary" type="button" onClick={() => notify('Matching preview: AMB-KA-07 ALS cardiac, 3.2 km')}>Preview match</button>
            <button className="btn ghost" type="button" onClick={() => setSubmitted(false)}>Edit request</button>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="workspace single">
      <article className="panel">
        <p className="eyebrow">USER APP - SOS REQUEST</p>
        <h2>Request emergency help</h2>
        <form className="form-grid" onSubmit={submit}>
          <label className="field">Emergency type
            <select value={emergencyType} onChange={(e) => setEmergencyType(e.target.value)}>
              <option value="cardiac">Cardiac</option>
              <option value="trauma">Trauma</option>
              <option value="respiratory">Respiratory</option>
              <option value="maternity">Maternity</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="field">Severity
            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option value="critical">Critical</option>
              <option value="serious">Serious</option>
              <option value="stable">Stable</option>
            </select>
          </label>
          <label className="field">Latitude
            <input inputMode="decimal" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
          </label>
          <label className="field">Longitude
            <input inputMode="decimal" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
          </label>
          <label className="field full">Patient notes
            <textarea rows={3} value={patientSummary} onChange={(e) => setPatientSummary(e.target.value)} placeholder="Age, symptoms, hazards at pickup point" />
          </label>
          <div className="row full">
            <button className="btn ghost" type="button" onClick={locate} disabled={locating}><LocateFixed size={16} /> {locating ? 'Locating' : 'Use my location'}</button>
            <button className="btn primary" type="submit"><Send size={16} /> Send SOS</button>
          </div>
        </form>
      </article>
    </section>
  );
}
