import { Router } from 'express';
import { updateAccessToken } from './updateAcessToken.route';

const router = Router();

router.use(updateAccessToken);

export const accessTokenRoute = router;
