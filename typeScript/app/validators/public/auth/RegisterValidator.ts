// Packages
import Validator from "../../Validator";
import userService from "../../../services/UserService";
import translate from "../../../helpers/translate";

const {body} = require('express-validator');

class LoginValidator extends Validator {

    handle() {
        return [
            body('email').trim().escape().isEmail().withMessage((value, {req, location, path}) => {
                return translate(req, __filename, 'email', 'email not valid');
            }).custom(async (value, {req}) => {

                let user = await userService.findOne({email: value});
                if (user) {
                    throw new Error(translate(req,__filename,'email-exist','email exist'));
                }
            }),
            body('password').trim().escape().isLength({min: 8}).withMessage((value, {req, location, path}) => {
                return translate(req,__filename,'password','password must be at least 8');
            }),
        ];
    }
}

export default new LoginValidator();
