import React, { useState, useEffect } from "react";

export default function InscreverCampeonato() {
    const [campeonatos, setCampeonatos] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const [selectedCampeonato, setSelectedCampeonato] = useState(null);
    const [selectedModalidades, setSelectedModalidades] = useState([]);

    useEffect(() => {
        fetchCampeonatos();
        fetchModalidades();
    }, []);

    const fetchCampeonatos = () => {
        fetch("http://localhost:5000/campeonato")
            .then((res) => res.json())
            .then((data) => setCampeonatos(data))
            .catch((error) => console.error("Erro ao buscar campeonatos:", error));
    };

    const fetchModalidades = () => {
        fetch("http://localhost:5000/modalidade")
            .then((res) => res.json())
            .then((data) => setModalidades(data))
            .catch((error) => console.error("Erro ao buscar modalidades:", error));
    };

    const toggleModalidadeSelection = (modalidade) => {
        setSelectedModalidades((prev) => {
            if (prev.some(a => a.id_modalidade === modalidade.id_modalidade)) {
                return prev.filter(a => a.id_modalidade !== modalidade.id_modalidade);
            } else {
                return [...prev, modalidade];
            }
        });
    };

    const handleCadastro = () => {
        if (!selectedCampeonato || selectedModalidades.length === 0) {
            alert("Selecione pelo menos uma modalidade e um campeonato.");
            return;
        }

        selectedModalidades.forEach(modalidade => {
            fetch("http://localhost:5000/modalidade_campeonato", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_campeonato: selectedCampeonato.id_campeonato,
                    id_modalidade: modalidade.id_modalidade,
                }),
            })
            .then(response => response.json())
            .then(data => console.log("Sucesso:", data))
            .catch(error => console.error("Erro ao cadastrar:", error));
        });

        alert("Cadastro realizado com sucesso!");
        setSelectedModalidades([]);
        setSelectedCampeonato(null);
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftColumn}>
                <h2>Lista de Modalidades</h2>
                <ul>
                    {modalidades.map((modalidade) => (
                        <li key={modalidade.id_modalidade} style={{ ...styles.listItem, background: selectedModalidades.some(a => a.id_modalidade === modalidade.id_modalidade) ? "#c8e6c9" : "transparent" }}>
                            <span onClick={() => toggleModalidadeSelection(modalidade)}>
                                {modalidade.nome_modalidade}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={styles.rightColumn}>
                <h2>Lista de Campeonatos</h2>
                <ul>
                    {campeonatos.map((campeonato) => (
                        <li key={campeonato.id_campeonato} style={{ ...styles.listItem, background: selectedCampeonato?.id_campeonato === campeonato.id_campeonato ? "#bbdefb" : "transparent" }}>
                            <span onClick={() => setSelectedCampeonato(campeonato)}>
                                {campeonato.nome_campeonato}
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
    leftColumn: { background: "#f8f8f8", padding: "20px", borderRadius: "8px", maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc" },
    rightColumn: { background: "#e3f2fd", padding: "20px", borderRadius: "8px", maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc" },
    listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", borderBottom: "1px solid #ccc", cursor: "pointer" },
    button: { marginTop: "10px", padding: "10px 20px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", alignSelf: "center" },
};