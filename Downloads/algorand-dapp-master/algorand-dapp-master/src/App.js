import React, { useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk from "algosdk";

const peraWallet = new PeraWalletConnect();

function App() {
  const [accountAddress, setAccountAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [formData, setFormData] = useState({
    propertyTitle: "",
    location: "",
    description: "",
    price: "",
  });

  const handleConnectWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect();
      setAccountAddress(newAccounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListProperty = async (e) => {
    e.preventDefault();
    console.log("Submitting listing:", formData);

    // Optional: send transaction logic or smart contract interaction here
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Housing Property DApp</h1>
      {!isConnected ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p><strong>Connected:</strong> {accountAddress}</p>
          <form onSubmit={handleListProperty}>
            <input
              name="propertyTitle"
              placeholder="Property Title"
              value={formData.propertyTitle}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              name="price"
              placeholder="Price (ALGO)"
              value={formData.price}
              onChange={handleChange}
              required
              type="number"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button type="submit">List Property</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
