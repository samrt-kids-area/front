import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button"; // Corrected path
import { itemVariants, pageTransitionVariants } from "../animations/variants"; // Corrected path
import { ArrowLeft, Mail } from "lucide-react";
import {
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from "../redux/services/apiSlice";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

const ViewEmployeesPage = ({ navigateTo }) => {
  const { data, isLoading, isError } = useGetAllAdminsQuery();
  const [selectedAdmin, setSelectedAdmin] = React.useState(false);
  const closeAddParentModal = () => setSelectedAdmin(false);
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  const handleDeleteAdmin = async (e) => {
    e.preventDefault();
    try {
      await deleteAdmin(selectedAdmin._id);
      closeAddParentModal();
      toast.success("Employee deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete employee.");
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading employees.</div>
      </div>
    );
  }

  return (
    <>
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
            onClick={() => navigateTo("adminDashboard")}
            className="bg-transparent border border-sky-500 text-sky-300 hover:bg-sky-500/20
                               transition-all duration-300 text-sm px-4 py-2
                               flex items-center justify-center gap-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        {data && data.admins.length > 0 ? (
          <motion.div
            variants={itemVariants}
            className="w-full max-w-4xl space-y-6"
          >
            {data.admins.map((employee) => (
              <div
                className="flex justify-between items-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700/50"
                key={employee.id}
              >
                <div key={employee.id} className="">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {employee.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <p className="text-gray-300 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-cyan-400" />{" "}
                      {employee.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setSelectedAdmin(employee);
                  }}
                  className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded-lg"
                >
                  Delete Employee
                </Button>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg text-center mt-10"
          >
            No employees registered yet.
          </motion.p>
        )}
      </motion.div>
      <Modal
        isOpen={selectedAdmin}
        onClose={closeAddParentModal}
        title="Delete Employee"
      >
        {
          <form onSubmit={handleDeleteAdmin} className="space-y-4">
            <p className="text-gray-300">
              Are you sure you want to delete this employee? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={closeAddParentModal}
                className="bg-gray-500 text-white hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
              >
                {isLoading ? "Deleting..." : "Delete Employee"}
              </Button>
            </div>
          </form>
        }
      </Modal>
    </>
  );
};

export default ViewEmployeesPage;
