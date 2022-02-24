// Packages
import express from 'express';
import language from "../middlewares/Language";
import ErrorHandling from "../middlewares/ErrorHandling";
import {publicRouter} from "./public";

const i18n = require('i18n');
// MiddleWares

const router = express.Router();

router.use(language.handle);

// Get language
router.get('/lang/:lang', (req: any, res: any) => {
    const {lang} = req.params;
    if (i18n.getLocales().includes(lang)) {
        res.cookie('lang', lang, {maxAge: 1000 * 60 * 60 * 24 * 90, signed: true});
    }

    res.redirect(req.header('Referer') || '/');
});
// Routes
router.use('/', publicRouter);
//router.use('/', privateRoute);

// Error 404
router.all('*', ErrorHandling.error404);
// Another Error
router.use(ErrorHandling.handler);

export {router as Router}
