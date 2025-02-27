from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, Produto, Vendedor, Classe
import os

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
db.init_app(app)


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
