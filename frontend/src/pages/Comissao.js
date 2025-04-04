import React, { useState, useEffect } from "react";

export default function Comissao() {
  const [modalidades, setModalidades] = useState([]);
  const [comissoes, setComissoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedComissao, setSelectedComissao] = useState(null);
  const [formData, setFormData] = useState({
    nome_comissao: "",
    cpf_comissao: "",
    cargo_comissao: "",
    id_modalidade: "",
  });

  // 🔹 Buscar modalidades da API
  useEffect(() => {
    fetchComissoes();
    fetchModalidades(); // 🔹 Carrega modalidades na montagem do componente
  }, []);

  const fetchComissoes= () => {
    fetch("http://localhost:5000/comissao")
      .then((res) => res.json())
      .then((data) => setComissoes(data))
      .catch((error) => console.error("Erro ao buscar comissões:", error));
  };

    const fetchModalidades = () => {
    fetch("http://localhost:5000/modalidade")
      .then((res) => res.json())
      .then((data) => {
        setModalidades(data);
        })
      .catch((error) => console.error("Erro ao buscar modalidades:", error));
  };

  // 🔹 Atualiza os campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Enviar formulário para API
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/comissao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Comissão criada com sucesso!");
        setFormData({ nome_comissao: "", cpf_comissao: "", cargo_comissao: "", id_modalidade: ""});
        fetchComissoes(); // Atualiza lista após inserção
      })
      .catch((error) => console.error("Erro ao criar comissão:", error));
  };

  // 🔹 Função para deletar modalidade
  const handleDelete = (id) => {
    if (!window.confirm("Tem certeza que deseja deletar esta comissão?")) return;

    fetch(`http://localhost:5000/comissao/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        alert("Comissão deletada com sucesso!");
        fetchComissoes(); // Atualiza a lista após deletar
      })
      .catch((error) => console.error("Erro ao deletar comissão:", error));
  };

  return (
    <div style={styles.container}>
      {/* 🔹 Lista de Comissões */}
      <div style={styles.leftColumn}>
        <h2>Lista de Comissões</h2>
        <ul>
          {comissoes.map((comissao) => (
            <li key={comissao.id_comissao} style={styles.listItem}>
              <p onClick={() => { setSelectedComissao(comissao); setShowModal(true); }} >{comissao.nome_comissao}<br></br></p>
              <button
                onClick={() => handleDelete(comissao.id_comissao)}
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
        <h2>Cadastrar Comissão</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="nome_comissao"
            placeholder="Nome da Comissão"
            value={formData.nome_comissao}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cpf_comissao"
            placeholder="CPF da Comissão" 
            value={formData.cpf_comissao}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cargo_comissao"
            placeholder="Cargo da Comissão"
            value={formData.cargo_comissao}
            onChange={handleChange}
            required
          />
         <select
          name="id_modalidade"
          value={formData.id_modalidade}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma modalidade</option>
          {modalidades.map((modalidade) => (
            <option
              key={modalidade.id_modalidade}
              value={modalidade.id_modalidade}
            >
              {modalidade.nome_modalidade}
            </option>
          ))}
      </select>
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      {showModal && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                    <h2>Informações de {selectedComissao.nome_comissao}</h2>                       
                        <p>Nome: {selectedComissao.nome_comissao}</p>
                        <p>CPF: {selectedComissao.cpf_comissao}</p>
                        <p>Cargo: {selectedComissao.cargo_comissao}</p>
                        <p>
                          Modalidade: {
                            modalidades.find((m) => m.id_modalidade === selectedComissao.id_modalidade)?.nome_modalidade || "Não encontrada"
                          }
                        </p>
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
    maxHeight: "400px", // 🔹 Altura máxima
    overflowY: "auto", // 🔹 Scroll quando necessário
    border: "1px solid #ccc",
  },
  rightColumn: {
    flex: 1,
    background: "#e3f2fd",
    padding: "20px",
    borderRadius: "8px",
    maxHeight: "400px", // 🔹 Altura máxima
    overflowY: "auto", // 🔹 Scroll quando necessário
    border: "1px solid #ccc",
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
