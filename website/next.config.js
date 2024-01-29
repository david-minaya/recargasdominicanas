module.exports = {

  env: {
    API: process.env.API
  },

  webpack: (config) => {

    config.module.rules[1].oneOf.find(loader => {
      if (loader.test && loader.test.toString() === '/\\.module\\.css$/') {
        loader.use.unshift('group-style-loader');
      }
    });

    return config;
  }
};
