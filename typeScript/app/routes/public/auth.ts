import express from 'express';
import passport from 'passport';
import registerController from "../../controllers/auth/RegisterController";
import registerValidator from "../../validators/public/auth/RegisterValidator";
import validateRequest from "../../middlewares/ValidateRequest";
import loginController from "../../controllers/auth/LoginController";
import loginValidator from "../../validators/public/auth/LoginValidator";
import forgotPasswordController from "../../controllers/auth/ForgotPasswordController";
import forgotPasswordValidator from "../../validators/public/auth/ForgotPasswordValidator";
import resetPasswordController from "../../controllers/auth/ResetPasswordController";
import resetPasswordValidator from "../../validators/public/auth/ResetPasswordValidator";
import googleAuthController from "../../controllers/auth/socials/GoogleAuthController";

const router = express.Router();

//---------------------------Register Routers ----------------------------
router.get('/register', registerController.showRegistrationFrom);
router.post('/register', registerValidator.handle(), validateRequest.handle, registerController.process);
// -----------------------------------------------------------------------

// ---------------------------Login Routers ------------------------------
router.get('/login', loginController.showLoginForm);
router.post('/login', loginValidator.handle(), validateRequest.handle, loginController.process);
// -----------------------------------------------------------------------

//---------------------------Forgot Password Routers -----------------------------------
router.get('/password/forgot', forgotPasswordController.showForgotPasswordForm);
router.post('/password/forgot', forgotPasswordValidator.handle(), validateRequest.handle, forgotPasswordController.forgotPasswordProcess);
router.get('/password/reset/:token', resetPasswordController.showResetPasswordForm);
router.post('/password/reset', resetPasswordValidator.handle(), validateRequest.handle, resetPasswordController.resetPasswordProcess);
// -------------------------------------------------------------------------------------

//---------------------------Google Login Routers ---------------------------------------
router.get('/google', passport.authenticate('google', {session: true, scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {
    session: true,
    failureRedirect: 'auth/register'
}), googleAuthController.callBack);
// --------------------------------------------------------------------------------------

// router.post('/forgot-password', forgotPasswordValidator.handle(), forgotPasswordController.process);
// router.get('/reset-password/:token', resetPasswordController.index);
// router.post('/reset-password/:token', resetPasswordValidator.handle(), resetPasswordController.process);


// router.post('/guest', guestController.process);
// router.post('/guest/convert-to-user', registerValidator.handle(), guestController.convertGuestToUser);

//---------------------------Facebook Login Routers ---------------------------------------
// router.get('/auth/facebook', passport.authenticate('facebook'));
//
// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/',
//         failureRedirect: '/login'
//     }));

// -------------------------------------------------------------------------------------

export {router as authRouter}
