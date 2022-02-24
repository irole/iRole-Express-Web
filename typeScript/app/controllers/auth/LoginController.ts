// Packages
import Controller from "./Controller";

const passport = require('passport');

class LoginController extends Controller {

    showLoginForm(req, res, next) {
        try {
            res.render('auth/login');
        } catch (e) {
            next(e);
        }
    }

    async process(req, res, next) {
        try {
            passport.authenticate('local.login', async (err, user) => {
                // User not Exist
                if (!user) return this.back(req, res);
                // User not Active
                req.logIn(user, (err) => {
                    if (req.body.remember) {
                        user.setRememberToken(res);
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
        } catch (e) {
            next(e);
        }
    }

}

export default new LoginController();
