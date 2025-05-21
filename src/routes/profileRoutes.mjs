import express from 'express';
import getProfile from '../controllers/profileController.mjs';
import jwtAuth from '../middleware/jwtAuth.mjs';

const router = express.Router();

router.get('/', jwtAuth, getProfile);

export default router;
