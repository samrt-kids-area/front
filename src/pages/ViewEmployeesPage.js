// src/pages/ViewEmployeesPage.js
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button'; // Corrected path
import { itemVariants, pageTransitionVariants } from '../animations/variants'; // Corrected path
import { ArrowLeft, UsersRound, Mail, Phone, Home as HomeIcon, ScanLine } from 'lucide-react';

const ViewEmployeesPage = ({ navigateTo, employees }) => {
    return (
        <motion.div
            key="viewEmployeesPage"
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
            <div className="w-full max-w-4xl mb-10 flex justify-between items-center">
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500"
                >
                    Employee Roster
                </motion.h2>
                {/* THIS BUTTON IS THE ONE YOU'RE ASKING FOR - IT SHOULD ALREADY BE PRESENT */}
                <Button
                    onClick={() => navigateTo('adminDashboard')}
                    className="bg-transparent border border-sky-500 text-sky-300 hover:bg-sky-500/20
                               transition-all duration-300 text-sm px-4 py-2
                               flex items-center justify-center gap-2 rounded-lg"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Button>
            </div>

            {employees && employees.length > 0 ? (
                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-4xl space-y-6"
                >
                    {employees.map((employee) => (
                        <div key={employee.id} className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700/50">
                            <h3 className="text-xl font-semibold text-white mb-3">{employee.name}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                <p className="text-gray-300 flex items-center"><Mail className="w-4 h-4 mr-2 text-cyan-400" /> {employee.email}</p>
                                <p className="text-gray-300 flex items-center"><Phone className="w-4 h-4 mr-2 text-cyan-400" /> {employee.phone}</p>
                                <p className="text-gray-300 flex items-center"><ScanLine className="w-4 h-4 mr-2 text-cyan-400" /> National ID: {employee.nationalId}</p>
                                <p className="text-gray-300 flex items-center col-span-1 md:col-span-2"><HomeIcon className="w-4 h-4 mr-2 text-cyan-400" /> Address: {employee.address}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            ) : (
                <motion.p variants={itemVariants} className="text-gray-400 text-lg text-center mt-10">
                    No employees registered yet.
                </motion.p>
            )}
        </motion.div>
    );
};

export default ViewEmployeesPage;