import React from 'react';
import '../styles/ChatbotStyles.css';

const ChatInput = () => {
  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Preguntame sobre temas de la clase..."
        className="chat-input-field"
      />
      <button className="chat-input-button">Enviar</button>
    </div>
    
  );
};

export default ChatInput;
