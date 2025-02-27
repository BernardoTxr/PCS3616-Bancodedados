# PCS3616-Bancodedados

### Para começar o sistema
1. instale o docker compose
2. faça no terminal:
docker compose up --build

### Para fazer queries no banco de dados
1. entre no sistema de querie do postgre
docker ps pra pegar o nome do container
docker exec -it <nome_do_container_db> psql -U user -d lojinha_db
2. \dt mostra todas as tabelas
3. faça queries normal

### Para fazer uma inserção via CURL
1. Primeiro crie uma classe para o produto (senão não será possível criar o produto)
INSERT INTO classe VALUES (1,'primeira classe');
2. Depois, escreva o seguinte no terminal para fazer uma solicitação post na api
curl -X POST http://localhost:5000/produtos -H "Content-Type: application/json" -d '{
    "nome_vendedor": "Bernardo Teixeira",
    "cpf_vendedor": "990404804",
    "cidade_vendedor": "Fortaleza",
    "descricao_produto": "AI messi",
    "id_classe": 1
}'

### Para fazer uma consulta
1. basta colocar no terminal
curl -X GET http://localhost:5000/produtos

