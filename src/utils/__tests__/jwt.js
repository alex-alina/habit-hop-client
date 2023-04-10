import { jwtData, extractUserId, isExpired } from '../jwt';
const jwtMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjM2MxMWJmLTU4NGMtNDA5MC1hYThiLTM5ZTQzY2ZhZmNhYiIsImlhdCI6MTY4MDgyMDU1MSwiZXhwIjoxNjgwODI3NzUxfQ.gjxiZC1Kz7rGiQpRgj6tMpNpWJwFZ9CJLuSJ8llpN1Y';

const currentTime = 1680820588.46;
const oneDayInTheFuture = 1680907514.299;

const jwtMockData = {
  exp: 1680827751,
  iat: 1680820551,
  id: 'dc3c11bf-584c-4090-aa8b-39e43cfafcab',
};

describe('JWT utils', () => {
  it('returns the decoded jwt data', () => {
    expect(jwtData(jwtMock)).toEqual(jwtMockData);
  });

  it('returns user id from jwt', () => {
    expect(extractUserId(jwtMock)).toBe(jwtMockData.id);
  });

  it('returns false if token is not expired', () => {
    expect(isExpired(jwtMock, currentTime)).toBe(false);
  });

  it('returns true if token is expired', () => {
    expect(isExpired(jwtMock, oneDayInTheFuture)).toBe(true);
  });
});
