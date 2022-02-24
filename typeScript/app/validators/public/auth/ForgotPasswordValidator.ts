// Packages
import {body} from 'express-validator';
import Validator from "../../Validator";
import translate from "../../../helpers/translate";


class ForgotPasswordValidator extends Validator {

    handle() {

        return [
            body('email').trim().escape().isEmail().withMessage((value, {req, location, path}) => {
                return translate(req, __filename, 'email', 'email not valid');
            }),
        ];
    }
}

export default new ForgotPasswordValidator();
