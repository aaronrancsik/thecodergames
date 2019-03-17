import {Request, Response} from "express";
import { UserController } from "../controllers/userController";
import {checkJWT} from '../middlwares/userAuth';

export class Routes {
    public userController: UserController = new UserController();
    

    public routes(app): void {          
        app.route('/').get([checkJWT],(req: Request, res: Response) => {            
            res.status(200).send({
                status: 'API Its Working',
                message: 'Welcome to the jungle!'
            })
        });      
        
        app.route('/login')
        .post(UserController.login)

        // User 
        app.route('/user') 
        //.get(this.userController.getUsers)        
        .post(this.userController.addNewUser);

        // Specefic User details
        //app.route('/user/:userId')
        //.get(this.userController.getUserWithID)
        //.put(this.userController.updateUser)
        //.delete(this.userController.deleteUser);

        
    }
}


