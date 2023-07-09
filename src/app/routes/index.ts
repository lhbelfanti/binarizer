import { router } from '@http/server'

import login from '@pages/login';

/**
 * Mount routers
 */
router.use('/login', login);

export default router;