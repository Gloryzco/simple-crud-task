import { config } from "dotenv";

config();
const {
    APP_NAME,
    APP_DEBUG,
    APP_ENV,
    APP_URL,
    APP_TIMEZONE,
    APP_PORT,
    DB_CONNECTION,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
} = process.env;

export default {
    app_name: APP_NAME,
    app_debug: APP_DEBUG,
    app_env: APP_ENV,
    app_url: APP_URL,
    app_timezone: APP_TIMEZONE,
    app_port: APP_PORT,
    db_connection: DB_CONNECTION,
    db_username: DB_USERNAME,
    db_password: DB_PASSWORD,
    db_host: DB_HOST,
    db_port: DB_PORT,
    db_database: DB_DATABASE,
};
