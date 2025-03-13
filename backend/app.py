from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", "sqlite:///database.db"
)
db.init_app(app)


# Definindo as classes do modelo
class Vendedor(db.Model):
    id_vendedor = db.Column(db.Integer, primary_key=True)
    nome_vendedor = db.Column(db.String(100), nullable=False)
    cpf_vendedor = db.Column(db.String(11), unique=True, nullable=False)
    cidade_vendedor = db.Column(db.String(100), nullable=False)


class Classe(db.Model):
    id_classe = db.Column(db.Integer, primary_key=True)
    descricao_classe = db.Column(db.String(100), unique=True, nullable=False)


class Produto(db.Model):
    id_produto = db.Column(db.Integer, primary_key=True)
    descricao_produto = db.Column(db.String(200), nullable=False)
    id_classe = db.Column(db.Integer, db.ForeignKey("classe.id_classe"), nullable=False)
    id_vendedor = db.Column(
        db.Integer, db.ForeignKey("vendedor.id_vendedor"), nullable=False
    )


# Criando as tabelas no contexto da aplicação
with app.app_context():
    db.create_all()


# ---------------- ROTAS ----------------


# ✅ Listar todos os vendedores
@app.route("/vendedores", methods=["GET"])
def get_vendedores():
    vendedores = Vendedor.query.all()
    return jsonify([{"id": v.id_vendedor, "nome": v.nome_vendedor} for v in vendedores])


# ✅ Adicionar um novo vendedor
@app.route("/vendedores", methods=["POST"])
def add_vendedor():
    data = request.json
    vendedor = Vendedor(
        nome_vendedor=data["nome_vendedor"],
        cpf_vendedor=data["cpf_vendedor"],
        cidade_vendedor=data["cidade_vendedor"],
    )
    db.session.add(vendedor)
    db.session.commit()
    return jsonify({"message": "Vendedor adicionado com sucesso!"})


# ✅ Listar todas as classes de produtos
@app.route("/classes", methods=["GET"])
def get_classes():
    classes = Classe.query.all()
    return jsonify(
        [{"id": c.id_classe, "descricao": c.descricao_classe} for c in classes]
    )


# ✅ Adicionar uma nova classe de produto
@app.route("/classes", methods=["POST"])
def add_classe():
    data = request.json
    classe = Classe(descricao_classe=data["descricao_classe"])
    db.session.add(classe)
    db.session.commit()
    return jsonify({"message": "Classe adicionada com sucesso!"})


# ✅ Listar todos os produtos
@app.route("/produtos", methods=["GET"])
def get_produtos():
    produtos = Produto.query.all()
    return jsonify(
        [{"id": p.id_produto, "descricao": p.descricao_produto} for p in produtos]
    )


# ✅ Obter detalhes de um produto específico
@app.route("/produtos/<int:id>", methods=["GET"])
def get_produto(id):
    produto = Produto.query.get(id)
    if produto:
        return jsonify(
            {
                "id": produto.id_produto,
                "descricao": produto.descricao_produto,
                "id_classe": produto.id_classe,
                "id_vendedor": produto.id_vendedor,
            }
        )
    return jsonify({"message": "Produto não encontrado"}), 404


# ✅ Adicionar um novo produto
@app.route("/produtos", methods=["POST"])
def add_produto():
    data = request.json

    vendedor = Vendedor.query.filter_by(cpf_vendedor=data["cpf_vendedor"]).first()
    if not vendedor:
        vendedor = Vendedor(
            nome_vendedor=data["nome_vendedor"],
            cpf_vendedor=data["cpf_vendedor"],
            cidade_vendedor=data["cidade_vendedor"],
        )
        db.session.add(vendedor)
        db.session.commit()

    produto = Produto(
        descricao_produto=data["descricao_produto"],
        id_classe=data["id_classe"],
        id_vendedor=vendedor.id_vendedor,
    )
    db.session.add(produto)
    db.session.commit()
    return jsonify({"message": "Produto adicionado com sucesso!"})


# ✅ Remover um produto pelo ID
@app.route("/produtos/<int:id>", methods=["DELETE"])
def delete_produto(id):
    produto = Produto.query.get(id)
    if produto:
        db.session.delete(produto)
        db.session.commit()
        return jsonify({"message": "Produto removido com sucesso!"})
    return jsonify({"message": "Produto não encontrado"}), 404


# ✅ Atualizar um produto pelo ID
@app.route("/produtos/<int:id>", methods=["PUT"])
def update_produto(id):
    data = request.json
    produto = Produto.query.get(id)

    if produto:
        produto.descricao_produto = data.get(
            "descricao_produto", produto.descricao_produto
        )
        produto.id_classe = data.get("id_classe", produto.id_classe)
        db.session.commit()
        return jsonify({"message": "Produto atualizado com sucesso!"})

    return jsonify({"message": "Produto não encontrado"}), 404


# Iniciar a aplicação
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
