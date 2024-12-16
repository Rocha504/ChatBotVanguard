const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs'); // Necesario para leer los archivos de contexto
const app = express();
const port = 5000;

// Configurar body parser
app.use(bodyParser.json());

// Endpoint para enviar preguntas al chatbot
app.post('/api/ask', async (req, res) => {
  const question = req.body.question;
  const contextFile = req.body.contextFile; // Recibimos el archivo de contexto desde el frontend

  // Cargar el archivo de contexto correspondiente
  let syllabusText = '';
  try {
    syllabusText = fs.readFileSync(`./context_files/${contextFile}`, 'utf8'); // Leemos el archivo de contexto
  } catch (error) {
    console.error('Error al leer el archivo de contexto:', error);
    return res.status(500).json({ error: 'Hubo un error al cargar el contexto.' });
  }

  try {
    // Llamada a Hugging Face con el contexto y la pregunta
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2',
      {
        inputs: {
          question: question,
          context: syllabusText, // Usamos el sílabo como contexto
        },
      },
      {
        headers: {
          Authorization: `Bearer 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`, // Reemplaza con tu clave de API de Hugging Face
        },
      }
    );

    const answer = response.data.answer; // Obtén la respuesta del modelo

    // Mostrar la respuesta en consola
    console.log('Respuesta del modelo:', answer);

    // Enviar la respuesta al frontend
    res.json({ answer: answer });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
