from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/cms'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

ma = Marshmallow(app)

class Custs(db.Model):
    __tablename__ = "custs"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    address = db.Column(db.Text(50))
    monumber = db.Column(db.Integer)
    metersrnumber = db.Column(db.Integer)

    def __init__(self, name, address, monumber, metersrnumber):
        self.name = name
        self.address = address
        self.monumber = monumber
        self.metersrnumber = metersrnumber

class CustSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'address', 'monumber', 'metersrnumber')

user_schema = CustSchema()
users_schema = CustSchema(many=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/listcusts', methods=['GET'])
def listcusts():
    all_custs = Custs.query.all()
    results = users_schema.dump(all_custs)
    return jsonify(results)

@app.route('/custdetails/<id>', methods=['GET'])
def custdetails(id):
    cust = Custs.query.get(id)
    return user_schema.jsonify(cust)

@app.route('/custupdate/<id>', methods=['PUT'])
def custupdate(id):
    cust = Custs.query.get(id)

    name = request.json['name']
    address = request.json['address']
    monumber = request.json['monumber']
    metersrnumber = request.json['metersrnumber']

    cust.name = name
    cust.address =address
    cust.monumber = monumber
    cust.metersrnumber =metersrnumber

    db.session.commit()
    return user_schema.jsonify(cust)


@app.route('/custdelete/<id>', methods=['DELETE'])
def custdelete(id):
    cust = Custs.query.get(id)
    db.session.delete(cust)
    db.session.commit()
    return user_schema.jsonify(cust)



@app.route('/customeradd', methods=['POST'])
def customeradd():
    name = request.json['name']
    address = request.json['address']
    monumber = request.json['monumber']
    metersrnumber = request.json['metersrnumber']

    cust = Custs(name, address, monumber, metersrnumber)
    db.session.add(cust)
    db.session.commit()

    return user_schema.jsonify(cust)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
