// Packages
const autoBind = require('auto-bind');
const bcrypt = require('bcrypt');

export default class MasterController {

    arrangeName: any = [];
    arrangeCategory: any = [];
    unSort: any = [];

    constructor() {
        autoBind(this);
    }

    back(req, res) {
        // Send Input Value to req.body with Flash
        req.flash('input_value', req.body);
        // Redirect to Current Page and if not Exist Redirect to Main Page
        return res.redirect(req.header('Referer') || '/');
    }

    error(message, statusCode: number = 500) {
        // Define New Error with Message
        const error: any = new Error(message);
        // Define Error Status Code
        error.status = statusCode;
        throw error;
    }

    // Sweet Alert Config
    alert(req: any, data: any = {}) {
        const title = data.title || '',
            text = data.text || '',
            icon = data.icon || 'info',
            button = data.button || null,
            timer = data.timer || 2000;

        req.flash('sweetalert', {title, text, icon, button, timer});
    }

    alertAndBack(req, res, data: any = {}) {
        this.alert(req, data);
        this.back(req, res);
    }

    bcryptPassword(password: any): any {
        // Bcrypt with 15 salt
        const salt = bcrypt.genSaltSync(15);
        // Bcrypt Password with Salt
        return bcrypt.hashSync(password, salt);
    }
};
