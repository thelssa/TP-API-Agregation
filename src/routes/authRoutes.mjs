import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'password') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Identifiants invalides' });
});

export default router;
