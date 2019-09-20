#! /bin/sh
cd /
cd /home/pi/Desktop/RPiControl
source venv/bin/activate
python3 ip.py &
python3 server.py &
cd /
