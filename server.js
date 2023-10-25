const express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs'); // Importa el módulo 'fs' para trabajar con archivos

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

// Middleware
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: "Welcome" });
});

const storage = multer.memoryStorage(); // Usa memoryStorage para almacenar el archivo en memoria

const upload = multer({
  dest: 'uploads/', // Esto guarda tus archivos en una carpeta "uploads"
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/wav') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de audio en formato .wav'), false);
    }
  }
});

app.post('/api/audio', upload.single('audio'), (req, res) => {
  if (req.file) {
    const now = new Date();
    const fileName = `${now.toISOString()}.wav`;
    const filePath = `uploads/${fileName}`; // Ruta de destino del archivo

    // Renombrar el archivo de audio a la ruta de destino
    fs.rename(req.file.path, filePath, (err) => {
      if (err) {
        console.error('Error al guardar el archivo:', err);
        res.status(500).send('Error al guardar el archivo');
      } else {
        console.log(`Archivo guardado como: ${fileName}`);
        res.sendStatus(200);
      }
    });
  } else {
    res.status(400).send('No se pudo cargar el archivo');
  }
}, (error, req, res, next) => {
  res.status(500).send(error.message);
});


mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log("Conectado a MongoDB ATLAS"))
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log("Server started on port 5000", port);
});
