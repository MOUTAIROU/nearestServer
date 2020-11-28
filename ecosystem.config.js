module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.',
    instances : "max",
    exec_mode : "cluster",
    ignore_watch : ["node_modules", "public"],
    env_production: {
                "PORT": 6000,
                "NODE_ENV": "production",
    },
    env_development: {
                "PORT": 6000,
                "NODE_ENV": "development",
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
