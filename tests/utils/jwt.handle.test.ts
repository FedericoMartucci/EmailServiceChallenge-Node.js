import { JsonWebTokenError } from "jsonwebtoken";
import { Role } from "../../src/models/Role";
import { generateToken, verifyToken, getToken, getUsernameFromToken  } from "../../src/utils/jwt.handle";
import { Request, Response } from 'express';

const INVALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VyIjoidGVzdGluZ1VzZXIiLCJpYXQiOjE2OTUxMzc4MTksImV4cCI6MTY5NTE0MTQxOX0.HK_1g5iSWdnVdUFebikPAs3i9-nNDYu2c2klrWjMjgE";

describe('generateToken function', () => {
    test('it should generate a valid token', () => {
        const role: string = 'ADMIN';
        const user: string = 'testingUser';
        const token: string = generateToken(role as Role, user);
    
        expect(token).toBeDefined();
    });
  });

  describe('verifyToken function', () => {
    test('it should return JwtPayload for a valid token', () => {
        const validToken = generateToken('USER' as Role, 'testingUser');
        const result = verifyToken(validToken);
    
        expect(result).toHaveProperty('role');
        expect(result).toHaveProperty('user');
    });
  
    test('it should throw and error for an invalid token', () => {
        expect(() => verifyToken(INVALID_TOKEN)).toThrow(JsonWebTokenError);
    });
  });

describe('getToken function', () => {
    test('It should extract token from headers', () => {
        const request = { headers: { authorization: generateToken('USER' as Role, 'testingUser') } } as Request;
        const result = getToken(request);

        expect(result).toEqual(request.headers['authorization']);
    });

    test('It should return undefined if no token is provided', () => {
        const request = { headers: {} } as Request;
        const result = getToken(request);

        expect(result).toEqual("");
    });
});

describe('getUsernameFromToken function', () => {
    test('It should return username from a valid token', () => {
        const request = { headers: { authorization: 'Bearer ' + generateToken('USER' as Role, 'testingUser')} } as Request;
        const result = getUsernameFromToken(request);

        expect(result).toEqual('testingUser');
    });

    test('It should throw an error for an invalid token', () => {
        const requestWithoutToken = { headers: {authorization: 'Bearer '} } as Request;
        const requestWithInvalidToken = { headers: { authorization: 'Bearer ' + INVALID_TOKEN } } as Request;

        expect(getUsernameFromToken(requestWithoutToken)).toBeUndefined();
        expect(() => getUsernameFromToken(requestWithInvalidToken)).toThrow(JsonWebTokenError);
    });
    test('It should return undefined for a missing token', () => {
        const requestWithoutToken = { headers: {authorization: 'Bearer '} } as Request;
        const resultWithoutToken = getUsernameFromToken(requestWithoutToken);

        expect(resultWithoutToken).toBeUndefined();
    });
});