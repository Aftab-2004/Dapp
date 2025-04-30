import React, { useState } from "react";

const SendAlgo = () => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    try {
      if (!window.AlgoSigner) throw new Error("AlgoSigner not detected");

      await AlgoSigner.connect();

      const accounts = await AlgoSigner.accounts({ ledger: "TestNet" });
      const sender = accounts[0].address;

      const txParams = {
        from: sender,
        to: receiver,
        amount: +amount * 1e6, // convert ALGO to microAlgos
        fee: 1000,
        type: "pay",
        firstRound: 1000,
        lastRound: 2000,
        genesisID: "testnet-v1.0",
        genesisHash: "SGO1GKS1GNRBHSVLN5RNBSS2JMXMQ2COHCPQW5KFOXYIZN5P5Z4A",
        note: new Uint8Array(Buffer.from("Test ALGO Send")),
      };

      const txn = await AlgoSigner.sign({
        txn: btoa(JSON.stringify(txParams)),
      });

      const response = await AlgoSigner.send({
        ledger: "TestNet",
        tx: txn.blob,
      });

      setStatus(`✅ Transaction sent! ID: ${response.txId}`);
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Send ALGO</h3>
      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
      />
      <br />
      <input
        type="number"
        placeholder="Amount (ALGO)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleSend} style={{ padding: "8px 16px" }}>
        Send
      </button>
      <p>{status}</p>
    </div>
  );
};

export default SendAlgo;
