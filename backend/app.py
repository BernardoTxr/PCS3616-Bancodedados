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
class Comissao(db.Model):
    id_comissao = db.Column(db.Integer, primary_key=True)
    nome_comissao = db.Column(db.String(100), nullable=False)
    cpf_comissao = db.Column(db.String(11), unique=True, nullable=False)
    cargo_comissao = db.Column(db.String(100), nullable=False)
    id_modalidade = db.Column(
        db.Integer, db.ForeignKey("modalidade.id_modalidade"), nullable=False
    )


class Atleta(db.Model):
    id_atleta = db.Column(db.Integer, primary_key=True)
    nome_atleta = db.Column(db.String(100), nullable=False)
    cpf_atleta = db.Column(db.String(11), unique=True, nullable=False)
    curso_atleta = db.Column(db.String(100), nullable=False)
    nusp_atleta = db.Column(db.Integer, unique=True, nullable=False)


class Modalidade(db.Model):
    id_modalidade = db.Column(db.Integer, primary_key=True)
    nome_modalidade = db.Column(db.String(100), nullable=False)
    saldo_modalidade = db.Column(db.Float, nullable=False)


class Modalidade_Atleta(db.Model):
    id_modalidade_atleta = db.Column(db.Integer, primary_key=True)
    id_modalidade = db.Column(
        db.Integer, db.ForeignKey("modalidade.id_modalidade"), nullable=False
    )
    id_atleta = db.Column(db.Integer, db.ForeignKey("atleta.id_atleta"), nullable=False)


class Campeonato(db.Model):
    id_campeonato = db.Column(db.Integer, primary_key=True)
    nome_campeonato = db.Column(db.String(100), nullable=False)
    data_inicio = db.Column(db.DateTime, nullable=False)
    data_fim = db.Column(db.DateTime, nullable=False)
    custo_por_pessoa = db.Column(db.Float, nullable=False)


class Modalidade_Campeonato(db.Model):
    id_modalidade_campeonato = db.Column(db.Integer, primary_key=True)
    id_campeonato = db.Column(
        db.Integer, db.ForeignKey("campeonato.id_campeonato"), nullable=False
    )
    id_modalidade = db.Column(
        db.Integer, db.ForeignKey("modalidade.id_modalidade"), nullable=False
    )


# Criando as tabelas no contexto da aplicação
with app.app_context():
    db.create_all()


# ---------------- ROTAS ----------------


# crud para atleta
@app.route("/atleta", methods=["POST"])
def create_atleta():
    data = request.json
    atleta = Atleta(
        nome_atleta=data["nome_atleta"],
        cpf_atleta=data["cpf_atleta"],
        curso_atleta=data["curso_atleta"],
        nusp_atleta=data["nusp_atleta"],
    )
    db.session.add(atleta)
    db.session.commit()
    return jsonify({"message": "Atleta criado com sucesso!"})


@app.route("/atleta", methods=["GET"])
def read_atleta():
    atletas = Atleta.query.all()
    atletas = [
        {"id_atleta": atleta.id_atleta, "nome_atleta": atleta.nome_atleta}
        for atleta in atletas
    ]
    return jsonify(atletas)


@app.route("/atleta/<int:id_atleta>", methods=["GET"])
def read_atleta_id(id_atleta):
    atleta = Atleta.query.get(id_atleta)
    return jsonify({"id_atleta": atleta.id_atleta, "nome_atleta": atleta.nome_atleta})


@app.route("/atleta/<int:id_atleta>", methods=["PUT"])
def update_atleta(id_atleta):
    data = request.json
    atleta = Atleta.query.get(id_atleta)
    atleta.nome_atleta = data["nome_atleta"]
    atleta.cpf_atleta = data["cpf_atleta"]
    atleta.curso_atleta = data["curso_atleta"]
    atleta.nusp_atleta = data["nusp_atleta"]
    db.session.commit()
    return jsonify({"message": "Atleta atualizado com sucesso!"})


@app.route("/atleta/<int:id_atleta>", methods=["DELETE"])
def delete_atleta(id_atleta):
    atleta = Atleta.query.get(id_atleta)
    db.session.delete(atleta)
    db.session.commit()
    return jsonify({"message": "Atleta deletado com sucesso!"})


# crud para comissao
@app.route("/comissao", methods=["POST"])
def create_comissao():
    data = request.json
    comissao = Comissao(
        nome_comissao=data["nome_comissao"],
        cpf_comissao=data["cpf_comissao"],
        cargo_comissao=data["cargo_comissao"],
        id_modalidade=data["id_modalidade"],
    )
    db.session.add(comissao)
    db.session.commit()
    return jsonify({"message": "Comissão criada com sucesso!"})


@app.route("/comissao", methods=["GET"])
def read_comissao():
    comissoes = Comissao.query.all()
    comissoes = [
        {"id_comissao": comissao.id_comissao, "nome_comissao": comissao.nome_comissao}
        for comissao in comissoes
    ]
    return jsonify(comissoes)


@app.route("/comissao/<int:id_comissao>", methods=["GET"])
def read_comissao_id(id_comissao):
    comissao = Comissao.query.get(id_comissao)
    return jsonify(
        {"id_comissao": comissao.id_comissao, "nome_comissao": comissao.nome_comissao}
    )


@app.route("/comissao/<int:id_comissao>", methods=["PUT"])
def update_comissao(id_comissao):
    data = request.json
    comissao = Comissao.query.get(id_comissao)
    comissao.nome_comissao = data["nome_comissao"]
    comissao.cpf_comissao = data["cpf_comissao"]
    comissao.cargo_comissao = data["cargo_comissao"]
    comissao.id_modalidade = data["id_modalidade"]
    db.session.commit()
    return jsonify({"message": "Comissão atualizada com sucesso!"})


@app.route("/comissao/<int:id_comissao>", methods=["DELETE"])
def delete_comissao(id_comissao):
    comissao = Comissao.query.get(id_comissao)
    db.session.delete(comissao)
    db.session.commit()
    return jsonify({"message": "Comissão deletada com sucesso!"})


# crud para modalidade
@app.route("/modalidade", methods=["POST"])
def create_modalidade():
    data = request.json
    modalidade = Modalidade(
        nome_modalidade=data["nome_modalidade"],
        saldo_modalidade=data["saldo_modalidade"],
    )
    db.session.add(modalidade)
    db.session.commit()
    return jsonify({"message": "Modalidade criada com sucesso!"})


@app.route("/modalidade", methods=["GET"])
def read_modalidade():
    modalidades = Modalidade.query.all()
    modalidades = [
        {
            "id_modalidade": modalidade.id_modalidade,
            "nome_modalidade": modalidade.nome_modalidade,
        }
        for modalidade in modalidades
    ]
    return jsonify(modalidades)


@app.route("/modalidade/<int:id_modalidade>", methods=["GET"])
def read_modalidade_id(id_modalidade):
    modalidade = Modalidade.query.get(id_modalidade)
    return jsonify(
        {
            "id_modalidade": modalidade.id_modalidade,
            "nome_modalidade": modalidade.nome_modalidade,
        }
    )


@app.route("/modalidade/<int:id_modalidade>", methods=["PUT"])
def update_modalidade(id_modalidade):
    data = request.json
    modalidade = Modalidade.query.get(id_modalidade)
    modalidade.nome_modalidade = data["nome_modalidade"]
    modalidade.saldo_modalidade = data["saldo_modalidade"]
    db.session.commit()
    return jsonify({"message": "Modalidade atualizada com sucesso!"})


@app.route("/modalidade/<int:id_modalidade>", methods=["DELETE"])
def delete_modalidade(id_modalidade):
    modalidade = Modalidade.query.get(id_modalidade)
    db.session.delete(modalidade)
    db.session.commit()
    return jsonify({"message": "Modalidade deletada com sucesso!"})


# crud para modalidade_atleta
@app.route("/modalidade_atleta", methods=["POST"])
def create_modalidade_atleta():
    data = request.json
    modalidade_atleta = Modalidade_Atleta(
        id_modalidade=data["id_modalidade"],
        id_atleta=data["id_atleta"],
    )
    db.session.add(modalidade_atleta)
    db.session.commit()
    return jsonify({"message": "Modalidade do atleta criada com sucesso!"})


@app.route("/modalidade_atleta", methods=["GET"])
def read_modalidade_atleta():
    modalidades_atletas = Modalidade_Atleta.query.all()
    modalidades_atletas = [
        {
            "id_modalidade_atleta": modalidade_atleta.id_modalidade_atleta,
            "id_modalidade": modalidade_atleta.id_modalidade,
        }
        for modalidade_atleta in modalidades_atletas
    ]
    return jsonify(modalidades_atletas)


@app.route("/modalidade_atleta/<int:id_modalidade_atleta>", methods=["GET"])
def read_modalidade_atleta_id(id_modalidade_atleta):
    modalidade_atleta = Modalidade_Atleta.query.get(id_modalidade_atleta)
    return jsonify(
        {
            "id_modalidade_atleta": modalidade_atleta.id_modalidade_atleta,
            "id_modalidade": modalidade_atleta.id_modalidade,
        }
    )


@app.route("/modalidade_atleta/<int:id_modalidade_atleta>", methods=["PUT"])
def update_modalidade_atleta(id_modalidade_atleta):
    data = request.json
    modalidade_atleta = Modalidade_Atleta.query.get(id_modalidade_atleta)
    modalidade_atleta.id_modalidade = data["id_modalidade"]
    modalidade_atleta.id_atleta = data["id_atleta"]
    db.session.commit()
    return jsonify({"message": "Modalidade do atleta atualizada com sucesso!"})


@app.route("/modalidade_atleta/<int:id_modalidade_atleta>", methods=["DELETE"])
def delete_modalidade_atleta(id_modalidade_atleta):
    modalidade_atleta = Modalidade_Atleta.query.get(id_modalidade_atleta)
    db.session.delete(modalidade_atleta)
    db.session.commit()
    return jsonify({"message": "Modalidade do atleta deletada com sucesso!"})


# crud para campeonato
@app.route("/campeonato", methods=["POST"])
def create_campeonato():
    data = request.json
    campeonato = Campeonato(
        nome_campeonato=data["nome_campeonato"],
        data_inicio=data["data_inicio"],
        data_fim=data["data_fim"],
        custo_por_pessoa=data["custo_por_pessoa"],
    )
    db.session.add(campeonato)
    db.session.commit()
    return jsonify({"message": "Campeonato criado com sucesso!"})


@app.route("/campeonato", methods=["GET"])
def read_campeonato():
    campeonatos = Campeonato.query.all()
    campeonatos = [
        {
            "id_campeonato": campeonato.id_campeonato,
            "nome_campeonato": campeonato.nome_campeonato,
        }
        for campeonato in campeonatos
    ]
    return jsonify(campeonatos)


@app.route("/campeonato/<int:id_campeonato>", methods=["GET"])
def read_campeonato_id(id_campeonato):
    campeonato = Campeonato.query.get(id_campeonato)
    return jsonify(
        {
            "id_campeonato": campeonato.id_campeonato,
            "nome_campeonato": campeonato.nome_campeonato,
        }
    )


@app.route("/campeonato/<int:id_campeonato>", methods=["PUT"])
def update_campeonato(id_campeonato):
    data = request.json
    campeonato = Campeonato.query.get(id_campeonato)
    campeonato.nome_campeonato = data["nome_campeonato"]
    campeonato.data_inicio = data["data_inicio"]
    campeonato.data_fim = data["data_fim"]
    campeonato.custo_por_pessoa = data["custo_por_pessoa"]
    db.session.commit()
    return jsonify({"message": "Campeonato atualizado com sucesso!"})


@app.route("/campeonato/<int:id_campeonato>", methods=["DELETE"])
def delete_campeonato(id_campeonato):
    campeonato = Campeonato.query.get(id_campeonato)
    db.session.delete(campeonato)
    db.session.commit()
    return jsonify({"message": "Campeonato deletado com sucesso!"})


# crud para modalidade_campeonato
@app.route("/modalidade_campeonato", methods=["POST"])
def create_modalidade_campeonato():
    data = request.json
    modalidade_campeonato = Modalidade_Campeonato(
        id_campeonato=data["id_campeonato"],
        id_modalidade=data["id_modalidade"],
    )
    db.session.add(modalidade_campeonato)
    db.session.commit()
    return jsonify({"message": "Modalidade do campeonato criada com sucesso!"})


@app.route("/modalidade_campeonato", methods=["GET"])
def read_modalidade_campeonato():
    modalidades_campeonatos = Modalidade_Campeonato.query.all()
    modalidades_campeonatos = [
        {
            "id_modalidade_campeonato": modalidade_campeonato.id_modalidade_campeonato,
            "id_campeonato": modalidade_campeonato.id_campeonato,
        }
        for modalidade_campeonato in modalidades_campeonatos
    ]
    return jsonify(modalidades_campeonatos)


@app.route("/modalidade_campeonato/<int:id_modalidade_campeonato>", methods=["GET"])
def read_modalidade_campeonato_id(id_modalidade_campeonato):
    modalidade_campeonato = Modalidade_Campeonato.query.get(id_modalidade_campeonato)
    return jsonify(
        {
            "id_modalidade_campeonato": modalidade_campeonato.id_modalidade_campeonato,
            "id_campeonato": modalidade_campeonato.id_campeonato,
        }
    )


@app.route("/modalidade_campeonato/<int:id_modalidade_campeonato>", methods=["PUT"])
def update_modalidade_campeonato(id_modalidade_campeonato):
    data = request.json
    modalidade_campeonato = Modalidade_Campeonato.query.get(id_modalidade_campeonato)
    modalidade_campeonato.id_campeonato = data["id_campeonato"]
    modalidade_campeonato.id_modalidade = data["id_modalidade"]
    db.session.commit()
    return jsonify({"message": "Modalidade do campeonato atualizada com sucesso!"})


@app.route("/modalidade_campeonato/<int:id_modalidade_campeonato>", methods=["DELETE"])
def delete_modalidade_campeonato(id_modalidade_campeonato):
    modalidade_campeonato = Modalidade_Campeonato.query.get(id_modalidade_campeonato)
    db.session.delete(modalidade_campeonato)
    db.session.commit()
    return jsonify({"message": "Modalidade do campeonato deletada com sucesso!"})


# Iniciar a aplicação
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
