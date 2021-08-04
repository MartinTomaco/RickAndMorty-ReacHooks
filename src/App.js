import React, { useState } from 'react';
import Header from './componentes/Header';
import Characters from './componentes/Characters';


function App() {
  const [darkMode, setDarkMode] = useState(false);    
  const handleClick = () => {
      setDarkMode(!darkMode);
  }
    
  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header />
      <div>
        <button type="button" onClick={handleClick}>
          { darkMode ? 'Change to LightMode' : 'Change to DarkMode' }
        </button>
      </div>  
      <Characters />
    </div>
  );
}

export default App;