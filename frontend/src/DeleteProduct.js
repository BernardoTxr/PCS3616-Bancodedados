import React, { useState } from 'react';

function DeleteProduct() {
  const [idProduto, setIdProduto] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/produtos/${idProduto}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Produto removido com sucesso!');
      } else {
        setMessage(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setMessage('Erro ao excluir produto');
    }
  };

  return (
    <div>
      <h2>Excluir Produto</h2>
      <div>
        <label>ID do Produto:</label>
        <input
          type="text"
          value={idProduto}
          onChange={(e) => setIdProduto(e.target.value)}
          required
        />
      </div>
      <button onClick={handleDelete}>Excluir Produto</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteProduct;
