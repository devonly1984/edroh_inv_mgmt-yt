module.exports = {
  apps: [
    {
      name: "inventory-management",
      sript: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: "development",
        ENV_VAR1: 'environment-variable'
      }
    },
  ],
};