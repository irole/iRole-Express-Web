import Middleware from "./Middleware";

class redirectIfAuthenticated extends Middleware {
    // Check User Authenticated
    handle(req: any, res: any, next: any) {
        if (req.isAuthenticated()) return res.redirect('/');
        next();
    }
}

export default new redirectIfAuthenticated();
