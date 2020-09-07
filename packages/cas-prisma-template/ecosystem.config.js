module.exports = {
  apps: [
    {
      watch: true,
      name: 'server-dev',
      interpreter: '/bin/zsh',
      script: '/usr/local/bin/yarn',
      args: 'start',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'server-production',
      interpreter: '/bin/zsh',
      script: '/usr/local/bin/yarn',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
