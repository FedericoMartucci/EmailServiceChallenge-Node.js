import { hash, compare } from "bcryptjs";

const encrypt = async (plainPassword: string) => {
    const hashedPassword = await hash(plainPassword, 8);
    return hashedPassword;
};

const verify = async (plainPassword: string, hashedPassword: string) => {
    const isCorrect = await compare(plainPassword, hashedPassword);
    return isCorrect;
};

export { encrypt, verify };