import React, { useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AddEmployee = ({ onClose, fetchdata }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profilePic: "",
        role: "ADMIN", // Default role is ADMIN (fixed)
    });
    
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (!data.name || !data.email || !data.password) {
            toast.error("Please fill all required fields");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    role: "ADMIN" // Force ADMIN role in the request
                })
            });
            
            
            const responseData = await response.json();
            
            if (responseData.success) {
                toast.success("Employee added successfully!");
                fetchdata();
                onClose();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error(error.message || "Failed to add employee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add New Employee</h2>
                    <button onClick={onClose} className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer">
                        &times;
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleOnChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleOnChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Picture URL
                        </label>
                        <input
                            type="text"
                            name="profilePic"
                            value={data.profilePic}
                            onChange={handleOnChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    
                    {/* Display Role as Fixed Text (ADMIN) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <div className="w-full p-2 border rounded-md bg-gray-100">
                            ADMIN
                        </div>
                        {/* Hidden input to ensure role is still sent in form submission */}
                        <input type="hidden" name="role" value="ADMIN" />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;