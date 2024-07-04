const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'formulario.chqioqk0ipth.us-east-1.rds.amazonaws.com',
    user: 'mauricio',
    password: 'Colegio202420',
    database: 'form_registro',
    port: '3306'
})

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexion establecida')
    }
})

module.exports = connection;