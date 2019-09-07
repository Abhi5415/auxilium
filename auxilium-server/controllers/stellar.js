const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const publicKey = 'GD4ILJJQNL6PYG5QXFL636CFD33BMSYJSGUXOP7LENIEVVZG5XQSOT7S';
const secretString = 'SCUWWXUL42STRDXE3ZBIC3C6K5FGLNLDMIJ2C6AQHSENU6G5W4BFUM4Z';

// Public Key: GD4ILJJQNL6PYG5QXFL636CFD33BMSYJSGUXOP7LENIEVVZG5XQSOT7S
// Secret Key: SCUWWXUL42STRDXE3ZBIC3C6K5FGLNLDMIJ2C6AQHSENU6G5W4BFUM4Z

// let transactionExample = {
// 	u: '41614',
// 	a: -1234,
// };

exports.submitTransaction = async payload => {
	try {
		const account = await server.loadAccount(publicKey);
		const fee = await server.fetchBaseFee();
		const memo = new StellarSdk.Memo.text(payload);
		console.log(memo);

		const transaction = new StellarSdk.TransactionBuilder(account, {
			fee,
			memo,
		})
			.addOperation(
				// this operation funds the new account with XLM
				StellarSdk.Operation.payment({
					destination: publicKey,
					asset: StellarSdk.Asset.native(),
					amount: '0.0000001',
				})
			)
			.setTimeout(30)
			.build();

		// console.log(transaction);

		transaction.sign(StellarSdk.Keypair.fromSecret(secretString));

		const transactionResult = await server.submitTransaction(transaction);
		console.log(transactionResult);
	} catch (err) {
		console.error(err);
	}
};

exports.getTransactions = async () => {
	server
		.transactions()
		.forAccount(publicKey)
		.call()
		.then(function(r) {
			console.log(r);
		});
};

// exports.getTransactions();
