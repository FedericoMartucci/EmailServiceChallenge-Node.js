import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { app, server } from '.././src/app';
import { checkJwt } from '../src/middleware/session';
import { Role } from '../src/models/Role';
import { generateToken, verifyToken } from '../src/utils/jwt.handle';
const request = require("supertest");
describe("Test the stats endpoint with different token", () => {
    test("When token is not provided it should response with 401 Unauthorized", done => {
      request(app)
        .get("/stats")
        .then((response: { statusCode: number, text: string }) => {
          expect(response.statusCode).toBe(401);
          expect(response.text).toBe('NO_TOKEN_PROVIDED');
          done();
        });
    });
    test("When role in token is not ADMIN it should response with 403 Forbidden", done => {
        const token = generateToken("USER" as Role, 'testingUser');

        request(app)
          .get("/stats")
          .set("Authorization", `Bearer ${token}`)
          .then((response: { statusCode: number, text: string }) => {
            expect(response.statusCode).toBe(403);
            expect(response.text).toBe('FORBIDDEN');
            done();
          });
      });
      test("When role in token is ADMIN it should response with 200 OK", done => {
        const token = generateToken("ADMIN" as Role, 'testingUser');
        request(app)
          .get("/stats")
          .set("Authorization", `Bearer ${token}`)
          .then((response: { statusCode: number, text: string }) => {
            if(response.text === 'NO_EMAILS_SENT_TODAY')
                expect(response.statusCode).toBe(404);
            else
                expect(response.statusCode).toBe(200);
            done();
          });
      });
      test("When token is invalid it should response with 400 Bad Request", done => {
        const INVALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VyIjoidGVzdGluZ1VzZXIiLCJpYXQiOjE2OTUxMzc4MTksImV4cCI6MTY5NTE0MTQxOX0.HK_1g5iSWdnVdUFebikPAs3i9-nNDYu2c2klrWjMjgE";
        request(app)
          .get("/stats")
          .set("Authorization", `Bearer ${INVALID_TOKEN}`)
          .then((response: { statusCode: number, text: string }) => {
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe('INVALID_TOKEN');
            expect(() => verifyToken(INVALID_TOKEN)).toThrow(JsonWebTokenError);
            done();
          });
      });
      test("When token has syntax error it should response with 400 Bad Request", done => {
        const SYNTAX_ERROR_TOKEN = "eyJhbGciOiIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VyIjoidGVzdGluZ1VzZXIiLCJpYXQiOjE2OTUxMzc4MTksImV4cCI6MTY5NTE0MTQxOX0.HK_1g5iSWdnVdUFebikPAs3i9-nNDYu2c2klrWjMjgE";
        request(app)
          .get("/stats")
          .set("Authorization", `Bearer ${SYNTAX_ERROR_TOKEN}`)
          .then((response: { statusCode: number, text: string }) => {
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe('INVALID_TOKEN');
            expect(() => verifyToken(SYNTAX_ERROR_TOKEN)).toThrow(JsonWebTokenError);
            done();
          });
      });
      test("When token is expired it should response with 400 Bad Request", done => {
        const EXPIRED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VyIjoiZmVkZXJpY29tYXJ0dWNjaUBob3RtYWlsLmNvbSIsImlhdCI6MTY5NTA0ODI4MiwiZXhwIjoxNjk1MDUxODgyfQ.xwlcmD3QyqfN8geNdS9HgFcTfPKuL_6ycDaf-isu2zA";
        request(app)
          .get("/stats")
          .set("Authorization", `Bearer ${EXPIRED_TOKEN}`)
          .then((response: { statusCode: number, text: string }) => {
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe('INVALID_TOKEN');
            expect(() => verifyToken(EXPIRED_TOKEN)).toThrow(TokenExpiredError);
            done();
          });
      });

});
describe("Test the POST methods with empty body", () => {
    test("POST /auth/register should respond with 403 Forbidden", done => {
        request(app)
          .post("/auth/register")
          .send({})
          .then((response: { statusCode: number }) => {
            expect(response.statusCode).toBe(403);
            done();
          });
      });
      test("POST /auth/login should respond with 403 Forbidden", done => {
        request(app)
          .post("/auth/login")
          .send({})
          .then((response: { statusCode: number }) => {
            expect(response.statusCode).toBe(403);
            done();
          });
      });
      test("POST /email/send should respond with 403 Forbidden", done => {
        request(app)
          .post("/email/send")
          .send({})
          .then((response: { statusCode: number }) => {
            expect(response.statusCode).toBe(403);
            done();
          });
      });
  });

afterAll(() => {
    server.close();
});