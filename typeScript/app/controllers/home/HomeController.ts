import Controller from "../Controller";

class HomeController extends Controller {

    async index(req: any, res: any, next: any) {
        try {
            res.render('home/index');
        } catch (e) {
            next(e);
        }
    }
}

export default new HomeController();
