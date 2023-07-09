import express, { Express, Router } from 'express';

const server: Express = express();
const router: Router = express.Router();

/**
 * Start Server
 */
const initServer = (port: number, apiRouter: Router, appRouter: Router) => {
    router.use('/', apiRouter);
    router.use('/', appRouter);

    server.listen(port, () => {
        console.log(`now listening on port ${port}`);
    });
}

/**
 * Expose Express server instance and router
 */
export { initServer, router };