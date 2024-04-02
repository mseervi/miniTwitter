import "dotenv/config"

const config = {
    NODE_ENV : process.env.NODE_ENV,
    PORT : process.env.PORT,
    DB_CONNECTION_URI : process.env.DB_CONNECTION_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    ZEROBOUNCE_API_KEY : process.env.ZEROBOUNCE_API_KEY,
    MYEMAIL : process.env.MYEMAIL,
    MYPASSWORD : process.env.MYPASSWORD
}

export default config;