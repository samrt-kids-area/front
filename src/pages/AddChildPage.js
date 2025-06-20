// src/pages/AddChildPage.js
import React, { useState, useEffect, useRef } from "react";
import {
  motion, // Removed AnimatePresence as it's not used here
} from "framer-motion";
import Button from "../components/Button";
import { itemVariants, pageTransitionVariants } from "../animations/variants";
import {
  Camera,
  Save,
  RotateCcw,
  ImageOff,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAddChildrenMutation } from "../redux/services/apiSlice";
import axios from "axios";

const AddChildPage = ({ navigateTo, context }) => {
  const [childName, setChildName] = useState("");
  const [imageSrc, setImageSrc] = useState(null); // Stores captured image data URL (e.g., "data:image/png;base64,...")
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false); // For loading state on save button
  const { parent } = useSelector((state) => state.parent);
  const [addChildren, { isLoading }] = useAddChildrenMutation();
  const [isLoadingParent, setIsLoadingParent] = useState(false);
  const [imageBlob, setImageBlob] = useState(null); // To store the captured image as a Blob
  const startCamera = async () => {
    /* ... same as before ... */ setImageSrc(null);
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      console.error("Cam err:", err);
      setCameraError("Cam access denied/failed.");
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        setStream(null);
      }
    }
  };
  useEffect(() => {
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    }; /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  const capturePhoto = () => {
    /* ... same as before ... */ if (
      videoRef.current &&
      canvasRef.current &&
      stream
    ) {
      const v = videoRef.current,
        c = canvasRef.current;
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
      setImageSrc(c.toDataURL("image/png"));
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
      c.toBlob((blob) => {
        setImageBlob(blob); // حفظ الصورة كـ Blob
      }, "image/png");
    }
  };
  const retakePhoto = () => {
    /* ... same as before ... */ setImageSrc(null);
    startCamera();
  };

  const handleSaveChild = async () => {
    const payload = {
      name: childName,
      imageSrc: imageSrc, // Send the full data URL, backend will strip prefix
      parentId: parent?._id || "default_parent_if_not_admin", // Pass parentId from context
      // Adjust "default_parent_if_not_admin" or handle on backend
      // if adding from parent's profile
    };

    setIsLoadingParent(true);
    try {
      const registerForm = new FormData();
      registerForm.append("image", imageSrc ? imageBlob : null); // Use Blob for image
      registerForm.append("childName", childName); // تأكد أن "name" موجود في الفورم
      registerForm.append("parentId", parent._id);

      const resData = await axios.post(
        `${process.env.REACT_APP_BASE_URL_REGISTER_CHILD}/register-child`,
        registerForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const formData = new FormData();
      formData.append("name", childName);
      formData.append("photo", imageSrc ? imageBlob : null); // Strip the data URL prefix
      formData.append("encoding", JSON.parse(resData.data.data));

      const resPhoto = await addChildren({
        body: formData,
        id: parent._id,
      });

      if ("error" in resPhoto) {
        return toast.error(resPhoto.error.data.message);
      }

      if ("data" in resPhoto) {
        toast.success("Child registered successfully");
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
      setIsLoadingParent(false);
    } finally {
      setIsLoadingParent(false);
    }
  };

  const handleBack = () => {
    /* ... same as before ... */ if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    navigateTo(context?.fromPage || "profile");
  };

  return (
    <motion.div
      key="addChildPage"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-8 text-center"
      >
        Add New Child
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="w-full max-w-lg bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
      >
        <div>
          <label
            htmlFor="childName"
            className="block text-sm font-medium text-gray-200 text-left mb-1"
          >
            Child's Name
          </label>
          <input
            type="text"
            name="childName"
            id="childName"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="block w-full rounded-md border-gray-600 bg-gray-700/50 p-3 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            placeholder="Enter child's name"
          />
        </div>
        <div className="camera-container aspect-video w-full bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center relative border border-gray-600">
          {cameraError && !imageSrc && (
            <div className="text-center text-red-400 p-4">
              <ImageOff className="w-16 h-16 mx-auto mb-2" />
              <p>{cameraError}</p>
              <Button
                onClick={startCamera}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
              >
                Try Again
              </Button>
            </div>
          )}
          {!imageSrc && !cameraError && stream && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              muted
            ></video>
          )}
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Captured child"
              className="w-full h-full object-contain"
            />
          )}
          {!stream && !imageSrc && !cameraError && (
            <div className="text-center text-gray-400 p-4">
              <Loader2 className="w-12 h-12 mx-auto animate-spin mb-2" />
              <p>Initializing camera...</p>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {!imageSrc && stream && (
            <Button
              onClick={capturePhoto}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 text-md py-2.5 flex items-center justify-center gap-2 rounded-lg"
            >
              <Camera className="w-5 h-5" />
              Capture Photo
            </Button>
          )}
          {imageSrc && (
            <Button
              onClick={retakePhoto}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300 text-md py-2.5 flex items-center justify-center gap-2 rounded-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Photo
            </Button>
          )}
        </div>
        <Button
          onClick={handleSaveChild}
          disabled={!childName.trim() || !imageSrc || isSaving}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 text-lg py-3 flex items-center justify-center gap-3 rounded-lg disabled:opacity-60"
        >
          {isSaving ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Save className="w-6 h-6" />
          )}
          {isLoadingParent ? "Saving..." : "Save Child"}
        </Button>
        <Button
          onClick={handleBack}
          className="w-full bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-500/20 transition-all duration-300 text-md py-3 flex items-center justify-center gap-2 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
      </motion.div>
    </motion.div>
  );
};
export default AddChildPage;
