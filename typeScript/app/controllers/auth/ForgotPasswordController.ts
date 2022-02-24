// Packages
import Controller from "./Controller";
import userService from "../../services/UserService";
import resetPasswordTokenService from "../../services/ResetPasswordTokenService";

const uniqueString = require('unique-string');

class ForgotPasswordController extends Controller {

    showForgotPasswordForm(req, res, next) {
        try {
            res.render('auth/forgot-password');
        } catch (e) {
            next(e);
        }
    }

    async forgotPasswordProcess(req, res, next) {
        try {
            // Get Input Value
            const {email} = req.body;
            // Select User Where Email
            const user = await userService.findOne({email});
            if (user) {
                //--------------Create New PasswordReset -----------
                await resetPasswordTokenService.insert({
                    email,
                    token: uniqueString(),
                });

                //---------------------------------------------------

                //--------------Send Mail ----------------

                //----------------------------------------

            }
            // Send Message To User( Reset Link Send to your Email )

            // --------------------------------------
            res.redirect('/');

        } catch (e) {
            next(e);
        }
    }
}

export default new ForgotPasswordController();
