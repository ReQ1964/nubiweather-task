import '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './mocks/server';
import MockDate from 'mockdate';
import { MOCK_DATE } from '@/constants/api';

beforeAll(() => {
  MockDate.set(MOCK_DATE);
  server.listen();
});
afterAll(() => {
  MockDate.reset();
  server.close();
});
afterEach(() => server.resetHandlers());
