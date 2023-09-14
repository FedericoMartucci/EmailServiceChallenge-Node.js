import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { encrypt, verify } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { findByUsername, saveUser } from "../repositories/user";
import { User } from "../models/User";
import { AuthResponse } from "../models/AuthResponse";

const register = async (request: RegisterRequest) => {
    
    const checkIs = await findByUsername(request.getUsername());
    if (checkIs.getId() !== undefined) return "ALREADY_USER";
    const hashedPassword = await encrypt(request.getPassword());
    const register = await saveUser(new User(request.getUsername(),
                                            hashedPassword,
                                            request.getCountry(),
                                            request.getFirstname(),
                                            request.getLastname()));
    return "SUCCESSFUL_REGISTER";
  };
  
  const login = async (request: LoginRequest) => {
    const checkIs = await findByUsername(request.getUsername());
    if (checkIs.getId() === undefined) return "NONEXISTENT_USER";
    const hashedPassword = checkIs.getPassword();
    const isCorrect = await verify(request.getPassword(), hashedPassword);
    if (!isCorrect) return "INCORRECT_PASSWORD";
    return new AuthResponse(generateToken(request.getUsername()));
  };

export { register, login };