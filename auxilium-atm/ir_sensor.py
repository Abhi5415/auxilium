import RPi.GPIO as GPIO
import time

irPIN = 3

GPIO.setmode(GPIO.BOARD)
GPIO.setup(irPIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

sensor_state = 0
last_state = 0

coinsDeposited = 0

timeStarted = time.time()
SECS_TO_WAIT = 5
secsInactive = 0
inactive = False

try:
    print("pending")
    while True:
        sensor_state = GPIO.input(irPIN)

        if sensor_state and not last_state:
            inactive = False
            # print('connected')

        elif not sensor_state and last_state:
            coinsDeposited += 1
            inactive = False
            # print('broken')

        if not inactive:
            timeStarted = time.time()

        if sensor_state and last_state:
            inactive = True
            if timeStarted + SECS_TO_WAIT < time.time() and inactive:
                break

        last_state = sensor_state

    print(coinsDeposited)    
finally:
    sys.stdout.flush()
    GPIO.cleanup()
