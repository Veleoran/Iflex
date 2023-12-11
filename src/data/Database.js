import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.SQL_HOST || 'localhost',
    user: process.env.SQL_USER || 'root',
    password: process.env.SQL_PASSWORD || '',
    database: process.env.SQL_DBNAME || 'i_flex',
    port: process.env.SQL_PORT || 3306,
    multipleStatements: process.argv.includes('migration')
});

export default pool;
