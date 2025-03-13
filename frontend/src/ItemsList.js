import React, { useState } from 'react';

function ItemsList() {
    const [items, setItems] = useState([]);
    const [showItems, setShowItems] = useState(false);

    const fetchItems = () => {
        fetch('http://localhost:5000/produtos')
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setShowItems(true);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    };

    return (
        <div>
            <button onClick={fetchItems}>Carregar Produtos</button>
            {showItems && (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>{item.descricao}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ItemsList;
