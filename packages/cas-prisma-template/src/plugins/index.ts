export default () => {
  const plugins = [];
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const LoggingPlugin = require('./LoggingPlugin');
    plugins.push(LoggingPlugin.default);
  }

  return plugins;
};
