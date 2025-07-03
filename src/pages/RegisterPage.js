// src/pages/RegisterPage.js
import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { itemVariants, pageTransitionVariants } from "../animations/variants";
import {
  UserPlus,
  Mail,
  Smartphone,
  KeyRound,
  Home,
  ArrowLeft,
} from "lucide-react";
import { useAddParentWithPasswordMutation } from "../redux/services/apiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RegisterPage = ({ navigateTo }) => {
  const [addParent, { isLoading }] = useAddParentWithPasswordMutation();
  const [successAddingParent, setSuccessAddingParent] = React.useState(false);
  const [parentData, setParentData] = React.useState(null);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      photo: null,
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const isValidEmail = /^[\w.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(
      data.email
    );
    if (!isValidEmail) return toast.error("Invalid email format");
    const isValidPhone = /^01[0125][0-9]{8}$/.test(data.phone);
    if (!isValidPhone) return toast.error("Invalid phone number format");

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const res = await addParent(data);
    if ("data" in res) {
      setSuccessAddingParent(true);
      setParentData(res.data);
      toast.success(res.data.message);
      navigateTo("");
    }
    if ("error" in res) {
      toast.error(res.error.data.message);
    }
  };
  return (
    <motion.div
      key="registerPage"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center"
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-8"
      >
        Create Account
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="w-full max-w-md space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl"
      >
        <div>
          <label
            htmlFor="fullName-register"
            className="block text-sm font-medium text-gray-200 text-left mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserPlus className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="fullName-register"
              id="fullName-register"
              autoComplete="name"
              className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 pl-10 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
              placeholder="John Doe"
              {...register("name", { required: true })}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email-register"
            className="block text-sm font-medium text-gray-200 text-left mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email-register"
              id="email-register"
              autoComplete="email"
              className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 pl-10 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone-register"
            className="block text-sm font-medium text-gray-200 text-left mb-1"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Smartphone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone-register"
              id="phone-register"
              autoComplete="tel"
              className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 pl-10 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
              placeholder="+1 (555) 123-4567"
              {...register("phone", { required: true })}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="password-register"
            className="block text-sm font-medium text-gray-200 text-left mb-1"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password-register"
              id="password-register"
              autoComplete="new-password"
              className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 pl-10 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
              placeholder="••••••••"
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 text-lg py-3 flex items-center justify-center gap-3 rounded-lg"
        >
          <UserPlus className="w-6 h-6" /> Create Account
        </Button>
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigateTo("login")}
            className="font-medium text-orange-400 hover:text-orange-300 underline bg-transparent border-none p-0 cursor-pointer"
          >
            Login here
          </button>
        </p>
      </motion.div>
      <motion.div variants={itemVariants} className="mt-12">
        <Button
          onClick={() => navigateTo("overview")}
          className="bg-transparent border border-orange-400 text-orange-300 hover:bg-orange-400/20 transition-all duration-300 text-md px-6 py-2 flex items-center justify-center gap-2 rounded-lg"
        >
          <Home className="w-5 h-5" /> Back to Home
        </Button>
      </motion.div>
    </motion.div>
  );
};
export default RegisterPage;
