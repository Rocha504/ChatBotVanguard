import React, { useState, useEffect, useRef} from 'react';
import '../styles/ChatbotStyles.css'; // El ../ sube un nivel a la carpeta superior, a 'src'
import { BsPersonFill, BsFillExclamationCircleFill, BsFacebook, BsGoogle  } from "react-icons/bs";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './firebase';



const ChatbotHeader = () => {

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Establecer usuario autenticado
      } else {
        setUser(null); // No hay usuario autenticado
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, []);
  
  const signInGoggle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      window.location.reload();
    }catch (error){
      console.log(error)
    }
  }

  const signInFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('public_profile')
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      window.location.reload();
    }catch (error){
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };  

  return (
    <header className="chatbot-header chatbot-title">
      <h1>CHATBOT VANGUARD</h1>
      <div className="header-right">
      {user ? (
          // Mostrar foto de perfil si el usuario está autenticado
          <img
            src={user.photoURL || 'https://via.placeholder.com/40'}
            alt="Profile"
            className="profile-pic"
            onClick={toggleMenu}
          />
        ) : (
          <button className="header-btn" onClick={toggleMenu}>  <BsPersonFill className='icon-btn' /> </button> 
        )}
        <button className="header-btn" onClick={toggleModal}> <BsFillExclamationCircleFill className='icon-btn'/></button>  
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Acerca del Chatbot</h2>
            <p>
              Bienvenido al Chatbot Vanguard. Este asistente está diseñado para ayudarte con preguntas
              frecuentes, proporcionarte soporte técnico, o guiarte en el uso de esta aplicación.
            </p>
            <ul>
              <li>Interacción en tiempo real con inteligencia artificial.</li>
              <li>Soporte 24/7 para tus consultas.</li>
              <li>Fácil acceso a recursos e información.</li>
            </ul>
            <button onClick={toggleModal} className="close-btn">Cerrar</button>
          </div>
        </div>
      )}
      {isMenuVisible && (
        <div className="dropdown-menu" ref={menuRef}>
          {user ? (
            // Mostrar opción de cerrar sesión si el usuario está autenticado
            <div className="menu-item" onClick={handleSignOut}>
              Cerrar sesión
            </div>
          ) : (
            <>
              <div className="menu-item" onClick={signInFacebook}><BsFacebook /> Facebook </div>
              <div className="menu-item" onClick={signInGoggle}><BsGoogle /> Google</div>
          </>
          )}
        </div>
      )}
    </header>
  );
};

export default ChatbotHeader;
