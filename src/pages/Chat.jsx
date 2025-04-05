import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiSend, FiSave, FiArrowRight } from 'react-icons/fi';

const Chat = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "¡Hola! Soy tu asistente para crear CV's. Dime, ¿sabes qué es un Currículum Vitae?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');

    // Simular respuesta de la IA después de 1 segundo
    setTimeout(() => {
      const aiResponses = [
        "Perfecto, gracias por contestar, te ayudaré a crear el CV más 'clean' perfecto para ti.",
        "Entiendo lo que necesitas. Vamos a trabajar en tu experiencia profesional primero.",
        "Esa es una excelente pregunta. El CV debe ser claro y conciso.",
        "¿En qué industria estás buscando trabajo? Esto me ayudará a personalizar tu CV.",
        "Vamos a destacar tus habilidades más relevantes para el puesto que buscas."
      ];
      
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)] 
      }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    // Lógica de logout aquí
    navigate('/login');
  };

  const saveProgress = () => {
    // Lógica para guardar el progreso
    console.log('Progreso guardado:', messages);
    alert('Progreso guardado correctamente');
  };

  const goToTemplates = () => {
    // Redirige a la página de plantillas
    navigate('/plantillas');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Panel lateral */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}>
        <div className="flex flex-col h-full p-4 border-r border-gray-200">
          <div className="mb-6 p-2">
            <h2 className="text-lg font-semibold text-gray-800">Opciones del CV</h2>
          </div>
          <nav className="flex-1 space-y-1">
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              Perfil Profesional
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              Experiencia Laboral
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              Educación
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              Habilidades
            </button>
          </nav>
          <div className="mt-auto p-2 border-t border-gray-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={saveProgress}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <FiSave className="mr-2" />
                Guardar
              </button>
              <button 
                onClick={goToTemplates}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                <FiArrowRight className="mr-2" />
                Continuar
              </button>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Área principal del chat */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-0 lg:ml-64' : ''}`}>
        {/* Encabezado */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center px-4 py-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 text-gray-500 hover:text-gray-600 lg:hidden"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-medium text-gray-800">Asistente de CV</h1>
          </div>
        </header>

        {/* Área de conversación */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 ${message.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-xs rounded-bl-none border border-gray-200'}`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Área de entrada de texto */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 border border-gray-300 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`absolute right-2 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${inputMessage.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">La IA puede cometer errores. Verifica la información importante.</p>
          </div>
        </div>
      </div>

      {/* Overlay para móviles */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Chat;