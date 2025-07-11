import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../context/userContext';

const Dashboard = () => {
    const [shops, setShops] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [shopName, setShopName] = useState('');
    const { user } = useContext(userContext);
    const navigate = useNavigate();

    const getShops = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/shops');
            if (res.data.success) {
                setShops(res.data.shops);
            } else {
                console.error('Failed to fetch shops:', res.data.message);
            }
        } catch (error) {
            console.error('Error fetching shops:', error);
        }
    };

    const handleAddShop = async (e) => {
        e.preventDefault();
        if (!shopName.trim()) {
            alert('Please enter a valid shop name');
            return;
        }

        const newShop = {
            name: shopName,
            ownerClerkId: user?.ownerClerkId,
        };

        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/shops', newShop);
            if (!res.data.success) {
                alert("Error adding shop");
                return;
            }
            await getShops();
        } catch (error) {
            console.log('Error adding shop:', error);
            alert('Failed to add shop. Please try again later.');
        } finally {
            setShowModal(false);
            setShopName('');
        }
    };

    useEffect(() => {
        if(!user){
            navigate('/'); 
            return;
        }
        const fetchShops = async () => {
            await getShops();
        };
        fetchShops();
    }, [shops]);

    return (
        <div className="px-4 md:px-8 py-20 h-screen">
            
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Shops</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-teal-600 hover:cursor-pointer text-white px-4 py-2 rounded-full hover:bg-teal-700 transition shadow"
                >
                    + Add Shop
                </button>
            </div>

            
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {shops.map((shop) => (
                    <div
                        key={shop._id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border border-gray-100"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{shop.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Shop ID: {shop._id}</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => navigate(`/shop/${shop._id}`)}
                                className="hover:cursor-pointer bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                            >
                                Open
                            </button>
                            <button
                                onClick={() => {
                                    
                                }}
                                className="hover:cursor-pointer px-4 py-2 rounded-lg bg-[#1E2939] text-white hover:bg-white hover:outline-2 hover:outline-[#1E2939] hover:text-[#1E2939] transition"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {shops.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    <p>No shops found. Click the button above to add a new shop.</p>
                </div>
            )}
            
            {(showModal) && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Shop</h3>
                        <form onSubmit={handleAddShop}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter shop name"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setShopName('');
                                    }}
                                    className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
