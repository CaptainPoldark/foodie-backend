module.exports = ({ env }) => ({
    url: env("MY_HEROKU_URL"),
    proxy: true,
    app: {
      keys: env.array("APP_KEYS", [APP_KEY1, APP_KEY2, APP_KEY3, APP_KEY4]),
    },
  });