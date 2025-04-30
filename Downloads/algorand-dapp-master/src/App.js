import React from "react";
import SendAlgo from "./components/wallet/SendAlgo";

function App() {
  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Welcome to the Algorand DApp</h1>
      <p>This DApp connects to the Algorand TestNet using AlgoSigner.</p>

      {/* Render the Send ALGO form */}
      <SendAlgo />
    </div>
  );
}

export default App;
