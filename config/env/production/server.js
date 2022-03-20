module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  url: env("https://foodiedb.battlegroundls.com"),
  port: process.env.PORT,
});
