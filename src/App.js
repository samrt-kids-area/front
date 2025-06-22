// src/App.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Info,
  CheckCircle2,
  Users,
  Phone,
  UserCog,
  Menu,
  X,
  KeyRound,
} from "lucide-react";

// Import Page Components
import OverviewPage from "./pages/OverviewPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LiveFeedPage from "./pages/LiveFeedPage";
import AdminPreLoginPage from "./pages/AdminPreLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AddChildPage from "./pages/AddChildPage";
import ViewEmployeesPage from "./pages/ViewEmployeesPage";
import VerifiedEmail from "./components/VerifiedEmail";

// Import Shared Components
import Button from "./components/Button";
import variants from "./animations/variants"; // Ensure this is the correct path to your variants file
import {
  useGetParentMutation,
  useGetUserMutation,
} from "./redux/services/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "./redux/feature/userSlice";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { logoutParent, setParent } from "./redux/feature/parentSlice";

const navLinks = [
  { id: "about", text: "About", icon: Info, href: "#about-section" },
  {
    id: "features",
    text: "Features",
    icon: CheckCircle2,
    href: "#features-section",
  },
  { id: "pricing", text: "Pricing", icon: Users, href: "#pricing-section" },
  { id: "contact", text: "Contact", icon: Phone, href: "#contact-section" },
];

const KidSecureApp = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [getUser] = useGetUserMutation();
  const [getParent] = useGetParentMutation();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    isLoading: isLoadingUser,
    isAuthenticated: isAuthenticatedUser,
    user,
  } = useSelector((state) => state.user);
  const {
    isLoading: isLoadingParent,
    isAuthenticated: isAuthenticatedParent,
    parent,
  } = useSelector((state) => state.parent);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const [resUser, resParent] = await Promise.all([
            getUser({}),
            getParent({}),
          ]);

          if ("error" in resUser) dispatch(logout());
          else dispatch(setUser(resUser.data.admin));

          if ("error" in resParent) dispatch(logoutParent());
          else dispatch(setParent(resParent.data.parent));
        } else {
          dispatch(logout());
          dispatch(logoutParent());
        }
      } catch (error) {
        console.log(error);
        dispatch(logout());
        dispatch(logoutParent());
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navigateTo = (page, context = null) => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
    navigate(`/${page}`);
  };

  /* const showHeader = ![
    "profile",
    "liveFeed",
    "adminPreLogin",
    "adminDashboard",
    "addChild",
  ].includes(currentPage); */
  /* const showFooter = currentPage === "overview"; */

  const handleNavLinkClick = (e, linkHref) => {
    const currentPage = location.pathname.replace("/", "") || "overview";
    if (currentPage !== "overview") {
      e.preventDefault();
      navigateTo("overview");
      // Ensure the target element exists before scrolling
      setTimeout(() => {
        const targetElement = document.querySelector(linkHref);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Timeout to allow page to switch to overview
    } else {
      const targetElement = document.querySelector(linkHref);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  if (isLoadingUser || isLoadingParent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col font-sans">
      <header className="py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 bg-gray-900/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 cursor-pointer"
            onClick={() => navigateTo("overview")}
          >
            KidSecure
          </motion.div>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className="hover:text-blue-300 transition-colors flex items-center gap-1 text-gray-200"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.text}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (parent) {
                      navigateTo("profile");
                    } else if (user) {
                      navigateTo("adminDashboard");
                    } else {
                      navigateTo("adminPreLogin");
                    }
                  }}
                  className="hover:text-blue-300 transition-colors flex items-center gap-1 text-gray-200 ml-4"
                >
                  <UserCog className="w-4 h-4" />
                  {user ? user?.name : parent ? parent?.name : "Admin"}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="md:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-300 transition-colors p-2 bg-transparent hover:bg-gray-700/50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </Button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, type: "tween" }}
          className="md:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg flex flex-col items-center justify-center pt-20 overflow-y-auto"
        >
          <nav className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                className="text-xl text-gray-100 hover:text-blue-300 transition-colors flex items-center gap-2 py-2"
                onClick={(e) => handleNavLinkClick(e, link.href)}
              >
                <link.icon className="w-5 h-5" />
                {link.text}
              </Link>
            ))}
            <Button
              onClick={() => navigateTo("login")}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 text-lg px-8 py-3 flex items-center justify-center gap-3 rounded-lg"
            >
              <KeyRound className="w-6 h-6" />
              Login / Register
            </Button>
            <Button
              onClick={() => navigateTo("adminPreLogin")}
              className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 text-lg px-8 py-3 flex items-center justify-center gap-3 rounded-lg"
            >
              <UserCog className="w-6 h-6" />
              Admin Panel
            </Button>
          </nav>
        </motion.div>
      )}

      <Routes>
        <Route path="/" element={<OverviewPage navigateTo={navigateTo} />} />
        <Route
          path="/overview"
          element={<OverviewPage navigateTo={navigateTo} />}
        />
        <Route path="/login" element={<LoginPage navigateTo={navigateTo} />} />
        <Route
          path="/register"
          element={<RegisterPage navigateTo={navigateTo} />}
        />
        <Route
          path="/profile"
          element={<ProfilePage navigateTo={navigateTo} />}
        />
        <Route
          path="/liveFeed"
          element={<LiveFeedPage navigateTo={navigateTo} />}
        />
        <Route
          path="/adminPreLogin"
          element={<AdminPreLoginPage navigateTo={navigateTo} />}
        />
        <Route
          path="/adminDashboard"
          element={<AdminDashboardPage navigateTo={navigateTo} />}
        />
        <Route
          path="/addChild"
          element={<AddChildPage navigateTo={navigateTo} />}
        />
        <Route
          path="/viewEmployees"
          element={<ViewEmployeesPage navigateTo={navigateTo} />}
        />
        <Route path="/verify/:id" element={<VerifiedEmail />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<OverviewPage navigateTo={navigateTo} />} />
      </Routes>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} KidSecure. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex space-x-4 sm:space-x-6">
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert("Privacy Policy clicked!");
              }}
              className="hover:text-blue-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                alert("Terms of Service clicked!");
              }}
              className="hover:text-blue-300 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#contact-us-footer"
              onClick={(e) => handleNavLinkClick(e, "#contact-section")}
              className="hover:text-blue-300 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return <KidSecureApp />;
};

export default App;
