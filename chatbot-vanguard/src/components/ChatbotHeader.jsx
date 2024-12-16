import React, { useState } from 'react';
import '../styles/ChatbotStyles.css'; // El ../ sube un nivel a la carpeta superior, a 'src'
import { BsPersonFill, BsFillExclamationCircleFill } from "react-icons/bs";

const ChatbotHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir o cerrar el modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="chatbot-header chatbot-title">
      <h1>CHATBOT VANGUARD</h1> 
      <div className="header-right">
        <button className="header-btn"> 
          <BsPersonFill className='icon-btn' /> 
        </button> 
        <button className="header-btn" onClick={toggleModal}>
          <BsFillExclamationCircleFill className='icon-btn' />
        </button>  
      </div>

      {/* Modal para instrucciones */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Instrucciones</h2>
            <p>1. Selecciona el tipo de pregunta usando los botones de contexto arriba de la barra de texto.</p>
            <p>2. Escribe tu pregunta en el campo de texto.</p>
            <p>3. Haz clic en "Enviar" para recibir una respuesta del chatbot.</p>
            <p>4. Cambia el contexto si quieres preguntar sobre un tema diferente.</p>
            <button className="close-modal-btn" onClick={toggleModal}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default ChatbotHeader;
