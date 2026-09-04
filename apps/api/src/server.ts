import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { z } from 'zod';

const env = z.object({
  API_PORT: z.coerce.number().default(4000),
  WEB_ORIGIN: z.string().default('http://localhost:5173'),
}).parse(process.env);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: env.WEB_ORIGIN, methods: ['GET', 'POST', 'PATCH'] },
});

app.use(cors({ origin: env.WEB_ORIGIN }));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'serp-api', time: new Date().toISOString() });
});

app.get('/api/v1/overview', (_request, response) => {
  response.json({
    activeCases: 4,
    availableAmbulances: 5,
    averageResponseMinutes: 7.2,
    hospitalLoadPercent: 68,
    source: 'development-demo-data',
  });
});

io.on('connection', (socket) => {
  socket.emit('platform:ready', { connectedAt: new Date().toISOString() });
});

httpServer.listen(env.API_PORT, () => {
  console.log(`SERP API listening on http://localhost:${env.API_PORT}`);
});
