export type Role = 'command' | 'user' | 'driver' | 'hospital' | 'traffic' | 'admin';

export type Notice = {
  id: number;
  text: string;
};

export type Overview = {
  activeCases: number;
  availableAmbulances: number;
  averageResponseMinutes: number;
  hospitalLoadPercent: number;
};
