import { hash, compare } from "bcryptjs";

const encrypt = async (plainPassword: string): Promise<string> => {
    const hashedPassword: string = await hash(plainPassword, 8);
    return hashedPassword;
};

const verify = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const isCorrect: boolean = await compare(plainPassword, hashedPassword);
    return isCorrect;
};

export { encrypt, verify };