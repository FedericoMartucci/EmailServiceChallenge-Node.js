import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { encrypt, verify } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { findByUsername, saveUser } from "../repositories/user";
import { User } from "../models/User";
import { AuthResponse } from "../models/AuthResponse";

const register = async (request: RegisterRequest): Promise<string> => {
    
    const checkIs: User | null = await findByUsername(request.username);
    if (checkIs !== null) return "ALREADY_USER";
    const hashedPassword = await encrypt(request.password);
    const register = await saveUser(new User(request.username,
                                            hashedPassword,
                                            request.country,
                                            request.firstname,
                                            request.lastname));
    return "SUCCESSFUL_REGISTER";
  };
  
  const login = async (request: LoginRequest): Promise<string | AuthResponse> => {
    const checkIs: User | null = await findByUsername(request.username);
    if (checkIs === null) return "NONEXISTENT_USER";
    const hashedPassword = checkIs.password;
    const isCorrect = await verify(request.password, hashedPassword);
    if (!isCorrect) return "INCORRECT_PASSWORD";
    return new AuthResponse(generateToken(checkIs.role, checkIs.username));
  };

export { register, login };