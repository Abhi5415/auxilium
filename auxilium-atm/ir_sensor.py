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

try:
    f = open("deposit.txt", "w+")
    f.write("pending")
    f.close()

    while True:
        sensor_state = GPIO.input(irPIN)

        if sensor_state and not last_state:
            secsInactive = 0
            print('connected')

        if not sensor_state and last_state:
            coinsDeposited += 1
            secsInactive = 0
            print('broken')

        if not sensor_state and not last_state:
            time.sleep(1)
            secsInactive += 1
            if secsInactive is SECS_TO_WAIT:
                 break

        last_state = sensor_state

    f = open("deposit.txt","w+")
    f.write(str(coinsDeposited))

finally:
    GPIO.cleanup()
