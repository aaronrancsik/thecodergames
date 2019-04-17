import {Request, Response} from "express";
import { UserController } from "../controllers/userController";
import {checkJWT, chechAdmin} from '../middlwares/userAuth';

export class Routes {
    public userController: UserController = new UserController();
    
    //[checkJWT,chechAdmin]
    public routes(app): void {          
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                status: 'API Its Working',
                message: 'Welcome to the jungle!'
            })
        });      
        
        app.route('/login')
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

        
    }
}


