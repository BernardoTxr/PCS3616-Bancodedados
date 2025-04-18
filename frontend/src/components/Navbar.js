import React from "react";
import "../App.css"; // Importa o arquivo de estilos
import { Link } from "react-router-dom"; // Importa o componente Link
import logo from "../assets/logo_dark.png"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Logo Atlética" className="logo-img" />
          <span>Atlética POLI</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/atletas">Atletas</Link></li>
          <li><Link to="/modalidades">Modalidades</Link></li>
          <li><Link to="/campeonatos">Campeonatos</Link></li>
          <li><Link to="/comissao">Comissão Técnica</Link></li>
          <li><Link to="/inscrever_campeonato">Inscrever Campeonato</Link></li>
          <li><Link to="/cadastrar_times">Cadastrar Times</Link></li>
        </ul>
      </div>
    </nav>
  );
}
