import { Router } from 'express';
import { list } from '../controllers/users.controller';

const router = Router();

router.get('/users', list);

export default router;
