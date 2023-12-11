import mysql from 'mysql2/promise';

// Configuration de la connexion à la base de données
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'i_flex'
});

export async function getUserByUsername(username) {
    const [rows] = await connection.query('SELECT * FROM user WHERE username = ?', [username]);
    return rows[0];
}
