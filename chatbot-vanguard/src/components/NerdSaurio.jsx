import React from 'react';
import '../styles/ChatbotStyles.css'; // Archivo CSS separado para estilos
import programasaurio from '../imagesChatBot/programasaurio.jpg';


const NerdSaurio = ({ src, alt }) => {
  return (
    <div className="nerdsaurio-image-container">
      <img className="nerdsaurio-image" src={programasaurio} alt="simon" />
    </div>
  );
};

export default NerdSaurio;


