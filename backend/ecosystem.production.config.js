// Enhanced PM2 configuration for Aadiz.FX portfolio website - Production Quality

module.exports = {
  apps: [
    {
      name: 'aadizfx-backend',
      script: 'dist/server.js',
      instances: 'max', // Use all CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        // Add production-specific environment variables here
        LOG_LEVEL: 'info',
        REQUEST_TIMEOUT: '30000'
      },
      // Enhanced monitoring and logging
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      // Restart configuration
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: '10s',
      // Resource limits
      max_memory_restart: '1G',
      // Graceful shutdown
      kill_timeout: 1600,
      // Log rotation
      combine_logs: true,
      // Monitoring
      listen_timeout: 3000,
      wait_ready: true
    },
    {
      name: 'aadizfx-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '../project-lensflare',
      instances: 2, // Use 2 instances for frontend
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        // Add production-specific environment variables here
        LOG_LEVEL: 'info'
      },
      // Enhanced monitoring and logging
      watch: false,
      max_memory_restart: '1G',
      error_file: '../project-lensflare/logs/err.log',
      out_file: '../project-lensflare/logs/out.log',
      log_file: '../project-lensflare/logs/combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      // Restart configuration
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: '10s',
      // Resource limits
      max_memory_restart: '1G',
      // Graceful shutdown
      kill_timeout: 1600,
      // Log rotation
      combine_logs: true,
      // Monitoring
      listen_timeout: 3000,
      wait_ready: true
    }
  ]
};