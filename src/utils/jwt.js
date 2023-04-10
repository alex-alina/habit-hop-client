export const jwtData = (jwt) => {
  var base64Url = jwt.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

const currentTime = Date.now() / 1000;

export const extractUserId = (jwt) => jwtData(jwt).id;

export const isExpired = (jwt, now = currentTime) => jwtData(jwt).exp < now;
