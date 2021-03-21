module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.',
    instances : "max",
    exec_mode : "cluster",
    ignore_watch : ["node_modules", "public",".next"],
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
      user : 'webuser',
    //  host : ["31.207.39.67"],
      host : ["192.168.0.144"],
      ref  : 'origin/master',
      repo : 'https://MOUTAIROU:ramatou1994@github.com/MOUTAIROU/nearestServer.git --depth 1',
      path : '/home/webuser/pm2Stuff/decirshop',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
