import { app, server } from '../.././src/app';
import request from "supertest";


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