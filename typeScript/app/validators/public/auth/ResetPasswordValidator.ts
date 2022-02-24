// Packages
import {body} from 'express-validator';
import Validator from "../../Validator";
import translate from "../../../helpers/translate";


class ForgotPasswordValidator extends Validator {

    handle() {
        return [
            body('password').isLength({min: 2}).escape().withMessage((value, {req, location, path}) => {
                return translate(req, __filename, 'password', 'password must be at least 8');
            }),
        ];
    }
}

export default new ForgotPasswordValidator();
