import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const inventoryData = [
    { id: 1, name: "Espresso", initial: 100, current: 50, price: 120, color: "#14b8a6" },
    { id: 2, name: "Cappuccino", initial: 50, current: 10, price: 150, color: "#0f766e" },
    { id: 3, name: "Latte", initial: 80, current: 20, price: 140, color: "#0d9488" },
    { id: 4, name: "Mocha", initial: 60, current: 35, price: 160, color: "#115e59" }
];

export default function InventoryDashboard() {
    const totalSummary = inventoryData.reduce(
        (acc, item) => {
            const sold = item.initial - item.current;
            acc.initialQty += item.initial;
            acc.currentQty += item.current;
            acc.soldQty += sold;
            acc.initialValue += item.initial * item.price;
            acc.currentValue += item.current * item.price;
            acc.soldValue += sold * item.price;
            return acc;
        },
        { initialQty: 0, currentQty: 0, soldQty: 0, initialValue: 0, currentValue: 0, soldValue: 0 }
    );

    const pieData = inventoryData.map((item) => ({
        name: item.name,
        value: item.initial - item.current,
        color: item.color
    }));

    return (
        <div className="min-h-screen p-6 md:px-10">
            <h1 className="text-3xl font-bold mb-8 text-black">Inventory Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Start of Day"
                    qty={totalSummary.initialQty}
                    value={totalSummary.initialValue}
                    breakdown={inventoryData.map((i) => ({
                        name: i.name,
                        qty: i.initial,
                        value: i.initial * i.price
                    }))}
                />
                <StatCard
                    title="Current Stock"
                    qty={totalSummary.currentQty}
                    value={totalSummary.currentValue}
                    breakdown={inventoryData.map((i) => ({
                        name: i.name,
                        qty: i.current,
                        value: i.current * i.price
                    }))}
                />
                <StatCard
                    title="Total Sold"
                    qty={totalSummary.soldQty}
                    value={totalSummary.soldValue}
                    breakdown={inventoryData.map((i) => {
                        const sold = i.initial - i.current;
                        return {
                            name: i.name,
                            qty: sold,
                            value: sold * i.price
                        };
                    })}
                />
                <StatCard
                    title="Total Profit"
                    qty={totalSummary.soldQty}
                    value={totalSummary.soldQty * 30}
                    breakdown={inventoryData.map((i) => {
                        const sold = i.initial - i.current;
                        return {
                            name: i.name,
                            qty: sold,
                            value: sold * 30
                        };
                    })}
                />
            </div>

            {/* Donut Pie Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-black">SKU Sales Distribution</h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <ResponsiveContainer width="100%" height={300} className="md:w-2/3">
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="flex flex-col gap-2 md:w-1/3">
                        {pieData.map((entry, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-black">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-sm">
                                    {entry.name}: {entry.value} sold
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, qty, value, breakdown }) {
    return (
        <div className="bg-white text-black rounded-2xl shadow-lg p-5 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="text-3xl font-bold mt-1">{qty}</div>
                <div className="text-sm text-teal-700 font-medium">₹{value}</div>
            </div>
            <div className="mt-4 text-sm bg-teal-500 text-white p-3 rounded-lg space-y-1 max-h-48 overflow-auto scrollbar-thin">
                {breakdown.map((item) => (
                    <div key={item.name} className="flex justify-between">
                        <span>{item.name}:</span>
                        <span>
                            {item.qty} <span className="text-teal-100">(₹{item.value})</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
