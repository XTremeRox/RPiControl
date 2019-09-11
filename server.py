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
GPIO.setup(11,GPIO.OUT)
GPIO.setup(10,GPIO.OUT)
GPIO.setup(4,GPIO.OUT)
GPIO.setup(9,GPIO.OUT)
GPIO.setup(27,GPIO.OUT)
GPIO.setup(22,GPIO.OUT)
GPIO.setup(17,GPIO.OUT)
app = Flask(__name__, template_folder = 'html_code')
#Password
secretpasskey = '1234'
app.debug = True
#check for valid int
def ValidInt(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False

@app.route('/')
@app.route('/home')
def home():
	return render_template('index.html')
@app.route('/live', methods=['POST'])
def live():
	content = request.get_json(silent=True)
	if content['secret'] != secretpasskey:
		return jsonify({'status':'dead'})
	data = {'status':'alive'}
	response = jsonify(data)
	#response.headers.add('Access-Control-Allow-Origin', '*')
	return response
@app.route('/status', methods=['GET'])
def status():
	#Get state of all pins(11,10,4,9,27,22,17)
	response = {}
	pins = [11,10,4,9,27,22,17,16]
	for pin in pins:
		response[pin] = 'on' if GPIO.input(pin) == 1 else 'off'
	return jsonify(response)
@app.route('/reading', methods=['GET'])
def reading():
	#TODO - Get analog reading value from 
	return jsonify({'reading':'22.5'})
@app.route('/toggle', methods=['POST'])
def toggle():
	#change pin state and authentication using POST
	content = request.get_json(silent=True)
	if content['secret'] != secretpasskey:
		return jsonify({'error':'Not a valid Request'})
	pin = content['pin']
	allowedpins = [11,10,4,9,27,22,17,16]
	if ValidInt(int(pin)):
		pin = int(pin)
		if pin not in allowedpins:
			return jsonify({'error':'not a valid pin'})
		GPIO.output(pin, GPIO.HIGH) if GPIO.input(pin) == 0 else GPIO.output(pin, GPIO.HIGH)
	else:
		return jsonify({'error':'not a valid pin'})
	data = {'success':'1'}
	response = jsonify(data)
	#response.headers.add('Access-Control-Allow-Origin', '*')
	return response
if __name__ =="__main__":
	#http_server = WSGIServer(('0.0.0.0', 5000), app)
	print("Server Started waiting for request")
	#http_server.serve_forever()
	app.run('0.0.0.0',debug = True)
