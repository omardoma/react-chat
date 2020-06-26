import config from '../../config';

const { NODE_ENV } = config;

const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';

export { isDevelopment, isProduction };
