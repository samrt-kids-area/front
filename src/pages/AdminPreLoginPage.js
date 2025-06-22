// src/pages/AdminPreLoginPage.js
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { itemVariants, pageTransitionVariants } from '../animations/variants';
import { ShieldAlert, KeyRound, Home } from 'lucide-react';

const AdminPreLoginPage = ({ navigateTo }) => {
    const handleProceedToAdminLogin = () => navigateTo('login?isAdmin=true');
    return (
        <motion.div
            key="adminPreLoginPage" variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit"
            className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center"
        >
            <motion.div variants={itemVariants} className="mb-8"><ShieldAlert className="w-20 h-20 text-yellow-400 mx-auto" /></motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
                Administrator Access
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-10 max-w-md">
                You are about to access the KidSecure administrative panel. Please ensure you have the necessary authorization.
            </motion.p>
            <motion.div variants={itemVariants} className="w-full max-w-xs space-y-4">
                <Button onClick={handleProceedToAdminLogin} className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 text-lg py-3 flex items-center justify-center gap-3 rounded-lg">
                    <KeyRound className="w-6 h-6" /> Proceed to Admin Login
                </Button>
                <Button onClick={() => navigateTo('overview')} className="w-full bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-500/20 transition-all duration-300 text-md py-3 flex items-center justify-center gap-2 rounded-lg">
                    <Home className="w-5 h-5" /> Back to Home
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default AdminPreLoginPage;