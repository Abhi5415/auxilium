import RPi.GPIO as GPIO
import time
import sys

servoPIN = 22
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)

p = GPIO.PWM(servoPIN, 50)
p.start(12.5)

rotations = 0

if len(sys.argv) > 1:
  rotations = int(sys.argv[1])

try:
  print("pending")
  for i in range(rotations):
    p.ChangeDutyCycle(9.6)
    time.sleep(0.5)
    p.ChangeDutyCycle(12.5)
    time.sleep(0.5)
  print("done")
  p.stop()
  GPIO.cleanup()

except KeyboardInterrupt:
  p.stop()
  GPIO.cleanup()