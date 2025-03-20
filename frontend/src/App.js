import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Atletas from './pages/Atletas';
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
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
