const env = process.env.NODE_ENV || 'development'
export const apiURL = (env === 'development') ? "/api" : ""