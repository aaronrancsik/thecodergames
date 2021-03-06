import {Request, Response} from "express";
import { UserController } from "../controllers/userController";
import {checkJWT, chechAdmin} from '../middlwares/userAuth';

export class Routes {
    public userController: UserController = new UserController();
    
    public routes(app): void {          
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                status: 'API Its Working',
                message: 'Welcome to the jungle!'
            })
        });
        
        app.route('/user/registation')
        .post(UserController.regist)
        
        app.route('/user/login')
        .post(UserController.login)

        // User 
        app.route('/user') 
        .get([chechAdmin],this.userController.getUsers)        
        .post(this.userController.addNewUser);

        // Specefic User details
        app.route('/user/:userId')
        .get([chechAdmin],this.userController.getUserWithID)
        .put([chechAdmin],this.userController.updateUser)
        .delete([chechAdmin],this.userController.deleteUser);

        app.route('/chechin').
        post([checkJWT],this.userController.checkIn);

        app.route('/getallonline').
        post([chechAdmin],this.userController.getAllOnline);

        app.route('/updatecode').
        post([checkJWT],this.userController.updateCode);

        app.route('/getcode').
        get([checkJWT],this.userController.loadLatestCode);
    }
}


