module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '95cf29e34327007bd7b690bbe50c1dd5'),
  },
});
