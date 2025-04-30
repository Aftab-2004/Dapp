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
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    propertyTitle: "",
    location: "",
    description: "",
    price: "",
  });

  // Force wallet disconnect on load
  useEffect(() => {
    peraWallet.disconnect();
  }, []);

  // Connect and fetch balance + properties after account connects
  useEffect(() => {
    if (accountAddress) {
      getBalance(accountAddress);

      const saved = localStorage.getItem("listedProperties");
      if (saved) {
        setProperties(JSON.parse(saved));
      }
    }
  }, [accountAddress]);

  const handleConnectWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect();
      setAccountAddress(newAccounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const getBalance = async (address) => {
    try {
      const accountInfo = await algodClient.accountInformation(address).do();
      setBalance(accountInfo.amount / 1e6); // in ALGO
    } catch (err) {
      console.error("Failed to fetch balance", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListProperty = (e) => {
    e.preventDefault();
    const newProperty = { ...formData };
    const updated = [...properties, newProperty];
    setProperties(updated);
    localStorage.setItem("listedProperties", JSON.stringify(updated));
    setFormData({ propertyTitle: "", location: "", description: "", price: "" });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Housing Property DApp</h1>

      {!isConnected ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p><strong>Connected:</strong><br />{accountAddress}</p>
          <p><strong>Balance:</strong> {balance !== null ? `${balance} ALGO` : "Loading..."}</p>

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
          {properties.length === 0 ? (
            <p>No properties listed yet.</p>
          ) : (
            properties.map((prop, idx) => (
              <div key={idx} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                <h3>{prop.propertyTitle}</h3>
                <p><strong>Location:</strong> {prop.location}</p>
                <p><strong>Description:</strong> {prop.description}</p>
                <p><strong>Price:</strong> {prop.price} ALGO</p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default App;
