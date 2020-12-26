module.exports = (config) => {
  // NOTE(krishan711): mark no packages as external so everything is bundled
  config.externals = {};
  return config;
};
