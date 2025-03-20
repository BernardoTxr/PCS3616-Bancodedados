import React, { useState, useEffect } from "react";

export default function Atletas() {
    const [atletas, setAtletas] = useState([]);
    const [formData, setFormData] = useState({
      nome_atleta: "",
      cpf_atleta: "",
      curso_atleta: "",
      nusp_atleta: "",
    });
  
    // 🔹 Buscar atletas da API
    useEffect(() => {
      fetchAtletas();
    }, []);
  
    const fetchAtletas = () => {
      fetch("http://localhost:5000/atleta")
        .then((res) => res.json())
        .then((data) => setAtletas(data))
        .catch((error) => console.error("Erro ao buscar atletas:", error));
    };
  
    // 🔹 Atualiza os campos do formulário
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // 🔹 Enviar formulário para API
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:5000/atleta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Atleta cadastrado com sucesso!");
          setFormData({ nome_atleta: "", cpf_atleta: "", curso_atleta: "", nusp_atleta: "" });
          fetchAtletas(); // Atualiza lista após inserção
        })
        .catch((error) => console.error("Erro ao cadastrar atleta:", error));
    };
  
    // 🔹 Função para deletar atleta
    const handleDelete = (id) => {
      if (!window.confirm("Tem certeza que deseja deletar este atleta?")) return;
  
      fetch(`http://localhost:5000/atleta/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          alert("Atleta deletado com sucesso!");
          fetchAtletas(); // Atualiza a lista após deletar
        })
        .catch((error) => console.error("Erro ao deletar atleta:", error));
    };
  
    return (
      <div style={styles.container}>
        {/* 🔹 Lista de Atletas */}
        <div style={styles.leftColumn}>
          <h2>Lista de Atletas</h2>
          <ul>
            {atletas.map((atleta) => (
              <li key={atleta.id_atleta} style={styles.listItem}>
                {atleta.nome_atleta}
                <button onClick={() => handleDelete(atleta.id_atleta)} style={styles.deleteButton}>🗑</button>
              </li>
            ))}
          </ul>
        </div>
  
        {/* 🔹 Formulário */}
        <div style={styles.rightColumn}>
          <h2>Cadastrar Atleta</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" name="nome_atleta" placeholder="Nome" value={formData.nome_atleta} onChange={handleChange} required />
            <input type="text" name="cpf_atleta" placeholder="CPF" value={formData.cpf_atleta} onChange={handleChange} required />
            <input type="text" name="curso_atleta" placeholder="Curso" value={formData.curso_atleta} onChange={handleChange} required />
            <input type="text" name="nusp_atleta" placeholder="NUSP" value={formData.nusp_atleta} onChange={handleChange} required />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    );
  }
  
  // 🔹 Estilos inline para layout e botões
  const styles = {
    container: {
      display: "flex",
      gap: "20px",
      padding: "20px",
    },
    leftColumn: {
      flex: 1,
      background: "#f8f8f8",
      padding: "20px",
      borderRadius: "8px",
    },
    rightColumn: {
      flex: 1,
      background: "#e3f2fd",
      padding: "20px",
      borderRadius: "8px",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px",
      borderBottom: "1px solid #ccc",
    },
    deleteButton: {
      background: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
      borderRadius: "5px",
    },
  };