import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
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
  const [apiError, setApiError] = useState(false);
  const [activeRole, setActiveRole] = useState<Role>('command');
  const [notices, setNotices] = useState<Notice[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const notify = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setNotices((prev) => [...prev.slice(-2), { id, text }]);
    window.setTimeout(() => {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const loadOverview = useCallback(() => {
    setApiError(false);
    setApiStatus('Checking API');
    fetch(`${apiUrl}/api/v1/overview`)
      .then((response) => {
        if (!response.ok) throw new Error('overview failed');
        return response.json() as Promise<Overview>;
      })
      .then((data) => { setOverview(data); setApiStatus('Connected'); })
      .catch(() => { setApiStatus('API offline'); setApiError(true); });
  }, []);

  useEffect(() => {
    loadOverview();
    const socket = io(apiUrl);
    socket.on('platform:ready', () => {
      setApiStatus('Connected');
      setApiError(false);
      notify('Realtime channel connected');
    });
    return () => {
      socket.disconnect();
    };
  }, [loadOverview, notify]);

  function focusTab(index: number) {
    const total = tabs.length;
    const next = (index + total) % total;
    setActiveRole(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(e: KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') { e.preventDefault(); focusTab(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); focusTab(index - 1); }
    if (e.key === 'Home') { e.preventDefault(); focusTab(0); }
    if (e.key === 'End') { e.preventDefault(); focusTab(tabs.length - 1); }
  }

  const activeLabel = tabs.find((t) => t.id === activeRole)?.label ?? 'Command Centre';
  const connected = apiStatus === 'Connected';

  return (
    <div className="shell">
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="topbar">
        <div className="brand"><ShieldCheck size={22} aria-hidden="true" /> <span>SERP</span></div>
        <nav aria-label="Application roles" role="tablist" aria-orientation="horizontal">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={activeRole === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={activeRole === t.id ? 0 : -1}
              className={activeRole === t.id ? 'active' : ''}
              onClick={() => setActiveRole(t.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <span className={`connection ${connected ? 'online' : ''}`} role="status"><Radio size={14} aria-hidden="true" /> {apiStatus}</span>
      </header>

      <main id="main" className="content">
        {apiError && (
          <div className="error-banner" role="alert">
            <span>API is offline. Showing development preview data. Start it with npm run dev.</span>
            <button className="btn ghost small" type="button" onClick={loadOverview}>Retry connection</button>
          </div>
        )}

        <div role="tabpanel" id={`panel-${activeRole}`} aria-labelledby={`tab-${activeRole}`} aria-label={activeLabel} tabIndex={0}>
          {activeRole === 'command' && <CommandCentre overview={overview} />}
          {activeRole === 'user' && <UserPanel notify={notify} />}
          {activeRole === 'driver' && <DriverPanel notify={notify} />}
          {activeRole === 'hospital' && <HospitalPanel notify={notify} />}
          {activeRole === 'traffic' && <TrafficPanel notify={notify} />}
          {activeRole === 'admin' && <AdminPanel overview={overview} notify={notify} />}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>Learning build with fictional data. Green-corridor actions are approvals only.</span>
          <span>API {connected ? 'connected' : 'offline'} - press Tab to reach role tabs, arrow keys move between them.</span>
        </div>
      </footer>

      <div className="toasts" aria-live="polite" aria-atomic="false">
        {notices.map((n) => (
          <div className="toast" role="status" key={n.id}>
            <span>{n.text}</span>
            <button className="toast-close" type="button" aria-label="Dismiss notification" onClick={() => dismiss(n.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
