import pickle
from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
import joblib
import numpy as np
import sys


flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Titanic Survivor Prediction", 
		  description = "Predict the survivors of Titanic ship Tragedy")


name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'Ticket Class': fields.Float(required = True, 
				  							   description="Which of the 3 Classes does the ticket belong to?", 
    					  				 	   help="Ticket Class cannot be blank"),
				  'Sex': fields.Float(required = True, 
				  							   description="The Sex of the passenger", 
    					  				 	   help="Passenger Sex cannot be blank"),
				  'Age': fields.Float(required = True, 
				  							description="Passenger Age", 
    					  				 	help="Age cannot be blank"),
				  'Sib/Sp': fields.Float(required = True, 
				  							description="Number of Siblings or Spouses aboard the Titanic", 
    					  				 	help="Sib/Sp cannot be blank"),
				  'Par/ch': fields.Float(required = True, 
				  							description="Number of Parents or Children aboard the Titanic", 
    					  				 	help="Par/Ch cannot be blank")})

# model = keras.models.load_model("my_model")
classifier = pickle.load(open('trained_model.pkl', 'rb'))

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifier.predict(np.array(data).reshape(1, -1))
			types = { 0: "unfortunately could not survive the tragedy.", 1: "Survived!!"}
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "The Passenger " + types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})
