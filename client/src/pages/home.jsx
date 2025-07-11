import React, { useState } from "react";
import {
    PackageCheck,
    BarChart2,
    Boxes,
    ClipboardList,
} from "lucide-react";
import Orders from "./orders";
import Inventory from "./inventory";
import Analytics from "./analytics";
import SKUs from "./skus";


const TABS = {
    orders: <Orders />,
    inventory: <Inventory />,
    analytics: <Analytics />,
    skus: <SKUs />,
};

export default function Home() {
    const [activeTab, setActiveTab] = useState("orders");
    

    return (
        <div className="h-[calc(100vh-64px)] mt-16 flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-20 bg-white flex flex-col items-center py-6 gap-8 shadow-xs">
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`p-3 rounded-xl transition-all ${activeTab === "orders" ? "bg-teal-100 text-teal-600 shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                >
                    <ClipboardList className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setActiveTab("inventory")}
                    className={`p-3 rounded-xl transition-all ${activeTab === "inventory" ? "bg-teal-100 text-teal-600 shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                >
                    <Boxes className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setActiveTab("analytics")}
                    className={`p-3 rounded-xl transition-all ${activeTab === "analytics" ? "bg-teal-100 text-teal-600 shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                >
                    <BarChart2 className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setActiveTab("skus")}
                    className={`p-3 rounded-xl transition-all ${activeTab === "skus" ? "bg-teal-100 text-teal-600 shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                >
                    <PackageCheck className="w-6 h-6" />
                </button>
            </div>


            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">{TABS[activeTab]}</div>
        </div>
    );
}
