const StellarSdk = require("stellar-sdk");
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
const validate = require("jsonschema").validate;

const publicKey = "GAI6C5X6QK5KE3OXXIQAUZ33WCMCENCJ5VDYRKNZCR6LCYRM5PSQGFOG";
const secretString = "SALEHVAPOGW677KLEDFNQZ3WA7JSQCN2UJ37CUXHZOXIKHPEOOV264L7";

// let transactionExample = {
//   u: "41614",
//   a: -1234
// };

exports.submitTransaction = async payload => {
  try {
    const account = await server.loadAccount(publicKey);
    const fee = await server.fetchBaseFee();
    const memo = new StellarSdk.Memo.text(JSON.stringify(payload));

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      memo
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: publicKey,
          asset: StellarSdk.Asset.native(),
          amount: "0.0000001"
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(StellarSdk.Keypair.fromSecret(secretString));

    const transactionResult = await server.submitTransaction(transaction);

    console.log(transactionResult);
  } catch (err) {
    console.error(err);
  }
};

exports.getTransactions = async () => {
  let history = [];

  r = await server
    .transactions()
    .limit(1)
    .forAccount(publicKey)
    .call();
  while (r.records.length != 0) {
    let record = r.records[0];

    if (
      record.hasOwnProperty("memo") &&
      validate(record, { type: "object" }).errors.length == 0
    ) {
      let parsedRecord = JSON.parse(record.memo);
      parsedRecord.r = record._links.self.href;
      history.push(parsedRecord);
    }

    r = await r.next();
  }
  return history;
};
