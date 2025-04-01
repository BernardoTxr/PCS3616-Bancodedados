import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Atletas from './pages/Atletas';
import Campeonatos from './pages/Campeonatos';
import Modalidades from './pages/Modalidades';
import CadastrarTimes from './pages/CadastrarTimes';
import InscreverCampeonato from './pages/InscreverCampeonato';
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
          <Route path="/cadastrar_times" element={<CadastrarTimes />} />
          <Route path="/inscrever_campeonato" element={<InscreverCampeonato />} />
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
