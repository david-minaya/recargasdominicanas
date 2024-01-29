import { Router } from 'express';
import { createQuestion } from './createQuestion.route';

const router = Router();

router.use(createQuestion);

export const questionRoute = router;
