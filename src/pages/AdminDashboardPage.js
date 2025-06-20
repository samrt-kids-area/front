// src/pages/AdminDashboardPage.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { itemVariants, pageTransitionVariants } from '../animations/variants';
import {
    UsersRound, UserPlus, ClipboardList, LogOut, Save, Briefcase, ArrowLeft,
    Menu as MenuIcon, X as XIcon, PanelLeftOpen, PanelLeftClose,
    LogOut as CheckoutIcon, Clock as ClockIcon, UserCheck
} from 'lucide-react';

const AdminDashboardPage = ({ navigateTo }) => {
    // ... (all your existing state for parentsData, childrenInAreaData, modals, employees - NO CHANGES HERE) ...
    const [parentsData, setParentsData] = useState([ { id: 'p1', name: 'Alice Wonderland', email: 'alice@example.com', phone: '555-0101', children: [{ id: 'c1a', name: 'Chesire Jr.', avatar: '😺', status: 'At Home' }, { id: 'c1b', name: 'Hatter Jr.', avatar: '🎩', status: 'At School' }] }, { id: 'p2', name: 'Bob The Builder', email: 'bob@example.com', phone: '555-0102', children: [{ id: 'c2a', name: 'Scoop', avatar: '🚜', status: 'At Playgroup' }] }, { id: 'p3', name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0103', children: [] }]);
    const [childrenInAreaData, setChildrenInAreaData] = useState([ { id: 'c1b', name: 'Hatter Jr.', avatar: '🎩', parentName: 'Alice Wonderland', entryTime: '09:15 AM', uniqueEntryId: `entry-${Date.now()}-c1b` }, { id: 'c2a', name: 'Scoop', avatar: '🚜', parentName: 'Bob The Builder', entryTime: '10:30 AM', uniqueEntryId: `entry-${Date.now()}-c2a` }, ]);
    const [isAddParentModalOpen, setIsAddParentModalOpen] = useState(false);
    const [newParentForm, setNewParentForm] = useState({ name: '', email: '', phone: '' });
    const [isChildEntryModalOpen, setIsChildEntryModalOpen] = useState(false);
    const [selectedParentForEntry, setSelectedParentForEntry] = useState('');
    const [selectedChildrenForEntry, setSelectedChildrenForEntry] = useState([]);
    const [entryTimePeriod, setEntryTimePeriod] = useState('1_hour');
    const [employees, setEmployees] = useState([ { id: 'e1', name: 'John Smith', email: 'john.s@example.com', phone: '555-0201', nationalId: '1234567890', address: '123 Main St, Anytown' }, { id: 'e2', name: 'Maria Garcia', email: 'maria.g@example.com', phone: '555-0202', nationalId: '0987654321', address: '456 Oak Ave, Anytown' }]);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [newEmployeeForm, setNewEmployeeForm] = useState({ name: '', email: '', phone: '', nationalId: '', address: '' });
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [childForCheckout, setChildForCheckout] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState('');

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => { if (isSidebarOpen && window.innerWidth < 768) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; } return () => { document.body.style.overflow = 'unset'; }; }, [isSidebarOpen]);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const openAddEmployeeModal = () => { setNewEmployeeForm({ name: '', email: '', phone: '', nationalId: '', address: '' }); setIsAddEmployeeModalOpen(true); if (window.innerWidth < 768) setIsSidebarOpen(false);};
    const closeAddEmployeeModal = () => setIsAddEmployeeModalOpen(false);
    const handleEmployeeFormChange = (e) => { const { name, value } = e.target; setNewEmployeeForm(prev => ({ ...prev, [name]: value }));};
    const handleSaveNewEmployee = (e) => { e.preventDefault(); if (!newEmployeeForm.name.trim() || !newEmployeeForm.email.trim() || !newEmployeeForm.nationalId.trim()) { alert("Employee's name, email, and national ID are required."); return; } setEmployees(prev => [...prev, { id: `e${Date.now()}`, ...newEmployeeForm }]); alert(`Employee "${newEmployeeForm.name}" added (simulated).`); closeAddEmployeeModal();};
    const openAddParentModal = () => { setNewParentForm({ name: '', email: '', phone: '' }); setIsAddParentModalOpen(true); if (window.innerWidth < 768) setIsSidebarOpen(false);};
    const closeAddParentModal = () => setIsAddParentModalOpen(false);
    const handleParentFormChange = (e) => { const { name, value } = e.target; setNewParentForm(prev => ({ ...prev, [name]: value })); };
    const handleSaveNewParent = (e) => { e.preventDefault(); if (!newParentForm.name.trim() || !newParentForm.email.trim()) { alert("Parent's name and email are required."); return; } setParentsData(prev => [...prev, { id: `p${Date.now()}`, name: newParentForm.name, email: newParentForm.email, phone: newParentForm.phone, children: [] }]); alert(`Parent "${newParentForm.name}" added (simulated).`); closeAddParentModal(); };
    const navigateToAddChildForParent = (parentId, parentName) => { navigateTo('addChild', { parentId, parentName, fromPage: 'adminDashboard' }); if (window.innerWidth < 768) setIsSidebarOpen(false);};
    const openChildEntryModal = () => { setSelectedParentForEntry(''); setSelectedChildrenForEntry([]); setEntryTimePeriod('1_hour'); setIsChildEntryModalOpen(true); if (window.innerWidth < 768) setIsSidebarOpen(false);};
    const closeChildEntryModal = () => setIsChildEntryModalOpen(false);
    const handleParentSelectForEntry = (parentId) => { setSelectedParentForEntry(parentId); setSelectedChildrenForEntry([]); };
    const handleChildSelectForEntry = (childId) => { setSelectedChildrenForEntry(prev => prev.includes(childId) ? prev.filter(id => id !== childId) : [...prev, childId]); };
    const handleTimePeriodChange = (e) => setEntryTimePeriod(e.target.value);
    const handleRegisterChildEntry = (e) => { e.preventDefault(); if (!selectedParentForEntry || selectedChildrenForEntry.length === 0) { alert("Please select a parent and at least one child."); return; } const parent = parentsData.find(p => p.id === selectedParentForEntry); if (!parent) return; const childrenToRegister = parent.children.filter(child => selectedChildrenForEntry.includes(child.id)); const newEntries = childrenToRegister.map(child => ({ id: child.id, uniqueEntryId: `entry-${Date.now()}-${child.id}`, name: child.name, avatar: child.avatar, parentName: parent.name, entryTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })); setChildrenInAreaData(prev => { const existingUniqueEntryIds = new Set(prev.map(c => c.uniqueEntryId)); const trulyNewEntries = newEntries.filter(ne => !existingUniqueEntryIds.has(ne.uniqueEntryId)); return [...prev, ...trulyNewEntries]; }); alert(`${childrenToRegister.map(c => c.name).join(', ')} registered for entry for ${entryTimePeriod.replace('_', ' ')}.`); closeChildEntryModal(); };
    const parentForEntryDetails = parentsData.find(p => p.id === selectedParentForEntry);
    const openCheckoutModal = (childInArea) => { setChildForCheckout(childInArea); setCheckoutTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); setIsCheckoutModalOpen(true); if (window.innerWidth < 768) setIsSidebarOpen(false); };
    const closeCheckoutModal = () => { setIsCheckoutModalOpen(false); setChildForCheckout(null); };
    const handleConfirmCheckout = () => { if (!childForCheckout) return; setChildrenInAreaData(prev => prev.filter(child => child.uniqueEntryId !== childForCheckout.uniqueEntryId)); alert(`${childForCheckout.name} has been checked out.`); closeCheckoutModal(); };


    // Variants for sidebar animation
    const sidebarMobileVariants = {
        open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
        closed: { x: "-100%", opacity: 1, transition: { type: "tween", duration: 0.3, ease: "easeIn" } } // Keep opacity 1 for smoother slide with bg
    };

    const sidebarDesktopVariants = {
        open: { width: "20%", opacity: 1, paddingLeft: "1.5rem", paddingRight: "1.5rem", marginRight: "2rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: { width: "0px", opacity: 0, paddingLeft: "0", paddingRight: "0", marginRight: "0", overflow: "hidden", transition: { type: "spring", stiffness: 300, damping: 30 } }
    };


    return (
        <>
            <motion.div
                key="adminDashboardPage" variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit"
                className="flex-1 flex flex-col w-full"
            >
                {/* Page Header */}
                <div className="w-full bg-gray-800/50 backdrop-blur-sm shadow-lg px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Button onClick={toggleSidebar} className="p-2 bg-gray-700/60 hover:bg-gray-600/60 text-white rounded-md" aria-label="Toggle Admin Menu">
                            {isSidebarOpen ? <PanelLeftClose className="w-6 h-6" /> : <PanelLeftOpen className="w-6 h-6" />}
                        </Button>
                        <motion.h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 flex-1 text-center sm:text-left sm:ml-4">
                            Admin Dashboard
                        </motion.h2>
                        <Button onClick={() => navigateTo('overview')} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md flex items-center justify-center gap-2">
                            <LogOut className="w-4 h-4" /> Logout
                        </Button>
                    </div>
                </div>

                {/* Main Layout: Sidebar + Content Area */}
                <div className="flex flex-1 w-full max-w-7xl mx-auto relative overflow-hidden">
                    {/* Overlay for mobile sidebar when open */}
                    <AnimatePresence>
                        {isSidebarOpen && window.innerWidth < 768 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={toggleSidebar}
                                className="fixed inset-0 bg-black/60 z-30 md:hidden"
                            />
                        )}
                    </AnimatePresence>

                    {/* Sidebar Navigation Panel */}
                    <motion.aside
                        key="admin-sidebar"
                        className={`
                            fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 shadow-xl p-6 space-y-3 flex flex-col // Base mobile styles
                            md:relative md:z-auto md:inset-auto md:shadow-none md:bg-white/5 md:backdrop-blur-md md:border-r md:border-gray-700/50 // Desktop override styles
                        `}
                        // Conditionally apply variants
                        variants={window.innerWidth < 768 ? sidebarMobileVariants : sidebarDesktopVariants}
                        initial="closed" // This will be "closed" for both initially
                        animate={isSidebarOpen ? "open" : "closed"}
                    >
                        <div className="flex-grow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-600 pb-2">Admin Actions</h3>
                                {/* Hide X on desktop, main toggle is used */}
                                <Button onClick={toggleSidebar} className="p-1 bg-transparent hover:bg-gray-700/50 rounded-full md:hidden">
                                    <XIcon className="w-5 h-5 text-gray-300"/>
                                </Button>
                            </div>
                            <Button onClick={openAddEmployeeModal} className="w-full bg-sky-500 hover:bg-sky-600 text-white text-sm justify-start px-4 py-2.5 rounded-md flex items-center gap-3"><UserPlus className="w-5 h-5" />Add Employee</Button>
                            <Button onClick={() => { navigateTo('viewEmployees', { employees: employees }); if (window.innerWidth < 768) setIsSidebarOpen(false); }} className="w-full bg-purple-500 hover:bg-purple-600 text-white text-sm justify-start px-4 py-2.5 rounded-md flex items-center gap-3 mt-3"><Briefcase className="w-5 h-5" />View Employees</Button>
                            <Button onClick={openChildEntryModal} className="w-full bg-green-500 hover:bg-green-600 text-white text-sm justify-start px-4 py-2.5 rounded-md flex items-center gap-3 mt-3"><ClipboardList className="w-5 h-5" />Register Entry</Button>
                        </div>
                        <Button onClick={() => {navigateTo('overview'); if (window.innerWidth < 768) setIsSidebarOpen(false);}} className="w-full bg-gray-600 hover:bg-gray-500 text-gray-100 text-sm justify-start px-4 py-2.5 rounded-md flex items-center gap-3 mt-auto">
                            <ArrowLeft className="w-5 h-5" />Site Overview
                        </Button>
                    </motion.aside>

                    {/* Right Content Area */}
                    <motion.main
                        className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out"
                        // The main content will naturally take up space.
                        // If you want to animate its margin/padding based on desktop sidebar state, you can add:
                        // animate={{ marginLeft: (window.innerWidth >= 768 && isSidebarOpen) ? sidebarDesktopVariants.open.width : "0px" }}
                        // initial={{ marginLeft: (window.innerWidth >= 768 && isSidebarOpen) ? sidebarDesktopVariants.open.width : "0px" }}
                    >
                         <motion.section variants={itemVariants} className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
                            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-6 flex items-center gap-3">
                                <ClipboardList className="w-8 h-8 text-green-400" />
                                Children in Monitored Area
                            </h3>
                            {childrenInAreaData.length > 0 ? childrenInAreaData.map(childInArea => (
                                <div key={childInArea.uniqueEntryId} className="bg-gray-700/50 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3 sm:gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{childInArea.avatar}</span>
                                        <div>
                                            <p className="text-lg font-medium text-white">{childInArea.name}</p>
                                            <p className="text-sm text-gray-400">Parent: {childInArea.parentName}</p>
                                            <p className="text-xs text-green-300">Entered: {childInArea.entryTime}</p>
                                        </div>
                                    </div>
                                    <Button onClick={() => openCheckoutModal(childInArea)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-2 self-start sm:self-center">
                                        <CheckoutIcon className="w-4 h-4" /> Checkout
                                    </Button>
                                </div>
                            )) : <p className="text-gray-400 text-center py-4">No children currently detected.</p>}
                        </motion.section>

                        <motion.section variants={itemVariants} className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl mt-10">
                             <div className="flex justify-between items-center mb-6"><h3 className="text-2xl sm:text-3xl font-semibold text-gray-100 flex items-center gap-3"><UsersRound className="w-8 h-8 text-indigo-400" />Parents & Children</h3><Button onClick={openAddParentModal} className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add Parent</Button></div>
                            {parentsData.length > 0 ? parentsData.map(parent => (<div key={parent.id} className="bg-gray-700/50 p-4 rounded-lg mb-4"><div className="flex justify-between items-start mb-3"><div><p className="text-xl font-medium text-white">{parent.name}</p><p className="text-sm text-gray-300">{parent.email}</p>{parent.phone && <p className="text-xs text-gray-400">Phone: {parent.phone}</p>}</div><Button onClick={() => navigateToAddChildForParent(parent.id, parent.name)} className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1 rounded-md flex items-center gap-1"><UserPlus className="w-3 h-3" /> Add Child</Button></div>{parent.children.length > 0 ? (<ul className="list-disc list-inside pl-2 space-y-1">{parent.children.map(child => (<li key={child.id} className="text-gray-200"><span className="mr-2">{child.avatar}</span>{child.name} - <span className="text-xs text-gray-400">{child.status}</span></li>))}</ul>) : <p className="text-sm text-gray-400 italic">No children registered.</p>}</div>)) : <p className="text-gray-400 text-center py-4">No parents registered yet.</p>}
                        </motion.section>
                    </motion.main>
                </div>
            </motion.div>

            {/* Modals ... */}
            <Modal isOpen={isAddParentModalOpen} onClose={closeAddParentModal} title="Add New Parent">{/* ... Add Parent Form ... */ <form onSubmit={handleSaveNewParent} className="space-y-4"><div><label htmlFor="parentName" className="block text-sm font-medium text-gray-200 mb-1">Full Name</label><input type="text" name="name" id="parentName" value={newParentForm.name} onChange={handleParentFormChange} required className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Parent's Full Name" /></div><div><label htmlFor="parentEmail" className="block text-sm font-medium text-gray-200 mb-1">Email Address</label><input type="email" name="email" id="parentEmail" value={newParentForm.email} onChange={handleParentFormChange} required className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="parent@example.com" /></div><div><label htmlFor="parentPhone" className="block text-sm font-medium text-gray-200 mb-1">Phone (Optional)</label><input type="tel" name="phone" id="parentPhone" value={newParentForm.phone} onChange={handleParentFormChange} className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="(555) 123-4567" /></div><div className="flex justify-end gap-3 pt-2"><Button type="button" onClick={closeAddParentModal} className="bg-gray-600 hover:bg-gray-500 text-gray-100">Cancel</Button><Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white"><Save className="w-4 h-4 mr-2" />Save Parent</Button></div></form>}</Modal>
            <Modal isOpen={isChildEntryModalOpen} onClose={closeChildEntryModal} title="Register Child Entry">{/* ... Register Child Entry Form ... */ <form onSubmit={handleRegisterChildEntry} className="space-y-5"><div><label htmlFor="selectParentEntry" className="block text-sm font-medium text-gray-200 mb-1">Select Parent</label><select id="selectParentEntry" value={selectedParentForEntry} onChange={(e) => handleParentSelectForEntry(e.target.value)} required className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"><option value="" disabled>-- Select a Parent --</option>{parentsData.map(parent => (<option key={parent.id} value={parent.id}>{parent.name}</option>))}</select></div>{selectedParentForEntry && parentForEntryDetails && parentForEntryDetails.children.length > 0 && (<div><label className="block text-sm font-medium text-gray-200 mb-2">Select Child(ren)</label><div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-600 rounded-md">{parentForEntryDetails.children.map(child => (<div key={child.id} className="flex items-center"><input type="checkbox" id={`child-entry-${child.id}`} checked={selectedChildrenForEntry.includes(child.id)} onChange={() => handleChildSelectForEntry(child.id)} className="h-4 w-4 rounded border-gray-500 text-green-600 focus:ring-green-500 bg-gray-700" /><label htmlFor={`child-entry-${child.id}`} className="ml-2 text-sm text-gray-100 flex items-center"><span className="mr-2 text-lg">{child.avatar}</span> {child.name}</label></div>))}</div></div>)}{selectedParentForEntry && parentForEntryDetails && parentForEntryDetails.children.length === 0 && (<p className="text-sm text-gray-400 italic">This parent has no registered children.</p>)}<div><label htmlFor="timePeriodEntry" className="block text-sm font-medium text-gray-200 mb-1">Time Period</label><select id="timePeriodEntry" value={entryTimePeriod} onChange={handleTimePeriodChange} className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"><option value="30_mins">30 Minutes</option><option value="1_hour">1 Hour</option><option value="2_hours">2 Hours</option><option value="4_hours">4 Hours</option><option value="full_day">Full Day</option></select></div><div className="flex justify-end gap-3 pt-3"><Button type="button" onClick={closeChildEntryModal} className="bg-gray-600 hover:bg-gray-500 text-gray-100">Cancel</Button><Button type="submit" className="bg-green-500 hover:bg-green-600 text-white" disabled={!selectedParentForEntry || selectedChildrenForEntry.length === 0}><ClipboardList className="w-4 h-4 mr-2" />Register Entry</Button></div></form>}</Modal>
            <Modal isOpen={isAddEmployeeModalOpen} onClose={closeAddEmployeeModal} title="Add New Employee">{/* ... Add Employee Form ... */ <form onSubmit={handleSaveNewEmployee} className="space-y-4"><div><label htmlFor="employeeName" className="block text-sm font-medium text-gray-200 mb-1">Full Name</label><input type="text" name="name" id="employeeName" value={newEmployeeForm.name} onChange={handleEmployeeFormChange} required className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="Employee's Full Name" /></div><div><label htmlFor="employeeEmail" className="block text-sm font-medium text-gray-200 mb-1">Email Address</label><input type="email" name="email" id="employeeEmail" value={newEmployeeForm.email} onChange={handleEmployeeFormChange} required className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="employee@example.com" /></div><div><label htmlFor="employeePhone" className="block text-sm font-medium text-gray-200 mb-1">Phone Number</label><input type="tel" name="phone" id="employeePhone" value={newEmployeeForm.phone} onChange={handleEmployeeFormChange} className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="(555) 987-6543" /></div><div><label htmlFor="employeeNationalId" className="block text-sm font-medium text-gray-200 mb-1">National ID</label><input type="text" name="nationalId" id="employeeNationalId" value={newEmployeeForm.nationalId} onChange={handleEmployeeFormChange} required className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="National ID Number" /></div><div><label htmlFor="employeeAddress" className="block text-sm font-medium text-gray-200 mb-1">Address</label><textarea name="address" id="employeeAddress" value={newEmployeeForm.address} onChange={handleEmployeeFormChange} rows="2" className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="Employee's Address"></textarea></div><div className="flex justify-end gap-3 pt-2"><Button type="button" onClick={closeAddEmployeeModal} className="bg-gray-600 hover:bg-gray-500 text-gray-100">Cancel</Button><Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white"><Save className="w-4 h-4 mr-2" />Save Employee</Button></div></form>}</Modal>
            <Modal isOpen={isCheckoutModalOpen} onClose={closeCheckoutModal} title={<span className="flex items-center text-yellow-400"><UserCheck className="w-7 h-7 mr-3" />Confirm Child Checkout</span>}>{childForCheckout && (<div className="text-gray-200 space-y-4"><p className="text-lg">Are you sure you want to checkout <strong className="text-white">{childForCheckout.name}</strong>?</p><div className="bg-gray-700/50 p-3 rounded-md text-sm"><p className="flex items-center"><ClockIcon className="w-4 h-4 mr-2 text-green-400" />Entry Time: <span className="ml-1 font-medium text-gray-100">{childForCheckout.entryTime}</span></p><p className="flex items-center mt-1"><ClockIcon className="w-4 h-4 mr-2 text-yellow-400" />Current Exit Time: <span className="ml-1 font-medium text-gray-100">{checkoutTime}</span></p><p className="mt-1">Parent: <span className="font-medium text-gray-100">{childForCheckout.parentName}</span></p></div><p className="text-xs text-gray-400">This action will remove the child from the "Children in Monitored Area" list.</p><div className="flex justify-end gap-3 pt-3"><Button onClick={closeCheckoutModal} className="bg-gray-600 hover:bg-gray-500 text-gray-100">Cancel</Button><Button onClick={handleConfirmCheckout} className="bg-yellow-500 hover:bg-yellow-600 text-white"><CheckoutIcon className="w-4 h-4 mr-2" />Confirm Checkout</Button></div></div>)}</Modal>
        </>
    );
};
export default AdminDashboardPage;