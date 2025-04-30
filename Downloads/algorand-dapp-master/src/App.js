import React, { useState } from 'react';
import { connectWallet, sendAlgo } from './wallets/PeraWalletConnect';
import PropertyList from './components/property/PropertyList';

function App() {
  const [account, setAccount] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');

  const handleConnect = async () => {
    const addr = await connectWallet();
    if (addr) {
      setAccount(addr);
      setStatus('Wallet connected');
    } else {
      setStatus('Connection failed');
    }
  };

  const handleSend = async () => {
    if (!account || !recipient || !amount) {
      setStatus('Missing required fields');
      return;
    }

    setStatus('Sending transaction...');
    const result = await sendAlgo(account, recipient, parseFloat(amount), note);
    if (result && result.txId) {
      setStatus(`Transaction sent! ID: ${result.txId}`);
    } else {
      setStatus('Transaction failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'Arial' }}>
      <h1>Housing Property DApp</h1>

      {!account ? (
        <button onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <>
          <p>✅ Connected: {account}</p>

          <div style={{ margin: '2rem 0' }}>
            <h3>Send ALGO</h3>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            /><br /><br />
            <input
              type="number"
              placeholder="Amount (Algos)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            /><br /><br />
            <input
              type="text"
              placeholder="Note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            /><br /><br />
            <button onClick={handleSend}>Send Algo</button>
            <p>{status}</p>
          </div>

          {/* Property Listing Section */}
          <PropertyList account={account} />
        </>
      )}
    </div>
  );
}

export default App;
