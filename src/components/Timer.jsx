import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { itemVariants } from "../animations/variants";

const Timer = ({ childData }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  console.log(childData);
  useEffect(() => {
    if (!childData?.isInside) return;

    const entry = new Date(childData.entryTime);
    const endTime = new Date(entry.getTime() + childData.duration * 60000);

    const updateTime = () => {
      const now = new Date();
      const diff = Math.max(0, Math.floor((endTime - now) / 1000)); // بالثواني
      setTimeLeft(diff);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [childData]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white/10 backdrop-blur-md p-3 rounded-lg shadow-lg text-center min-w-[140px]"
    >
      <div className="flex items-center justify-center text-sm text-cyan-300 mb-1">
        <Clock className="w-4 h-4 mr-2" />
        Time in Area
      </div>
      <div className="text-2xl font-bold text-white">
        {formatTime(timeLeft)}
      </div>
      {timeLeft === 0 && (
        <>
          <p className="text-xs text-red-400 mt-1">Time's up!</p>
          <p className="text-xs text-yellow-400 mt-1">
            الوقت انتهى، يُرجى إخراجه.
          </p>
        </>
      )}
    </motion.div>
  );
};

export default Timer;
