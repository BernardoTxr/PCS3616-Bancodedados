import React, { useState, useEffect } from "react";

export default function CadastrarTimes() {
    const [atletas, setAtletas] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const [selectedAtletas, setSelectedAtletas] = useState([]);
    const [selectedModalidade, setSelectedModalidade] = useState(null);

    useEffect(() => {
        fetchAtletas();
        fetchModalidades();
    }, []);

    const fetchAtletas = () => {
        fetch("http://localhost:5000/atleta")
            .then((res) => res.json())
            .then((data) => setAtletas(data))
            .catch((error) => console.error("Erro ao buscar atletas:", error));
    };

    const fetchModalidades = () => {
        fetch("http://localhost:5000/modalidade")
            .then((res) => res.json())
            .then((data) => setModalidades(data))
            .catch((error) => console.error("Erro ao buscar modalidades:", error));
    };

    const toggleAtletaSelection = (atleta) => {
        setSelectedAtletas((prev) => {
            if (prev.some(a => a.id_atleta === atleta.id_atleta)) {
                return prev.filter(a => a.id_atleta !== atleta.id_atleta);
            } else {
                return [...prev, atleta];
            }
        });
    };

    const handleCadastro = () => {
        if (!selectedModalidade || selectedAtletas.length === 0) {
            alert("Selecione pelo menos um atleta e uma modalidade.");
            return;
        }

        selectedAtletas.forEach(atleta => {
            fetch("http://localhost:5000/modalidade_atleta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_modalidade: selectedModalidade.id_modalidade,
                    id_atleta: atleta.id_atleta,
                }),
            })
            .then(response => response.json())
            .then(data => console.log("Sucesso:", data))
            .catch(error => console.error("Erro ao cadastrar:", error));
        });

        alert("Cadastro realizado com sucesso!");
        setSelectedAtletas([]);
        setSelectedModalidade(null);
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftColumn}>
                <h2>Lista de Atletas</h2>
                <ul>
                    {atletas.map((atleta) => (
                        <li key={atleta.id_atleta} style={{ ...styles.listItem, background: selectedAtletas.some(a => a.id_atleta === atleta.id_atleta) ? "#c8e6c9" : "transparent" }}>
                            <span onClick={() => toggleAtletaSelection(atleta)} style={styles.atletaNome}>
                                {atleta.nome_atleta}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={styles.rightColumn}>
                <h2>Lista de Modalidades</h2>
                <ul>
                    {modalidades.map((modalidade) => (
                        <li key={modalidade.id_modalidade} style={{ ...styles.listItem, background: selectedModalidade?.id_modalidade === modalidade.id_modalidade ? "#bbdefb" : "transparent" }}>
                            <span onClick={() => setSelectedModalidade(modalidade)} style={styles.atletaNome}>
                                {modalidade.nome_modalidade}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={handleCadastro} style={styles.button}>Cadastrar</button>
        </div>
    );
}

const styles = {
    container: { display: "flex", gap: "20px", padding: "20px" },
    leftColumn: { background: "#f8f8f8", padding: "20px", borderRadius: "8px" },
    rightColumn: { background: "#e3f2fd", padding: "20px", borderRadius: "8px" },
    listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", borderBottom: "1px solid #ccc", cursor: "pointer" },
    atletaNome: { cursor: "pointer", color: "blue", textDecoration: "underline" },
    button: { marginTop: "10px", padding: "10px 20px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", alignSelf: "center" },
};