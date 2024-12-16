import React, { useState } from 'react'; // Asegúrate de importar useState aquí
import logo from './logo.svg';
import './App.css';
import './App.css';
import ChatbotHeader from './components/ChatbotHeader'; // Importa el componente ChatbotHeader
import NerdSaurio from './components/NerdSaurio'; // Importa el componente ChatbotHeader
import ChatInput from './components/ChatInput';





function App() {
  const [triggerLight, setTriggerLight] = useState(false);
  return (
    <div className="App">
    <ChatbotHeader/> 
    <NerdSaurio triggerLight={triggerLight} />
    <ChatInput setTriggerLight={setTriggerLight} />
    </div>
  );
}

export default App;
