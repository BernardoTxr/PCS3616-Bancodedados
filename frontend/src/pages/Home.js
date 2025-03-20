import React from "react";
import "../App.css"; // Importando o arquivo de estilos

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo à Atlética da Poli!</h1>
      <p className="home-description">
        A Associação Atlética Acadêmica da Escola Politécnica da USP (Atlética da Poli) 
        é responsável por promover o esporte universitário, organizar campeonatos e 
        incentivar a participação dos alunos nas mais diversas modalidades esportivas.
      </p>

      <h2 className="home-subtitle">Sobre esta aplicação</h2>
      <p className="home-text">
        Esta plataforma foi desenvolvida para facilitar a gestão da Atlética, permitindo 
        o cadastro e gerenciamento de atletas, modalidades esportivas e campeonatos. Além disso, 
        ela auxilia no controle dos gastos e recursos destinados às atividades esportivas, 
        garantindo uma comunicação eficiente com o banco de dados.
      </p>

      <p className="home-text">
        Se você é atleta ou faz parte da gestão da Atlética, explore as funcionalidades 
        disponíveis para registrar novas competições, inscrever atletas e manter todas 
        as informações organizadas em um só lugar.
      </p>

      <p className="home-footer">
        Vamos juntos fortalecer o esporte universitário na Poli! 💙💛
      </p>
    </div>
  );
}
