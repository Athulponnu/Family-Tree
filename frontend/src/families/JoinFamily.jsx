import { useParams, useNavigate } from "react-router-dom";
import { joinFamilyApi } from "../api/families";
import { useState } from "react";

export default function JoinFamily() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const join = async () => {
    try {
      setLoading(true);
      setError("");
      await joinFamilyApi(token);
      navigate("/families");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to join family");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Join Family
        </h2>

        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 break-all">
          <span className="font-medium">Invite Token:</span>
          <div className="mt-1 font-mono text-gray-900">{token}</div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
            {error}
          </div>
        )}

        <button
          onClick={join}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg
                     font-medium hover:bg-green-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Joining..." : "Join Family"}
        </button>

        <button
          onClick={() => navigate("/families")}
          className="w-full text-sm text-gray-600 hover:text-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
