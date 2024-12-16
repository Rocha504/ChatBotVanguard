import React from 'react';
import '../styles/ChatbotStyles.css'; // Archivo CSS separado para estilos
import programasaurio from '../imagesChatBot/programasaurio.jpg';

const NerdSaurio = ({ triggerLight }) => {
  return (
    <div className="nerdsaurio-image-container">
      <img 
        className={`nerdsaurio-image ${triggerLight ? 'light-up' : ''}`} 
        src={programasaurio} 
        alt="NerdSaurio" 
      />
    </div>
  );
};

export default NerdSaurio;
