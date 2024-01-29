const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config) => {

    for (const rule of config.module.rules) {
      if (rule.test.toString() === '/\\.css$/') {
        rule.use.unshift('group-style-loader');
        break;
      }
    }

    return config;
  }
}
