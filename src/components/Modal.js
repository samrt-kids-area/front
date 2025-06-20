// src/components/Modal.js
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button'; // Assuming Button.js is in the same components folder

/**
 * A reusable modal dialog component.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {Function} props.onClose - Function to call when the modal should be closed.
 * @param {React.ReactNode} props.title - The title of the modal, can be JSX.
 * @param {React.ReactNode} props.children - The content of the modal body.
 * @returns {JSX.Element|null} The modal element or null if not open.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 transition-opacity duration-300 ease-in-out"
            style={{ opacity: isOpen ? 1 : 0 }}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.2 } }}
                className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg relative border border-gray-700"
            >
                <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-semibold text-white">{title}</div>
                    <Button
                        onClick={onClose}
                        className="p-2 bg-transparent hover:bg-gray-700/50 rounded-full -mr-2 -mt-2"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 text-gray-400 hover:text-white" />
                    </Button>
                </div>
                {children}
            </motion.div>
        </div>
    );
};

export default Modal;