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

### Documentação da API até agora
Rotas Disponíveis:

1. Vendedores
   - GET /vendedores: Lista todos os vendedores.
   - POST /vendedores: Adiciona um novo vendedor.

2. Classes de Produtos
   - GET /classes: Lista todas as classes de produtos.
   - POST /classes: Adiciona uma nova classe de produto.

3. Produtos
   - GET /produtos: Lista todos os produtos.
   - GET /produtos/{id}: Retorna um produto específico pelo ID.
   - POST /produtos: Adiciona um novo produto.
   - PUT /produtos/{id}: Atualiza os dados de um produto existente.
   - DELETE /produtos/{id}: Remove um produto.

Status Codes:
- 200 OK: Requisição bem-sucedida.
- 201 Created: Recurso criado com sucesso.
- 400 Bad Request: Erro na requisição do cliente.
- 404 Not Found: Recurso não encontrado.
- 500 Internal Server Error: Erro no servidor.

