import React from "react";
import { useParams } from "react-router-dom";
import { useVerifiyParentQuery } from "../redux/services/apiSlice";

const VerifiedParentEmail = () => {
  const { id } = useParams();
  const { isLoading, isError } = useVerifiyParentQuery(id);

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
        <div className="text-red-600">
          حدث خطأ أثناء التحقق من البريد الإلكتروني.
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          تم التحقق من بريدك الإلكتروني ✅
        </h1>
        <p className="text-gray-700 mb-6">
          شكراً لتأكيد بريدك الإلكتروني. يمكنك الآن الاستمتاع بكامل مزايا
          الموقع.
        </p>
        <a
          href="/login"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          تسجيل الدخول
        </a>
      </div>
    </div>
  );
};

export default VerifiedParentEmail;
