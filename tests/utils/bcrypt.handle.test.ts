import { encrypt, verify } from "../../src/utils/bcrypt.handle";

describe("Encrypt function", () => {
    test("It should encrypt a plain password", async () => {
        const plainPassword = "password123";
        const hashedPassword = await encrypt(plainPassword);

        expect(hashedPassword).not.toBe(plainPassword);
    });
    test("It should encrypt a plain password and not be null", async () => {
        const plainPassword = "password123";
        const hashedPassword = await encrypt(plainPassword);

        expect(hashedPassword).not.toBeNull();
    });
    test("It should encrypt a plain password and not be undefined", async () => {
        const plainPassword = "password123";
        const hashedPassword = await encrypt(plainPassword);

        expect(hashedPassword).not.toBeUndefined();
    });
    test("If plain password is null, it should not be null", async () => {
        const plainPassword = "";
        const hashedPassword = await encrypt(plainPassword);

        expect(hashedPassword).not.toBeNull();
    });
});
describe('Verify function', () => {
    test('It should return true for correct password', async () => {
        const plainPassword = 'password123';
        const hashedPassword = await encrypt(plainPassword);
        const isCorrect = await verify(plainPassword, hashedPassword);
    
        expect(isCorrect).toBeTruthy();
    });
  
    test('It should return false for incorrect password', async () => {
        const plainPassword = 'password123';
        const incorrectPassword = 'wrongPassword';
        const hashedPassword = await encrypt(plainPassword);
        const isCorrect = await verify(incorrectPassword, hashedPassword);
    
        expect(isCorrect).toBeFalsy();
    });
  });