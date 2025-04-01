import React, { useState, useEffect } from "react";

export default function Modalidades() {
  const [modalidades, setModalidades] = useState([]);
  const [atletas, setAtletas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedModalidade, setSelectedModalidade] = useState(null);
  const [formData, setFormData] = useState({
    nome_modalidade: "",
    saldo_modalidade: "",
  });

  // 🔹 Buscar modalidades da API
  useEffect(() => {
    fetchModalidades();
  }, []);

  const fetchModalidades = () => {
    fetch("http://localhost:5000/modalidade")
      .then((res) => res.json())
      .then((data) => setModalidades(data))
      .catch((error) => console.error("Erro ao buscar modalidades:", error));
  };

  const fetchAtletas = (id_modalidade) => {
    fetch(`http://localhost:5000/atleta_modalidade/${id_modalidade}`)
        .then((res) => res.json())
        .then((data) => {
            setAtletas(data);
            setShowModal(true);
        })
        .catch((error) => console.error("Erro ao buscar atletas:", error));
};

  // 🔹 Atualiza os campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Enviar formulário para API
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/modalidade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Modalidade criada com sucesso!");
        setFormData({ nome_modalidade: "", saldo_modalidade: "" });
        fetchModalidades(); // Atualiza lista após inserção
      })
      .catch((error) => console.error("Erro ao criar modalidade:", error));
  };

  // 🔹 Função para deletar modalidade
  const handleDelete = (id) => {
    if (!window.confirm("Tem certeza que deseja deletar esta modalidade?")) return;

    fetch(`http://localhost:5000/modalidade/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        alert("Modalidade deletada com sucesso!");
        fetchModalidades(); // Atualiza a lista após deletar
      })
      .catch((error) => console.error("Erro ao deletar modalidade:", error));
  };

  return (
    <div style={styles.container}>
      {/* 🔹 Lista de Modalidades */}
      <div style={styles.leftColumn}>
        <h2>Lista de Modalidades</h2>
        <ul>
          {modalidades.map((modalidade) => (
            <li key={modalidade.id_modalidade} style={styles.listItem}>
              <p onClick={() => { setSelectedModalidade(modalidade); fetchAtletas(modalidade.id_modalidade); }} >{modalidade.nome_modalidade}<br></br>
              Saldo: R$ {modalidade.saldo_modalidade}</p>
              <button
                onClick={() => handleDelete(modalidade.id_modalidade)}
                style={styles.deleteButton}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Formulário */}
      <div style={styles.rightColumn}>
        <h2>Cadastrar Modalidade</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="nome_modalidade"
            placeholder="Nome da Modalidade"
            value={formData.nome_modalidade}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="saldo_modalidade"
            placeholder="Saldo da Modalidade"
            value={formData.saldo_modalidade}
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      {showModal && selectedModalidade && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Atletas de {selectedModalidade.nome_modalidade}</h2>
                        <ul>
                            {atletas.length > 0 ? atletas.map((atlet) => (
                                <li key={atlet.id_atleta}>{atlet.nome_atleta}</li>
                            )) : <p>Esta modalidade não possui atletas cadastrados.</p>}
                        </ul>
                        <button onClick={() => setShowModal(false)} style={styles.closeButton}>Fechar</button>
                    </div>
                </div>
            )}

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
  modal: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center" },
  modalContent: { background: "white", padding: "20px", borderRadius: "8px", textAlign: "center" },
  closeButton: { marginTop: "10px", padding: "8px 16px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" },
};
