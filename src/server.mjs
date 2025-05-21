import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import profileRoutes from './routes/profileRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Charger les certificats SSL
const sslOptions = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')
};

// Middleware
app.use(express.json());
// Routes
app.use('/login', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.send('API sécurisée avec JWT et HTTPS. Connectez-vous via /login');
});

// Démarrer le serveur HTTPS
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ Serveur HTTPS lancé sur https://localhost:${PORT}`);
});
