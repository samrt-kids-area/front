// src/pages/OverviewPage.js
import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { containerVariants, itemVariants } from "../animations/variants";
import {
  Tv,
  AlertTriangle,
  Bell,
  Cloud,
  Monitor,
  Settings,
  KeyRound,
} from "lucide-react"; // Only icons needed for this page
import { useSelector } from "react-redux";

const OverviewPage = ({ navigateTo }) => {
  const features = [
    {
      icon: Tv,
      title: "Secure Live Monitoring",
      text: "Access live video streams with end-to-end encryption for maximum privacy.",
      color: "blue",
    },
    {
      icon: AlertTriangle,
      title: "Intelligent Threat Detection",
      text: "Our AI identifies potential safety threats, like unauthorized individuals or unusual activity.",
      color: "yellow",
    },
    {
      icon: Bell,
      title: "Real-Time Alerts",
      text: "Receive immediate notifications on your device if unusual activity is detected.",
      color: "red",
    },
    {
      icon: Cloud,
      title: "Seamless Cloud Integration",
      text: "Powered by AWS for a smooth, secure, and dependable experience.",
      color: "green",
    },
    {
      icon: Monitor,
      title: "Intuitive Web Interface",
      text: "Monitor from anywhere through our secure web platform on desktop and mobile.",
      color: "purple",
    },
    {
      icon: Settings,
      title: "Customizable Settings",
      text: "Tailor KidSecure with customizable settings for alerts, privacy zones, and permissions.",
      color: "gray",
    },
  ];
  const { isAuthenticated: isAuthenticatedUser } = useSelector(
    (state) => state.user
  );
  const { isAuthenticated: isAuthenticatedParent } = useSelector(
    (state) => state.parent
  );
  return (
    <>
      {/* Main Hero Section */}
      <motion.main
        id="main-content" // For potential direct linking
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="max-w-3xl text-center space-y-8">
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"
          >
            Peace of Mind, Always in Sight
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed"
          >
            In a world where your child's safety is your utmost priority,
            KidSecure offers a new level of intelligent protection. Our
            AI-powered system utilizes advanced facial recognition technology to
            provide you with real-time monitoring and swift emergency response
            capabilities, all within a secure and user-friendly platform.
          </motion.p>
          <motion.div variants={itemVariants} className="space-y-6 pt-4">
            <h4 className="text-2xl sm:text-3xl font-semibold text-white">
              Welcome to KidSecure
            </h4>
            {isAuthenticatedUser || isAuthenticatedParent ? (
              ""
            ) : (
              <div className="flex justify-center">
                <Button
                  onClick={() => navigateTo("login")}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-blue-500/50
                                           hover:scale-105 transition-all duration-300 text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-4
                                           flex items-center justify-center gap-3 rounded-lg"
                >
                  <KeyRound className="w-6 h-6 sm:w-7 sm:h-7" />
                  Login/Register
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.main>

      {/* About Section */}
      <section
        id="about-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
            About KidSecure
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            KidSecure is dedicated to providing state-of-the-art AI-powered
            safety solutions for children. Our mission is to empower parents and
            guardians with tools that offer peace of mind through intelligent
            monitoring and rapid response. We believe in leveraging technology
            responsibly to create safer environments for the youngest members of
            our society.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-12 sm:mb-16">
            <h3
              className="text-3xl sm:text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 relative z-10 max-w-2xl mx-auto"
              style={{
                letterSpacing: "1px",
                textShadow: "1px 1px 6px rgba(0,0,0,0.3)",
              }}
            >
              Key Features
            </h3>
            <p className="text-gray-300 text-center mt-4 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Here's a closer look at the powerful features KidSecure provides
              to keep your children safe.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 hover:border-${feature.color}-500/30 hover:shadow-${feature.color}-500/20 transition-all duration-300 flex flex-col justify-between h-full hover:scale-105`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 bg-${feature.color}-500/20 rounded-lg`}
                    >
                      <feature.icon
                        className={`w-8 h-8 text-${feature.color}-400`}
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-100">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-6">
            Pricing
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Details about our pricing plans will be available soon. We aim to
            offer flexible options to suit your family's needs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-section"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 mb-6">
            Contact Us
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Have questions? We'd love to hear from you. Reach out to our support
            team at support@kidsecure.example.com or call us at (555) KID-SAFE.
          </p>
        </div>
      </section>
    </>
  );
};

export default OverviewPage;
