import { Router } from 'express';
import { performAudit } from '../controllers/audit.controller';

const router = Router();

router.post('/audit', performAudit);

export default router;
