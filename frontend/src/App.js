import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Atletas from './pages/Atletas';
import Campeonatos from './pages/Campeonatos';
import Modalidades from './pages/Modalidades';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar /> {/* A Navbar aparece em todas as páginas */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/atletas" element={<Atletas />} />
          <Route path="/modalidades" element={<Modalidades />} />
          <Route path="/campeonatos" element={<Campeonatos />} />
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
