// Packages
import Controller from "./Controller";

const passport = require('passport');

class RegisterController extends Controller {
    showRegistrationFrom(req, res, next) {
        try {
            res.render('auth/register');
        } catch (e) {
            next(e);
        }
    }

    async process(req, res, next) {
        try {
            passport.authenticate('local.register', {session: true}, (err, user): void => {
                // When res have Error
                if (err) return res.redirect('/auth/register');
                return res.redirect('/');
            })(req, res);
        } catch (e) {
            next(e);
        }
    }
}

export default new RegisterController();
