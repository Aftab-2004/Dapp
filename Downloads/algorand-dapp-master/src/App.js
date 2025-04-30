import React from "react";
import SendAlgo from "./components/wallet/SendAlgo";

function App() {
  // Connect wallet using AlgoSigner
  const connectWallet = async () => {
    try {
      await AlgoSigner.connect();
      alert("✅ AlgoSigner wallet connected!");
    } catch (err) {
      alert("❌ Wallet connection failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Housing Property Dapp</h1>
      <p>Please connect your wallet to continue.</p>

      <button
        onClick={connectWallet}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: "#333",
          color: "#fff",
          border: "1px solid #ccc",
          marginBottom: "2rem",
        }}
      >
        Connect Wallet (AlgoSigner)
      </button>

      <SendAlgo />
    </div>
  );
}

export default App;
