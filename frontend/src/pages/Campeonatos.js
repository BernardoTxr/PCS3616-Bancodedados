import React, { useState, useEffect } from "react";

export default function Campeonatos() {
    const [campeonatos, setCampeonatos] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCampeonato, setSelectedCampeonato] = useState(null);
    const [formData, setFormData] = useState({
        nome_campeonato: "",
        data_inicio: "",
        data_fim: "",
        custo_por_pessoa: ""
    });

    // 🔹 Buscar campeonatos da API
    useEffect(() => {
        fetchCampeonatos();
    }, []);

    const fetchCampeonatos = () => {
        fetch("http://localhost:5000/campeonato")
            .then((res) => res.json())
            .then((data) => setCampeonatos(data))
            .catch((error) => console.error("Erro ao buscar campeonatos:", error));
    };

    const fetchModalidades = (id_campeonato) => {
        fetch(`http://localhost:5000/modalidade_by_campeonato/${id_campeonato}`)
            .then((res) => res.json())
            .then((data) => {
                setModalidades(data);
                setShowModal(true);
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
        fetch("http://localhost:5000/campeonato", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Campeonato cadastrado com sucesso!");
                setFormData({ nome_campeonato: "", data_inicio: "", data_fim: "", custo_por_pessoa: "" });
                fetchCampeonatos(); // Atualiza lista após inserção
            })
            .catch((error) => console.error("Erro ao cadastrar campeonato:", error));
    };

    // 🔹 Função para deletar campeonato
    const handleDelete = (id) => {
        if (!window.confirm("Tem certeza que deseja deletar este campeonato?")) return;

        fetch(`http://localhost:5000/campeonato/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => {
                alert("Campeonato deletado com sucesso!");
                fetchCampeonatos(); // Atualiza a lista após deletar
            })
            .catch((error) => console.error("Erro ao deletar campeonato:", error));
    };

    return (
        <div style={styles.container}>
            {/* 🔹 Lista de Campeonatos */}
            <div style={styles.leftColumn}>
                <h2>Lista de Campeonatos</h2>
                <ul>
                    {campeonatos.map((campeonato) => (
                        <li key={campeonato.id_campeonato} style={styles.listItem}>
                            <p onClick={() => { setSelectedCampeonato(campeonato); fetchModalidades(campeonato.id_campeonato); }} style={styles.atletaNome}>{campeonato.nome_campeonato}<br></br>
                            Valor por pessoa: R$ {campeonato.custo_por_pessoa}</p>
                            <button onClick={() => handleDelete(campeonato.id_campeonato)} style={styles.deleteButton}>🗑</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 🔹 Formulário */}
            <div style={styles.rightColumn}>
                <h2>Cadastrar Campeonato</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input type="text" name="nome_campeonato" placeholder="Nome do Campeonato" value={formData.nome_campeonato} onChange={handleChange} required />
                    <input type="date" name="data_inicio" value={formData.data_inicio} onChange={handleChange} required />
                    <input type="date" name="data_fim" value={formData.data_fim} onChange={handleChange} required />
                    <input type="number" name="custo_por_pessoa" placeholder="Custo por Pessoa" value={formData.custo_por_pessoa} onChange={handleChange} required />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>

            {showModal && selectedCampeonato && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Modalidades de {selectedCampeonato.nome_campeonato}</h2>
                        <ul>
                            {modalidades.length > 0 ? modalidades.map((mod) => (
                                <li>{mod.nome_modalidade}</li>
                            )) : <p>Este campeonato não possui modalidades cadastradas.</p>}
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
