import React, { useState, useEffect } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk from "algosdk";

const peraWallet = new PeraWalletConnect();

const algodClient = new algosdk.Algodv2(
  "", 
  "https://testnet-api.algonode.cloud", 
  ""
);

function App() {
  const [accountAddress, setAccountAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [formData, setFormData] = useState({
    propertyTitle: "",
    location: "",
    description: "",
    price: "",
  });

  const [properties, setProperties] = useState([]);

  const handleConnectWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect();
      const address = newAccounts[0];
      setAccountAddress(address);
      setIsConnected(true);

      // Fetch and set balance
      const accountInfo = await algodClient.accountInformation(address).do();
      const algoBalance = accountInfo.amount / 1e6;
      setBalance(algoBalance);
    } catch (error) {
      console.error("Wallet connect error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListProperty = (e) => {
    e.preventDefault();
    setProperties((prev) => [...prev, formData]);
    setFormData({
      propertyTitle: "",
      location: "",
      description: "",
      price: "",
    });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Housing Property DApp</h1>
      {!isConnected ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p><strong>Connected:</strong> {accountAddress}</p>
          <p><strong>Balance:</strong> {balance !== null ? `${balance.toFixed(2)} ALGO` : "Loading..."}</p>

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

          <h2>Listed Properties</h2>
          {properties.map((property, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              <h3>{property.propertyTitle}</h3>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Description:</strong> {property.description}</p>
              <p><strong>Price:</strong> {property.price} ALGO</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
