import React, { useState } from 'react';
import '../styles/ChatbotStyles.css';

const ChatInput = () => {
  // Estados para el tipo de contexto y la pregunta
  const [selectedContext, setSelectedContext] = useState('');
  const [question, setQuestion] = useState('');

  // Opciones de contexto (asociamos los contextos con el nombre del archivo)
  const contextOptions = {
    general: "General.txt",
    courseDetails: "courseDetails.txt",
    professor: "professor.txt"
  };

  // Manejar el cambio de contexto
  const handleContextChange = (context) => {
    setSelectedContext(contextOptions[context]);
  };

  // Manejar el cambio en el campo de la pregunta
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question && selectedContext) {
      // Enviar la pregunta y el nombre del archivo de contexto al backend
      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ question, contextFile: selectedContext })
        });
      
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error del backend:", errorData.error);
          alert("Hubo un error: " + errorData.error);
          return;
        }
      
        const data = await response.json();
        console.log("Respuesta del modelo:", data);
        alert("Respuesta del chatbot: " + data.answer);
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("No se pudo conectar al servidor.");
      }
      
    }
  };

  return (
    <div className="chat-input-container">
      {/* Botones para seleccionar el tipo de pregunta */}
      <div className="context-buttons">
        <button onClick={() => handleContextChange('general')} className="context-button">Pregunta General</button>
        <button onClick={() => handleContextChange('courseDetails')} className="context-button">Detalles del Curso</button>
        <button onClick={() => handleContextChange('professor')} className="context-button">Profesor</button>
      </div>

      {/* Campo de texto para la pregunta */}
      <input
        type="text"
        placeholder="Preguntame sobre temas de la clase..."
        className="chat-input-field"
        value={question}
        onChange={handleQuestionChange}
      />
      
      {/* Botón para enviar la pregunta */}
      <button className="chat-input-button" onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default ChatInput;
