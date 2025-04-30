import { PeraWalletConnect } from '@perawallet/connect';
import algosdk from 'algosdk';

const peraWallet = new PeraWalletConnect();

export const connectWallet = async () => {
  try {
    const accounts = await peraWallet.connect();
    return accounts[0]; // return the connected account
  } catch (err) {
    console.error("Failed to connect to wallet:", err);
    return null;
  }
};

export const sendAlgo = async (from, to, amount, note) => {
  try {
    const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
    const params = await algod.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from,
      to,
      amount: algosdk.algosToMicroalgos(amount),
      note: new TextEncoder().encode(note),
      suggestedParams: params
    });

    const signedTxn = await peraWallet.signTransaction([{
      txn,
      signers: [from]
    }]);

    const tx = await algod.sendRawTransaction(signedTxn).do();
    return tx;
  } catch (err) {
    console.error("Failed to send Algo:", err);
    return null;
  }
};
