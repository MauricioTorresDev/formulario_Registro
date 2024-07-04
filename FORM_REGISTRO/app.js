const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser');
const PORT = 3000;
const ip = 'localhost'
const connection = require("./db/db")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.static('public/'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.public/index.html'))
})
app.post('/guardar', (req, res) => {
    const { nombre, email, password } = req.body;
    console.log('Datos recibidos: ', req.body);

    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';

    connection.query(query, [nombre, email, password], (err, result) => {
        if (err) {
            console.error('Error al guardar en la base de datos: ', err);
            res.status(500).send('Error al guardar en la base de datos');
        } else {
            console.log('Datos guardados correctamente');
            res.redirect('/');
            // Redirige a la página del formulario
        }
    });
});
app.get('/obtener-datos', (req, res) => {
    const query = 'SELECT * FROM usuarios';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener datos de la base de datos: ', err);
            res.status(500).send('Error al obtener datos de la base de datos');
        } else {
            res.json(results);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server en http://${ip}:${PORT}`)
})