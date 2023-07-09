/**
 * Module dependencies
 */
import Express, { Router} from 'express';
import { render, fetchData } from './controller';

const router = Express.Router();
/**
 * Routers
 */
router.get('/', fetchData, render);

/**
 * Expose router
 */
export default router;
