import { router } from '@http/server';
import user from './user';

router.use('/login', user);

export default router;