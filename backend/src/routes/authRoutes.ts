import { Router } from 'express';
import authController from '../controllers/auth.controller';

class AuthRoutes{

    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){

        this.router.post('/signup', authController.signup);
        this.router.post('/signin', authController.signin);

    }

}

const authRoutes = new AuthRoutes();
authRoutes.routes();

export default authRoutes.router;