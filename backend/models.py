from database import db


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
