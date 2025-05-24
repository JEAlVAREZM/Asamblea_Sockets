const dotenv = require('dotenv');
const { createClient } = require('@libsql/client');
const express = require('express');
const http = require('http');

dotenv.config();
const app = express();
const server = http.createServer(app);

// Servir archivos estáticos primero
app.use(express.static('node_modules/bootstrap/dist'));

const db = createClient({
  url: 'libsql://dbasamblea-tibencode.aws-us-east-1.turso.io',
  authToken: process.env.DB_TOKEN
});

(async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user TEXT
      )
    `);
    console.log('Tabla messages verificada/creada');
  } catch (err) {
    console.error('Error creando/verificando la tabla:', err);
  }
})();

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});