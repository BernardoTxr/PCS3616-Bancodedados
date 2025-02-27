from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
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
with app.app_context():  # Garantindo que o contexto da aplicação está ativo
    db.create_all()


@app.route("/produtos", methods=["GET"])
def get_produtos():
    produtos = Produto.query.all()
    return jsonify(
        [{"id": p.id_produto, "descricao": p.descricao_produto} for p in produtos]
    )


@app.route("/produtos", methods=["POST"])
def add_produto():
    data = request.json
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
