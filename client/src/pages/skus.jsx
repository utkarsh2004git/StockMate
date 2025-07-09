import React, { useState } from "react";
import { Plus, Edit3, Package } from "lucide-react";
import {
    PackageCheck,
    PackageX,
    IndianRupee,
    TrendingUp,
    TrendingDown
} from "lucide-react";

const initialSKUs = [
    { id: 1, name: "Espresso", qty: 100, cost: 100, price: 120 },
    { id: 2, name: "Cappuccino", qty: 50, cost: 110, price: 140 },
    { id: 3, name: "Latte", qty: 25, cost: 90, price: 130 },
    { id: 4, name: "Mocha", qty: 15, cost: 120, price: 160 },
    { id: 5, name: "Flat White", qty: 5, cost: 100, price: 125 },
    { id: 6, name: "Americano", qty: 60, cost: 80, price: 110 },
];


export default function SKUManager() {
    const [skus, setSkus] = useState(initialSKUs);
    const [activeTab, setActiveTab] = useState("stock");

    const [selectedId, setSelectedId] = useState(skus[0]?.id || null);
    const [stockToAdd, setStockToAdd] = useState(0);

    const [form, setForm] = useState({ name: "", qty: 0, cost: 0, price: 0 });

    const handleAddStock = () => {
        if (!selectedId || stockToAdd <= 0) return;

        const updated = skus.map((sku) =>
            sku.id === selectedId ? { ...sku, qty: sku.qty + Number(stockToAdd) } : sku
        );
        setSkus(updated);
        setStockToAdd(0);
    };

    const handleSaveSKU = () => {
        if (!form.name || form.qty <= 0 || form.cost <= 0 || form.price <= 0) return;

        const existingIndex = skus.findIndex((sku) => sku.name === form.name);
        if (existingIndex !== -1) {
            const updated = [...skus];
            updated[existingIndex] = { ...updated[existingIndex], ...form };
            setSkus(updated);
        } else {
            const newSku = {
                ...form,
                id: Date.now(),
            };
            setSkus([...skus, newSku]);
        }
        setForm({ name: "", qty: 0, cost: 0, price: 0 });
    };

    return (
        <div className="min-h-screen  p-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Package className="w-7 h-7 text-teal-600" /> SKU Management
                </h2>

                {/* Tab Switcher */}
                <div className="flex gap-4 mb-8">
                    {[
                        { key: "stock", icon: <Plus className="w-4 h-4" />, label: "Add Stock" },
                        { key: "edit", icon: <Edit3 className="w-4 h-4" />, label: "Edit / Add SKU" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.key
                                    ? "bg-teal-500 text-white shadow"
                                    : "bg-white text-black shadow-md hover:bg-gray-200"
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left: Form */}
                    <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6 space-y-4">
                        {activeTab === "stock" ? (
                            <>
                                <label className="text-sm font-medium text-gray-700">Select SKU</label>
                                <div className="relative w-full mt-4">
                                    <select
                                        className="appearance-none w-full bg-white/70 backdrop-blur-lg border border-gray-300 text-gray-800 p-3 pr-12 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        value={selectedId}
                                        onChange={(e) => setSelectedId(Number(e.target.value))}
                                    >
                                        {skus.map((sku) => (
                                            <option key={sku.id} value={sku.id}>
                                                {sku.name} (Current: {sku.qty})
                                            </option>
                                        ))}
                                    </select>

                                    {/* Custom Chevron Icon */}
                                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 ">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>



                                <input
                                    type="number"
                                    placeholder="Enter Quantity to Add"
                                    className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
                                    value={stockToAdd}
                                    onChange={(e) => setStockToAdd(e.target.value)}
                                />

                                <button
                                    onClick={handleAddStock}
                                    className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition"
                                >
                                    Update Stock
                                </button>
                            </>
                        ) : (
                                <>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">SKU Name</label>
                                        <input
                                            type="text"
                                            placeholder="Eg: Latte"
                                            className="w-full bg-gray-100 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Initial Quantity</label>
                                        <input
                                            type="number"
                                            placeholder="Eg: 100"
                                            className="w-full bg-gray-100 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
                                            value={form.qty}
                                            onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Cost Price (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="Eg: 110"
                                            className="w-full bg-gray-100 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
                                            value={form.cost}
                                            onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Selling Price (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="Eg: 140"
                                            className="w-full bg-gray-100 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white"
                                            value={form.price}
                                            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                                        />
                                    </div>

                                    <button
                                        onClick={handleSaveSKU}
                                        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition"
                                    >
                                        Save SKU
                                    </button>
                                </>

                        )}
                    </div>

                    {/* Right: SKU List */}
                    <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            All SKUs
                        </h3>
                        <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto scrollbar-thin pr-2">
                            {skus.map((sku) => {
                                const profit = sku.price - sku.cost;
                                const isLow = sku.qty <= 20;

                                return (
                                    <div
                                        key={sku.id}
                                        className="py-4 text-sm text-gray-800 flex justify-between items-center"
                                    >
                                        <div className="flex items-start gap-3">
                                            {isLow ? (
                                                <PackageX className="w-5 h-5 text-red-400 mt-1" />
                                            ) : (
                                                <PackageCheck className="w-5 h-5 text-green-500 mt-1" />
                                            )}
                                            <div>
                                                <div className="font-semibold text-base">{sku.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Qty:{" "}
                                                    <span className={`${isLow ? "text-red-500 font-medium" : "text-gray-700"}`}>
                                                        {sku.qty}
                                                    </span>{" "}
                                                    •
                                                    <span className="ml-2">
                                                        <IndianRupee className="inline w-3 h-3 -mt-1" /> {sku.cost} ➝ ₹{sku.price}
                                                    </span>
                                                </div>
                                                <div className="mt-1 text-xs">
                                                    Profit:{" "}
                                                    <span className={`inline-flex items-center gap-1 ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                        {profit >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                        ₹{profit}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {skus.length === 0 && (
                                <div className="text-center py-4 text-gray-400">No SKUs available.</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            </div>
            );
      
}
