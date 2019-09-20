#! /usr/bin/python3
# Author: Ramswaroop Soren(xtremerox)
# GitHub : github.com/xtremerox
# Simple flask app to serve Webapp to control GPIO
# and take feedback from RPi
from flask import Flask, request , jsonify, render_template
import RPi.GPIO as GPIO
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in as AnalogIn
#Production server settings 
#from gevent.pywsgi import WSGIServer
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(16,GPIO.OUT) #test_led
GPIO.setup(11,GPIO.OUT) #main_switch
GPIO.setup(10,GPIO.OUT) #volt_inc_mode
GPIO.setup(4,GPIO.OUT) #memory
GPIO.setup(9,GPIO.OUT) #ht_start
GPIO.setup(27,GPIO.OUT) #inc_volt
GPIO.setup(22,GPIO.OUT) #dec_volt
GPIO.setup(17,GPIO.OUT) #ht_stop
GPIO.setup(5,GPIO.OUT) #memory_relay
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
	#taking 30 reading for average
	i2c = busio.I2C(board.SCL, board.SDA)
	ads = ADS.ADS1115(i2c)
	channel = AnalogIn(ads, ADS.P3)
	sum = 0.00
	for i in range(0,30):
		sum+=channel.value
	avg = str('%.4f'%(sum/30))
	return jsonify({'reading':avg})
@app.route('/push', methods=['GET'])
def push():
	#Get pushrequest and activate for 30 reading and set state to 0 and return reading
	GPIO.output(5, GPIO.HIGH) #memory_relay high
	read = reading()
	GPIO.output(5, GPIO.LOW) #memory_relay high
	return read
@app.route('/toggle', methods=['POST'])
def toggle():
	#change pin state and authentication using POST
	content = request.get_json(silent=True)
	if content['secret'] != secretpasskey:
		return jsonify({'error':'Not a valid Request'})
	pin = content['pin']
	allowedpins = [11,10,4,9,27,22,17,16]
	if pin.isdigit():
		pin = int(pin)
		if pin not in allowedpins:
			return jsonify({'error':'not a valid pin'})
		GPIO.output(pin, GPIO.HIGH) if GPIO.input(pin) == 0 else GPIO.output(pin, GPIO.LOW)
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
