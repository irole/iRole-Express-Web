import express from 'express';
import homeController from "../../controllers/home/HomeController";
import redirectIfAuthenticated from "../../middlewares/RedirectIfAuthenticated";
import {authRouter} from "./auth";
// Packages
const router = express.Router();

router.get('/', homeController.index);
router.get('/logout', (req: any, res: any) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});
router.use('/auth', redirectIfAuthenticated.handle, authRouter);

export {router as publicRouter}
