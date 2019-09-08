const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/atm/deposit', (req, res) => {
	shell.exec('python ir_sensor.py');

	while (true) {
		fs.readFile('./deposit.txt', 'utf8', (err, contents) => {
			console.log("reading file")
			if (contents != 'pending') {
				console.log('complete');
				res.status(200).send({
					count: parseInt(contents)
				});
				return;
			}
		});
		fs.close()
		setTimeout(() => { }, 5000);
	}
});

app.post('/api/atm/withdraw', (req, res) => {
	var rotations = req.body.amount;

	if (rotations > 0) {
		shell.exec(`python servo.py ${rotations}`);
		while (true) {
			fs.readFile('./withdraw.txt', 'utf8', (err, contents) => {
				console.log("reading file")
				if (contents != 'pending') {
					console.log('complete');
					res.status(202).send();
					return;
				}
			});
			fs.close();
			setTimeout(() => { }, 5000);
		}
	} else {
		res.status(400).send();
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));
