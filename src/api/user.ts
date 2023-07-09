import express, { Router, Request, Response } from "express";

let router: Router = express.Router()

const getUsers = (req: Request, res: Response) => {
    //Handle GET route here
}

router.route('/users')
    .get(getUsers)


export default router;