import { router } from '@http/server';
import { fetchUserInfo, render } from './controller';

/**
 * Routers
 */
router.get('/', fetchUserInfo, render);

/**
 * Expose router
 */
export default router;
