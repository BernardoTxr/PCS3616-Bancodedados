import React, { useState } from 'react';

function AddProductForm() {
    const [formData, setFormData] = useState({
        nome_vendedor: '',
        cpf_vendedor: '',
        cidade_vendedor: '',
        descricao_produto: '',
        id_classe: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Produto adicionado com sucesso!');
            setFormData({ nome_vendedor: '', cpf_vendedor: '', cidade_vendedor: '', descricao_produto: '', id_classe: '' });
        } else {
            setMessage(`Erro: ${data.message}`);
        }
    };

    return (
        <div>
            <h2>Adicionar Produto</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome_vendedor" placeholder="Nome do Vendedor" value={formData.nome_vendedor} onChange={handleChange} required />
                <input type="text" name="cpf_vendedor" placeholder="CPF do Vendedor" value={formData.cpf_vendedor} onChange={handleChange} required />
                <input type="text" name="cidade_vendedor" placeholder="Cidade do Vendedor" value={formData.cidade_vendedor} onChange={handleChange} required />
                <input type="text" name="descricao_produto" placeholder="Descrição do Produto" value={formData.descricao_produto} onChange={handleChange} required />
                <input type="number" name="id_classe" placeholder="ID da Classe" value={formData.id_classe} onChange={handleChange} required />
                <button type="submit">Adicionar Produto</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddProductForm;
