import { Router } from 'express';
import { create } from '../controllers/registrations.controller';

const router = Router();

router.post('/register', create);

export default router;
