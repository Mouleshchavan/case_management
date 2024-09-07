import { Router } from 'express';
import { getCases } from '../controllers/caseController';

const router = Router();

router.get('/cases', getCases);

export default router;
