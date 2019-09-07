const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/atm/deposit', (req, res) => {
	setTimeout(() => {
		shell.exec('python ir_sensor.py');
	}, 5000);

	while (true) {
		fs.readFile('./deposit.txt', 'utf8', (err, contents) => {
			console.log(contents);
			if (contents != 'pending') {
				console.log('complete');
                res.status(200).send(contents);
                break;
			}
        });
        setTimeout(() => {}, 5000);
	}
});

app.post('/api/atm/withdraw', (req, res) => {
	shell.exec(`python ir_sensor.py ${req.body.amount}`);
    res.status(202).send();
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));