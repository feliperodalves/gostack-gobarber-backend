export default {
  jwt: {
    secret: process.env.APP_SECRET || 'empty-app-secret',
    expiresIn: '1d',
  },
};
