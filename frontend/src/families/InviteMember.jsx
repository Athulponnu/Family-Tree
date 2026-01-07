import { useParams, useNavigate } from "react-router-dom";
import { inviteMemberApi } from "../api/families";
import { useState } from "react";

export default function InviteMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const invite = async () => {
    try {
      setLoading(true);
      const res = await inviteMemberApi(id, "Member");
      setToken(res.data.invite_token);
    } finally {
      setLoading(false);
    }
  };

  const copyToken = async () => {
    await navigator.clipboard.writeText(token);
    alert("Invite token copied");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Invite Member
        </h2>

        <button
          onClick={invite}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg
                     font-medium hover:bg-blue-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Invite Token"}
        </button>

        {token && (
          <div className="space-y-3">
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-800 break-all font-mono">
              {token}
            </div>

            <button
              onClick={copyToken}
              className="w-full border border-gray-300 py-2 rounded-lg
                         text-gray-700 hover:bg-gray-100 transition"
            >
              Copy Token
            </button>
          </div>
        )}

        <button
          onClick={() => navigate("/families")}
          className="w-full text-sm text-gray-600 hover:text-gray-800 transition"
        >
          Back to Families
        </button>
      </div>
    </div>
  );
}
