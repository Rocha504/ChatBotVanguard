import React, { useState } from 'react';
import '../styles/ChatbotStyles.css';

const ChatInput = () => {
  const [selectedContext, setSelectedContext] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(''); // Texto completo de la respuesta
  const [displayedText, setDisplayedText] = useState(''); // Texto que se "escribe"
  const [isTyping, setIsTyping] = useState(false); // Controla si se está generando la respuesta

  const contextOptions = {
    general: "general.txt",
    metodologias: "metodologias.txt",
    competencias: "competencias.txt",
    evaluaciones: "evaluaciones.txt",
    libros: "libros.txt"
  };

  const handleContextChange = (context) => {
    setSelectedContext(contextOptions[context]);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question && selectedContext) {
      setResponse(''); // Limpia la respuesta completa
      setDisplayedText(''); // Limpia el texto mostrado
      setIsTyping(true); // Inicia el efecto de escritura
  
      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, contextFile: selectedContext }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error del backend:", errorData.error);
          alert("Hubo un error: " + errorData.error);
          setIsTyping(false);
          return;
        }
  
        const data = await response.json();
        if (data && data.answer) {
          setResponse(data.answer); // Guarda la respuesta completa
          simulateTypingEffect(data.answer); // Inicia el efecto de escritura
        } else {
          throw new Error("No se recibió una respuesta válida del backend.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("No se pudo conectar al servidor.");
        setIsTyping(false);
      }
    }
  };
  
  // Función para simular el efecto de escritura
  const simulateTypingEffect = (text) => {
    let index = 0;
    const typingSpeed = 50; // Velocidad de escritura en milisegundos
  
    setDisplayedText(''); // Asegura que esté vacío al iniciar
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => {
        // Concatena solo hasta el índice actual del texto
        const updatedText = text.slice(0, index + 1);
        return updatedText;
      });
  
      index++;
  
      if (index === text.length) {
        clearInterval(typingInterval); // Detenemos el intervalo cuando se completa la escritura
        setIsTyping(false);
      }
    }, typingSpeed);
  };
  

  return (
    <div className="chat-input-container">
      <div className="context-buttons">
        <button onClick={() => handleContextChange('general')} className="context-button">Pregunta General</button>
        <button onClick={() => handleContextChange('competencias')} className="context-button">Competencias</button>
        <button onClick={() => handleContextChange('metodologias')} className="context-button">Metodologias de aprendizaje</button>
        <button onClick={() => handleContextChange('libros')} className="context-button">Bibliografia</button>
        <button onClick={() => handleContextChange('evaluaciones')} className="context-button">Evaluaciones</button>
      </div>

      <input
        type="text"
        placeholder="Preguntame sobre temas de la clase..."
        className="chat-input-field"
        value={question}
        onChange={handleQuestionChange}
      />

      <button className="chat-input-button" onClick={handleSubmit} disabled={isTyping}>
        {isTyping ? 'Escribiendo...' : 'Enviar'}
      </button>

      {/* Sección para mostrar la respuesta */}
      {displayedText && (
        <div className="chat-response">
          <p><strong>Respuesta del Chatbot:</strong> {displayedText}</p>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
