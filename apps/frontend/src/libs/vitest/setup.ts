import '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './mocks/server';
import MockDate from 'mockdate';

beforeAll(() => {
  MockDate.set('2024-08-08');
  server.listen();
});
afterAll(() => {
  MockDate.reset();
  server.close();
});
afterEach(() => server.resetHandlers());
