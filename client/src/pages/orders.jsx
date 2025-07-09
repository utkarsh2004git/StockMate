import React, { useState } from "react";

const initialSKUs = [
  {
    id: 1,
    name: "Espresso",
    cost: 120,
    stock: 50,
    image: "./assets/black-cofee.jpg",
  },
  {
    id: 2,
    name: "Cappuccino",
    cost: 150,
    stock: 25,
      image: "./assets/black-cofee.jpg",
  },
  {
    id: 3,
    name: "Latte",
    cost: 140,
    stock: 0,
      image: "./assets/black-cofee.jpg",
  },
  {
    id: 4,
    name: "Americano",
    cost: 110,
    stock: 8,
      image: "./assets/black-cofee.jpg",
  },
  {
    id: 5,
    name: "Mocha",
    cost: 160,
    stock: 18,
      image: "./assets/black-cofee.jpg",
  },
  {
    id: 6,
    name: "Macchiato",
    cost: 130,
    stock: 35,
      image: "./assets/black-cofee.jpg",
  },
];

export default function Orders() {
  const [skus, setSkus] = useState(initialSKUs);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const [buyer, setBuyer] = useState("");
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleSell = () => {
    const updatedSkus = skus.map((sku) =>
      sku.id === selectedSKU.id
        ? { ...sku, stock: sku.stock - parseInt(qty) }
        : sku
    );
    setSkus(updatedSkus);
    setShowToast(true);

    setSelectedSKU(null);
    setBuyer("");
    setQty(1);

    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen p-6 md:px-10">
      <h2 className="text-3xl font-bold text-black mb-8">StarCoffee Cafe'</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skus.map((sku) => (
          <div
            key={sku.id}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col ${sku.stock === 0 ? "opacity-50 pointer-events-none" : ""
              }`}
          >
            <img
              src={sku.image}
              alt={sku.name}
              className="w-full h-100 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-black">{sku.name}</h3>
                <p className="text-sm text-gray-600">₹{sku.cost}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {sku.stock} in stock
                </p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-black transition"
                onClick={() => setSelectedSKU(sku)}
                disabled={sku.stock === 0}
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
              max={selectedSKU.stock}
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
                onClick={handleSell}
                disabled={
                  qty < 1 || qty > selectedSKU.stock || buyer.trim() === ""
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
