import { Request, Response} from "express";
import { register, login } from "../services/auth";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";

const registerController = async ({body}: Request, res: Response): Promise<void> => {
    const { username, password, firstname, lastname, country } = body;
    const userResponse = await register(new RegisterRequest(username, password, firstname, lastname, country));
    if(userResponse === 'ALREADY_USER') {
        res.status(403);
        res.send(userResponse);
    }
    else
        res.send(userResponse);
};

const loginController = async ({body}: Request, res: Response): Promise<void> => {
    const { username, password } = body;
    const userResponse = await login(new LoginRequest(username, password));
    if (userResponse === 'INCORRECT_PASSWORD'){
        res.status(403);
        res.send(userResponse);
    }else if(userResponse === 'NONEXISTENT_USER'){
        res.status(403);
        res.send(userResponse);
    }else{
        res.send(userResponse);
    }
};

export { registerController, loginController };
