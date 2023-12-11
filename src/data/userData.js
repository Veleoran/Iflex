import pool from './Database.js';
 // Assurez-vous que le chemin est correct
import bcrypt from 'bcrypt';
    
export function createUser(username, password, firstname, lastname, callback) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return callback(err);
        }
        const query = 'INSERT INTO user (username, password, firstname, lastname) VALUES (?, ?, ?, ?)';
        const values = [username, hashedPassword, firstname, lastname];

        pool.query(query, values, callback);
    });
}

export function getUserByUsername(username, callback) {
    pool.query('SELECT * FROM user WHERE username = ?', [username], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows[0]);
    });
}