import React from 'react';
import '../styles/ChatbotStyles.css'; // El ../ sube un nivel a la carpeta superior, a 'src'
import { BsPersonFill, BsFillExclamationCircleFill  } from "react-icons/bs";
 



const ChatbotHeader = () => {
  return (
    <header className="chatbot-header chatbot-title">
      <h1>CHATBOT VANGUARD</h1>
      <div className="header-right">
        <button className="header-btn"> <BsPersonFill className='icon-btn' /> </button> 
        <button className="header-btn"> <BsFillExclamationCircleFill className='icon-btn'/></button>  
      </div>
    </header>
  );
};

export default ChatbotHeader;
