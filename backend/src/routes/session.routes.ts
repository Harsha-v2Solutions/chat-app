import { Router } from 'express';
import { create, remove, get } from '../controllers/sessions.controller';

const router = Router();

router.post('/login', create);
router.delete('/logout', remove);
router.get('/verify-session', get);

export default router;
