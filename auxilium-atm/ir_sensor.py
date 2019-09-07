import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setup(3, GPIO.IN, pull_up_down=GPIO.PUD_UP)

sensor_state = 0
last_state = 0

try:
    while True:
        sensor_state = GPIO.input(3)

        if sensor_state and not last_state:
            print('connected')

        if not sensor_state and last_state:
            print('broken')

        last_state = sensor_state

finally:
    GPIO.cleanup()
