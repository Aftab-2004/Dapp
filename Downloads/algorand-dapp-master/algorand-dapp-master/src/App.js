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

  const [listings, setListings] = useState([]);

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

    setListings((prevListings) => [...prevListings, { ...formData }]);

    setFormData({
      propertyTitle: "",
      location: "",
      description: "",
      price: "",
    });
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

          {listings.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h2>Listed Properties</h2>
              {listings.map((listing, index) => (
                <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
                  <h3>{listing.propertyTitle}</h3>
                  <p><strong>Location:</strong> {listing.location}</p>
                  <p><strong>Description:</strong> {listing.description}</p>
                  <p><strong>Price:</strong> {listing.price} ALGO</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
