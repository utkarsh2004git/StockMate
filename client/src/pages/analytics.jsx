import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

// Mock data
const dataMap = {
    weekly: [
        { name: "Mon", sales: 1200, profit: 300 },
        { name: "Tue", sales: 1900, profit: 500 },
        { name: "Wed", sales: 800, profit: 200 },
        { name: "Thu", sales: 1500, profit: 400 },
        { name: "Fri", sales: 2000, profit: 700 },
        { name: "Sat", sales: 2500, profit: 900 },
        { name: "Sun", sales: 1700, profit: 600 },
    ],
    monthly: Array.from({ length: 12 }).map((_, i) => ({
        name: `Week ${i + 1}`,
        sales: Math.floor(Math.random() * 5000),
        profit: Math.floor(Math.random() * 2000),
    })),
    yearly: Array.from({ length: 12 }).map((_, i) => ({
        name: new Date(0, i).toLocaleString('default', { month: 'short' }),
        sales: Math.floor(Math.random() * 10000),
        profit: Math.floor(Math.random() * 5000),
    })),
};

export default function Analytics() {
    const [filter, setFilter] = useState("weekly");
    const chartData = dataMap[filter];

    return (
        <div className=" p-6 md:px-10 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-black">Analytics Overview</h2>

            {/* Filter Buttons */}
            <div className="mb-6 flex gap-2">
                {["weekly", "monthly", "yearly"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${filter === f
                                ? "bg-teal-500 text-white shadow-md"
                                : "bg-white shadow-md text-gray-700 hover:bg-teal-100"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Line Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-xl mb-6">
                <h3 className="text-lg font-semibold mb-4 text-black">Sales vs Profit ({filter})</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#00D1B2"
                            strokeWidth={3}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="profit"
                            stroke="#000000"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Prediction Card */}
            <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                    <h4 className="text-lg font-semibold text-black">Predicted {filter} Sales</h4>
                    <p className="text-teal-600 text-2xl font-bold mt-2">
                        ₹{filter === "weekly" ? 16000 : filter === "monthly" ? 64000 : 720000}
                    </p>
                </div>
                <div className="text-sm text-gray-500">
                    Based on average trends & SKU activity over the selected duration.
                </div>
            </div>
        </div>
    );
}
