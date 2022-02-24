import Controller from "./Controller";
import resetPasswordTokenService from "../../services/ResetPasswordTokenService";
import userService from "../../services/UserService";
import translate from "../../helpers/translate";

class ResetPasswordController extends Controller {

    async showResetPasswordForm(req, res, next) {
        try {
            const {token} = req.params;
            const resetLink = await resetPasswordTokenService.findOne({token, use: false});
            if (resetLink) return res.render('auth/reset-password', {token});
            const error: any = new Error(translate(req, __filename, 'not-found', 'not found'));
            error.status = 404;
            throw error;

        } catch (e) {
            next(e);
        }
    }

    async resetPasswordProcess(req, res, next) {
        try {
            const {token} = req.body;
            // Select PasswordReset Where Token
            const resetLink = await resetPasswordTokenService.findOne({token});
            if (resetLink) {
                // Find & Update User and Set Bcrypt Password
                await userService.findOneAndUpdate({email: resetLink.email}, {$set: {password: this.bcryptPassword(req.body.password)}});
                await resetPasswordTokenService.findOneAndUpdate({token}, {$set: {use: true}});
            }
            return res.redirect('/auth/login');
        } catch (e) {
            next(e);
        }
    }
}

export default new ResetPasswordController();
