import logo from './logo.svg';
import './App.css';
import React from 'react';
import './App.css';
import ChatbotHeader from './components/ChatbotHeader'; // Importa el componente ChatbotHeader
import NerdSaurio from './components/NerdSaurio'; // Importa el componente ChatbotHeader
import ChatInput from './components/ChatInput';



function App() {
  return (
    <div className="App">
    <ChatbotHeader /> 
    <NerdSaurio/>
    <ChatInput/>
    </div>
  );
}

export default App;
