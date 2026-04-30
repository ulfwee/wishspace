import React from 'react';
import Header from './components/Header/Header'; 
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Header />
      
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Мій перший React проект: WishSpace</h1>
        <p>Якщо ти бачиш це і Header зверху — все працює ідеально!</p>
      </main>
    </div>
  );
}

export default App;