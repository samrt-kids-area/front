// src/pages/LoginPage.js
import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { itemVariants, pageTransitionVariants } from "../animations/variants";
import { KeyRound, Home } from "lucide-react"; // Icons for this page
import {
  useLoginMutation,
  useLoginParentMutation,
} from "../redux/services/apiSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setParent } from "../redux/feature/parentSlice";
import { useForm } from "react-hook-form";
import { setUser } from "../redux/feature/userSlice";

const LoginPage = ({ navigateTo }) => {
  const [loginParent, { isLoading: isLoadingParent }] =
    useLoginParentMutation();
  const [loginAdmin, { isLoading: isLoadingAdmin }] = useLoginMutation();
  const dispatch = useDispatch();
  const isAdminText = new URLSearchParams(window.location.search).get(
    "isAdmin"
  );
  const isAdmin = isAdminText === "true";

  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    //resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = isAdmin ? await loginAdmin(data) : await loginParent(data);
      if ("error" in res) toast.error(res.error.data.message);

      if ("data" in res) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful");
        if (isAdmin) {
          dispatch(setUser(res.data.parent));
          navigateTo("adminDashboard");
        } else {
          dispatch(setParent(res.data.parent));
          navigateTo("profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      key="loginPage"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center"
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300 mb-8"
      >
        Login
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="w-full max-w-md space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl"
      >
        <div>
          <label
            htmlFor="email-login"
            className="block text-sm font-medium text-gray-200 text-left mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email-login"
            autoComplete="email"
            className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            placeholder="you@example.com"
            {...register("email")}
          />
        </div>
        <div>
          <label
            htmlFor="password-login"
            className="block text-sm font-medium text-gray-200 text-left mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password-login"
            id="password-login"
            autoComplete="current-password"
            className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            placeholder="••••••••"
            {...register("password")}
          />
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 text-lg py-3 flex items-center justify-center gap-3 rounded-lg"
        >
          <KeyRound className="w-6 h-6" />
          {isLoadingAdmin || isLoadingParent ? "Logging in..." : "Login"}
        </Button>
        {!isAdmin && (
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigateTo("register")}
              className="font-medium text-purple-400 hover:text-purple-300 underline bg-transparent border-none p-0 cursor-pointer"
            >
              Register here
            </button>
          </p>
        )}
      </motion.div>
      <motion.div variants={itemVariants} className="mt-12">
        <Button
          onClick={() => navigateTo("overview")}
          className="bg-transparent border border-purple-400 text-purple-300 hover:bg-purple-400/20 transition-all duration-300 text-md px-6 py-2 flex items-center justify-center gap-2 rounded-lg"
        >
          <Home className="w-5 h-5" />{" "}
          {/* Changed ArrowLeft to Home for consistency */}
          Back to Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
