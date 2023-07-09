import { initServer } from '@http/server';
import apiRouter from './api';
import appRouter from './app/routes';
import config from '../config/default';

/**
 * Init Express Server
 */
export default initServer(config.server.port, apiRouter, appRouter);