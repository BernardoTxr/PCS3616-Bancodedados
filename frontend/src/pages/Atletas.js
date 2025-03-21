import React, { useState, useEffect } from "react";

export default function Atletas() {
    const [atletas, setAtletas] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAtleta, setSelectedAtleta] = useState(null);
    const [formData, setFormData] = useState({
        nome_atleta: "",
        cpf_atleta: "",
        curso_atleta: "",
        nusp_atleta: "",
    });

    useEffect(() => {
        fetchAtletas();
    }, []);

    const fetchAtletas = () => {
        fetch("http://localhost:5000/atleta")
            .then((res) => res.json())
            .then((data) => setAtletas(data))
            .catch((error) => console.error("Erro ao buscar atletas:", error));
    };

    const fetchModalidades = (id_atleta) => {
        fetch(`http://localhost:5000/modalidade_atleta/${id_atleta}`)
            .then((res) => res.json())
            .then((data) => {
                setModalidades(data);
                setShowModal(true);
            })
            .catch((error) => console.error("Erro ao buscar modalidades:", error));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                fetchAtletas();
            })
            .catch((error) => console.error("Erro ao cadastrar atleta:", error));
    };

    const handleDelete = (id) => {
        if (!window.confirm("Tem certeza que deseja deletar este atleta?")) return;

        fetch(`http://localhost:5000/atleta/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => {
                alert("Atleta deletado com sucesso!");
                fetchAtletas();
            })
            .catch((error) => console.error("Erro ao deletar atleta:", error));
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftColumn}>
                <h2>Lista de Atletas</h2>
                <ul>
                    {atletas.map((atleta) => (
                        <li key={atleta.id_atleta} style={styles.listItem}>
                            <span onClick={() => { setSelectedAtleta(atleta); fetchModalidades(atleta.id_atleta); }} style={styles.atletaNome}>
                                {atleta.nome_atleta}
                            </span>
                            <button onClick={() => handleDelete(atleta.id_atleta)} style={styles.deleteButton}>🗑</button>
                        </li>
                    ))}
                </ul>
            </div>

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

            {showModal && selectedAtleta && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Modalidades de {selectedAtleta.nome_atleta}</h2>
                        <ul>
                            {modalidades.length > 0 ? modalidades.map((mod) => (
                                <li key={mod.id_modalidade}>{mod.nome_modalidade}</li>
                            )) : <p>Este atleta não possui modalidades cadastradas.</p>}
                        </ul>
                        <button onClick={() => setShowModal(false)} style={styles.closeButton}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { display: "flex", gap: "20px", padding: "20px" },
    leftColumn: { flex: 1, background: "#f8f8f8", padding: "20px", borderRadius: "8px" },
    rightColumn: { flex: 1, background: "#e3f2fd", padding: "20px", borderRadius: "8px" },
    listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", borderBottom: "1px solid #ccc" },
    atletaNome: { cursor: "pointer", color: "blue", textDecoration: "underline" },
    deleteButton: { background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" },
    modal: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center" },
    modalContent: { background: "white", padding: "20px", borderRadius: "8px", textAlign: "center" },
    closeButton: { marginTop: "10px", padding: "8px 16px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" },
};
