import React, { useState } from "react";
import image from "../assets/product.webp";
import { useEffect } from "react";
import axios from "axios";


export default function Orders({ shopId, shopName }) {
  const [skus, setSkus] = useState([]);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const [buyer, setBuyer] = useState("");
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleSell = async(qty,productId) => {
    try {
      const curSku = skus.find((sku) => sku._id === selectedSKU._id);
      
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        productId:productId,
        quantity: curSku.quantity - parseInt(qty),
      });

      if (response.data.success) {
        console.log("Order placed successfully:", response.data);
      } else {
        console.error("Failed to place order:", response.data.message);
      }


    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
      return;

    } finally {
      setShowToast(true);
      setSelectedSKU(null);
      setBuyer("");
      setQty(1);
      setTimeout(() => setShowToast(false), 3000);
    }


  };


  useEffect(() => {
    const fetchSkus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${shopId}`);
        // console.log(response.data);

        if (response.data.success) {
          setSkus([...response.data.products]);
        } else {
          console.error("Failed to fetch SKUs:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching SKUs:", error);
      }
    };
    fetchSkus();
  }, [shopId,buyer]);


  return (
    <div className="min-h-screen p-6 md:px-10">
      <h2 className="text-3xl font-bold text-black mb-8">{shopName ? shopName : " StarCoffee Cafe'"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skus.map((sku) => (
          <div
            key={sku._id}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col ${sku.quantity === 0 ? "opacity-50 pointer-events-none" : ""
              }`}
          >
            <img
              src={sku.image || image}
              alt={sku.name}
              className="w-full h-100 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-black">{sku.name}</h3>
                <p className="text-sm text-gray-600">₹{sku.sold}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {sku.quantity} in stock
                </p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-black transition"
                onClick={() => setSelectedSKU(sku)}
                disabled={sku.quantity === 0}
              >
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Minimal Modal */}
      {selectedSKU && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl shadow-xl w-[90vw] max-w-md p-6">
            <h4 className="font-bold text-xl text-black mb-4">
              Order Name: {selectedSKU.name}
            </h4>
            <input
              type="text"
              placeholder="Buyer name"
              className="bg-gray-100 p-2 w-full mb-3 shadow-sm rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="bg-gray-100 p-2 w-full mb-4 shadow-sm rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
              value={qty}
              min={1}
              max={selectedSKU.quantity}
              onChange={(e) => setQty(e.target.value)}
            />
            <div className="flex justify-center gap-2">
              <button
                className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
                onClick={() => setSelectedSKU(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-teal-500 text-white hover:bg-teal-400"
                onClick={()=>handleSell(qty,selectedSKU._id)}
                disabled={
                  qty < 1 || qty > selectedSKU.quantity || buyer.trim() === ""
                }
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-teal-600 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          ✅ Sale recorded!
        </div>
      )}
    </div>
  );
}
