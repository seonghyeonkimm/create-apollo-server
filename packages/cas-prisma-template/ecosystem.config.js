module.exports = {
  apps: [
    {
      name: 'server-production',
      interpreter: '/bin/zsh',
      script: '/usr/local/bin/yarn',
      args: 'start:prod',
      // instances: 'max',
      // exec_mode: 'cluster',
      wait_ready: true,
      kill_timeout: 3000,
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
