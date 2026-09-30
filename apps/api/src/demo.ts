import { UserRole } from '@prisma/client';

export const DEMO_PASSWORD = 'SerpDemo2026!';

export const demoAccounts = [
  { id: 'demo-user', name: 'Aarav Patient', email: 'user@serp.local', role: UserRole.USER },
  { id: 'demo-driver', name: 'Suresh Driver', email: 'driver@serp.local', role: UserRole.DRIVER },
  { id: 'demo-hospital', name: 'Dr. Meera Rao', email: 'hospital@serp.local', role: UserRole.HOSPITAL },
  { id: 'demo-command', name: 'Nisha Dispatcher', email: 'command@serp.local', role: UserRole.COMMAND_CENTRE },
  { id: 'demo-traffic', name: 'Arjun Traffic Officer', email: 'traffic@serp.local', role: UserRole.TRAFFIC_CONTROLLER },
  { id: 'demo-admin', name: 'Priya Administrator', email: 'admin@serp.local', role: UserRole.ADMIN },
] as const;
