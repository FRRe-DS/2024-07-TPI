export default () => ({
    URL: process.env.URL || 'http://localhost',
    PORT: parseInt(process.env.PORT, 10) || 3000,
    GLOBAL_PREFIX: process.env.GLOBAL_PREFIX || 'api',
    PATH_SWAGGER: process.env.PATH_SWAGGER || 'docu',
    VERSION: process.env.VERSION || '1',
    ENVIRONMENT: process.env.ENVIRONMENT,
    HOST_LOGSTASH: process.env.HOST_LOGSTASH,
  });
  