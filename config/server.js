module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  url: "https://foodiedb.battlegroundls.com",
  port: process.env.PORT,
  app: {
    keys: env.array("APP_KEYS"),
  },
});
