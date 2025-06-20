import React from 'react';

const LoginRegister = () => {
    return (
        <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
            <div className="bg-gray-700 p-8 rounded-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Login / Register</h2>
                {/* Add your login and registration forms here */}
                <p>This is the Login/Register page.</p>
                {/* Example forms: */}
                {/* <form className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-gray-400">Don't have an account? <a href="#" className="text-blue-500 hover:underline">Register</a></p> */}
            </div>
        </div>
    );
};

export default LoginRegister;