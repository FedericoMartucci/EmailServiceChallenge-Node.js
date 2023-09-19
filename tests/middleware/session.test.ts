import { checkJwt } from '../.././src/middleware/session';
import { Request } from 'supertest';

test('should be 1', () => {
    const result = 1;
    expect(result).toBe(1);
});