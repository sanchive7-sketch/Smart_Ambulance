import { useCallback, useEffect, useState } from 'react';
import { Radio, ShieldCheck } from 'lucide-react';
import { io } from 'socket.io-client';
import CommandCentre from './roles/CommandCentre';
import UserPanel from './roles/UserPanel';
import DriverPanel from './roles/DriverPanel';
import HospitalPanel from './roles/HospitalPanel';
import TrafficPanel from './roles/TrafficPanel';
import AdminPanel from './roles/AdminPanel';
import type { Notice, Overview, Role } from './roles/types';

const apiUrl = 'http://localhost:4000';

const tabs: { id: Role; label: string }[] = [
  { id: 'command', label: 'Command Centre' },
  { id: 'user', label: 'User App' },
  { id: 'driver', label: 'Driver App' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'traffic', label: 'Traffic Control' },
  { id: 'admin', label: 'Admin' },
];

export default function App() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [apiStatus, setApiStatus] = useState('Checking API');
  const [activeRole, setActiveRole] = useState<Role>('command');
  const [notices, setNotices] = useState<Notice[]>([]);

  const notify = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setNotices((prev) => [...prev.slice(-2), { id, text }]);
    window.setTimeout(() => {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/overview`)
      .then((response) => response.json() as Promise<Overview>)
      .then((data) => { setOverview(data); setApiStatus('Connected'); })
      .catch(() => setApiStatus('Start the API with npm run dev'));

    const socket = io(apiUrl);
    socket.on('platform:ready', () => {
      setApiStatus('Connected');
      notify('Realtime channel connected');
    });
    return () => {
      socket.disconnect();
    };
  }, [notify]);

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><ShieldCheck size={22} /> <span>SERP</span></div>
        <nav aria-label="Application roles">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={activeRole === t.id}
              className={activeRole === t.id ? 'active' : ''}
              onClick={() => setActiveRole(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <span className={`connection ${apiStatus === 'Connected' ? 'online' : ''}`}><Radio size={14} /> {apiStatus}</span>
      </header>

      {activeRole === 'command' && <CommandCentre overview={overview} />}
      {activeRole === 'user' && <UserPanel notify={notify} />}
      {activeRole === 'driver' && <DriverPanel notify={notify} />}
      {activeRole === 'hospital' && <HospitalPanel notify={notify} />}
      {activeRole === 'traffic' && <TrafficPanel notify={notify} />}
      {activeRole === 'admin' && <AdminPanel overview={overview} notify={notify} />}

      <div className="toasts" aria-live="polite" aria-atomic="false">
        {notices.map((n) => (
          <div className="toast" key={n.id}>{n.text}</div>
        ))}
      </div>
    </main>
  );
}
