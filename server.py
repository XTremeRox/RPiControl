#! /usr/bin/python3
# Author: Ramswaroop Soren(xtremerox)
# GitHub : github.com/xtremerox
# Simple flask app to serve Webapp to control GPIO
# and take feedback from RPi
from flask import Flask, request , jsonify, render_template
import RPi.GPIO as GPIO
import time
#Production server settings 
#from gevent.pywsgi import WSGIServer
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(16,GPIO.OUT)
app = Flask(__name__, template_folder = 'html_code')
#Password
secretpasskey = '1234'
app.debug = True
@app.route('/')
@app.route('/home')
def home():
	return render_template('index.html')
@app.route('/live', methods=['POST'])
def live():
	#print('Is JSON? : ', request.is_json)
	content = request.get_json(silent=True)
	#print(request)
	if content['secret'] != secretpasskey:
		return jsonify({'status':'dead'})
	data = {'status':'alive'}
	response = jsonify(data)
	#response.headers.add('Access-Control-Allow-Origin', '*')
	return response
@app.route('/switch/<name>')
def switch(name):
	print("passed : ",name)
	if name=="on":
		print("LED on")
		GPIO.output(16,GPIO.HIGH)
	else:
		print("LED off")
		GPIO.output(16,GPIO.LOW)
	return "hello,"+name;
if __name__ =="__main__":
	#http_server = WSGIServer(('0.0.0.0', 5000), app)
	print("Server Started waiting for request")
	#http_server.serve_forever()
	app.run('0.0.0.0',debug = True)
