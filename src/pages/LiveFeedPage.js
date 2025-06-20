// src/pages/LiveFeedPage.js
import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { itemVariants, pageTransitionVariants } from "../animations/variants";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

const LiveFeedPage = ({ navigateTo }) => {
  const { parent } = useSelector((state) => state.parent);
  return (
    <motion.div
      key="liveFeedPage"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center"
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-8"
      >
        Live Feed
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="w-full max-w-3xl aspect-video bg-black/50 backdrop-blur-sm rounded-xl shadow-2xl mb-8 flex items-center justify-center border border-gray-700"
      >
        <img
          src={`${process.env.REACT_APP_STREAM_IP}/video_feed?target_name=${
            parent?.children.length > 0 ? parent?.children[0]?.name : ""
          }`}
          alt="Live Stream"
          style={{
            width: "100%",
            maxWidth: "600px",
            border: "1px solid #ccc",
          }}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Button
          onClick={() => navigateTo("profile")}
          className="bg-transparent border border-pink-400 text-pink-300 hover:bg-pink-400/20 transition-all duration-300 text-md px-6 py-2 flex items-center justify-center gap-2 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Profile
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default LiveFeedPage;
