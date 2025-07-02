// src/pages/ProfilePage.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { itemVariants, pageTransitionVariants } from "../animations/variants";
import {
  Users,
  UserPlus,
  Video,
  Home,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/feature/userSlice";
import { logoutParent } from "../redux/feature/parentSlice";
import Timer from "../components/Timer";

const ProfilePage = ({ navigateTo }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [showReadings, setShowReadings] = useState(false);
  //const TEMPERATURE_ALERT_THRESHOLD = 30;
  const [isTemperatureAlertOpen, setIsTemperatureAlertOpen] = useState(false);
  const { parent, isLoading } = useSelector((state) => state.parent); // Assuming parent data is stored in Redux
  const dispatch = useDispatch();
  const [isMQTAlertOpen, setIsMQTAlertOpen] = useState(false);

  /* iot */

  const [environmentalData, setEnvironmentalData] = useState({
    temperature: "--",
    humidity: "--",
    mq2: "--",
  });

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    ws.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      setEnvironmentalData(incomingData);
    };

    ws.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };

    return () => ws.close();
  }, []);

  /* end iot */

  /*   useEffect(() => {
    const tempInterval = setInterval(() => {
      const newTemp = Math.floor(Math.random() * (35 - 18 + 1)) + 18;
      setCurrentTemperature(newTemp);
      if (newTemp > TEMPERATURE_ALERT_THRESHOLD && !hasAlertBeenShown) {
        setIsTemperatureAlertOpen(true);
        setHasAlertBeenShown(true);
      } else if (newTemp <= TEMPERATURE_ALERT_THRESHOLD && hasAlertBeenShown) {
        setHasAlertBeenShown(false);
      }
    }, 5000);
    return () => clearInterval(tempInterval);
  }, [hasAlertBeenShown]); */

  /*   useEffect(() => {
    if (environmentalData.temperature >= "30") setHasAlertBeenShown(true);
  }, [environmentalData.temperature]); */
  useEffect(() => {
    setInterval(() => {
      if (
        environmentalData.temperature >=
        process.env.REACT_APP_TEMPERATURE_ALERT_THRESHOLD
      ) {
        setIsTemperatureAlertOpen(true);
      }
    }, 8000);
  }, [environmentalData.temperature]);

  useEffect(() => {
    setInterval(() => {
      if (environmentalData.mq2 >= process.env.REACT_APP_MQT_ALERT_THRESHOLD) {
        setIsMQTAlertOpen(true);
      }
    }, 12000);
  }, [environmentalData.mq2]);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);
  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(logoutParent());
    window.location.href = "/"; // Redirect to login page
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-300">Loading...</p>
      </div>
    );
  }
  if (!parent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-300">No parent data found.</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        key="profilePage"
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="w-full max-w-2xl flex justify-between items-start mb-10">
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 text-left"
          >
            My Profile
          </motion.h2>
          <div className="flex gap-2">
            {parent.children?.length &&
              parent.children.map((child) => <Timer childData={child} />)}
          </div>
        </div>
        <motion.section
          variants={itemVariants}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-cyan-400" />
            My Children
          </h3>
          <div className="space-y-4">
            {parent.children?.length > 0 ? (
              parent.children.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg hover:bg-gray-600/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={child.photo}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <div>
                      <p className="text-lg font-medium text-white">
                        {child.name}
                      </p>
                      <p className="text-sm text-gray-300">{child.status}</p>
                    </div>
                  </div>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-3 py-1 rounded-md">
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">
                No children added yet.
              </p>
            )}
          </div>
          <Button
            onClick={() => navigateTo("addChild", { fromPage: "profile" })}
            className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 text-md py-2.5 flex items-center justify-center gap-2 rounded-lg"
          >
            <UserPlus className="w-5 h-5" /> Add Child
          </Button>
        </motion.section>
        <motion.section
          variants={itemVariants}
          className="w-full max-w-2xl space-y-4 text-center mb-8"
        >
          <Button
            onClick={() => navigateTo("liveFeed")}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 text-lg py-3 flex items-center justify-center gap-3 rounded-lg"
          >
            <Video className="w-6 h-6" /> View Live Feed
          </Button>
          <Button
            onClick={() => setShowReadings((prev) => !prev)}
            className="w-full bg-transparent border border-teal-500 text-teal-300 hover:bg-teal-500/20 transition-all duration-300 text-md py-3 flex items-center justify-center gap-2 rounded-lg"
          >
            <Thermometer className="w-5 h-5" /> {showReadings ? "Hide" : "View"}{" "}
            Environmental Readings
          </Button>
          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 text-md py-3 flex items-center justify-center gap-2 rounded-lg"
          >
            <LogOut className="w-5 h-5" /> Logout
          </Button>
        </motion.section>
        {showReadings && (
          <motion.section
            key="envReadings"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { duration: 0.4 },
            }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
            className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl overflow-hidden"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-6 flex items-center gap-3">
              <Thermometer className="w-8 h-8 text-teal-400" />
              Environmental Readings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div
                className={`bg-gray-700/50 p-4 rounded-lg ${
                  environmentalData.temperature >
                  process.env.REACT_APP_TEMPERATURE_ALERT_THRESHOLD
                    ? "border-2 border-red-500"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center text-teal-300 mb-2">
                  <Thermometer className="w-6 h-6 mr-2" />
                  <h4 className="text-lg font-medium">Temperature</h4>
                </div>
                <p
                  className={`text-2xl font-semibold ${
                    environmentalData.temperature >
                    process.env.REACT_APP_TEMPERATURE_ALERT_THRESHOLD
                      ? "text-red-400 animate-pulse"
                      : "text-white"
                  }`}
                >
                  {environmentalData.temperature}
                </p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-center text-blue-300 mb-2">
                  <Droplets className="w-6 h-6 mr-2" />
                  <h4 className="text-lg font-medium">Humidity</h4>
                </div>
                <p className="text-2xl text-white font-semibold">
                  {environmentalData.humidity}
                </p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-center text-green-300 mb-2">
                  <Wind className="w-6 h-6 mr-2" />
                  <h4 className="text-lg font-medium">Air Quality (MQ2)</h4>
                </div>
                <p className="text-2xl text-white font-semibold">
                  {environmentalData.mq2}
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </motion.div>
      <Modal
        isOpen={isTemperatureAlertOpen}
        onClose={() => setIsTemperatureAlertOpen(false)}
        title={
          <span className="flex items-center text-red-400">
            <AlertTriangle className="w-7 h-7 mr-3" />
            High Temperature Alert!
          </span>
        }
      >
        <div className="text-center">
          <p className="text-lg text-gray-200 mb-2">
            Current temperature is{" "}
            <strong className="text-red-400">
              {environmentalData.temperature}°C
            </strong>
            , above safety threshold of{" "}
            {process.env.REACT_APP_TEMPERATURE_ALERT_THRESHOLD}°C.
          </p>
          <p className="text-md text-gray-300 mb-6">
            Please check the environment immediately.
          </p>
          <Button
            onClick={() => setIsTemperatureAlertOpen(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2"
          >
            Acknowledge
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isMQTAlertOpen}
        onClose={() => setIsMQTAlertOpen(false)}
        title={
          <span className="flex items-center text-red-400">
            <AlertTriangle className="w-7 h-7 mr-3" />
            Air Quality Alert!
          </span>
        }
      >
        <div className="text-center">
          <p className="text-lg text-gray-200 mb-2">
            Current Air Quality is{" "}
            <strong className="text-red-400">{environmentalData.mq2}°C</strong>,
            above safety threshold of{" "}
            {process.env.REACT_APP_MQT_ALERT_THRESHOLD}.
          </p>
          <p className="text-md text-gray-300 mb-6">
            Please check the environment immediately.
          </p>
          <Button
            onClick={() => setIsTemperatureAlertOpen(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2"
          >
            Acknowledge
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ProfilePage;
