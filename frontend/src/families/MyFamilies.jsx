import { useEffect, useState } from "react";
import { fetchFamilies } from "../api/families";
import { Link, useNavigate } from "react-router-dom";
import FamilyTree from "../components/tree/FamilyTree";

export default function MyFamilies() {
  const [families, setFamilies] = useState([]);
  const [inviteToken, setInviteToken] = useState("");
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFamilies().then((res) => setFamilies(res.data));
  }, []);

  const joinFamily = () => {
    if (!inviteToken.trim()) return;
    navigate(`/families/join/${inviteToken.trim()}`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            My Families
          </h2>
          <Link
            to="/families/create"
            className="bg-green-600 text-white px-4 py-2 rounded-lg
                       font-medium hover:bg-green-700 transition"
          >
            + Create Family
          </Link>
        </div>

        {/* JOIN FAMILY */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h4 className="text-lg font-medium text-gray-700">
            Join Family
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={inviteToken}
              onChange={(e) => setInviteToken(e.target.value)}
              placeholder="Paste invite token"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={joinFamily}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg
                         font-medium hover:bg-blue-700 transition"
            >
              Join
            </button>
          </div>
        </div>

        {/* FAMILY LIST */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-700">
            Your Families
          </h3>

          {families.length === 0 ? (
            <p className="text-gray-500 text-center">
              You are not part of any families yet.
            </p>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {families.map((f) => (
                <li
                  key={f.id}
                  onClick={() => setSelectedFamilyId(f.id)}
                  className={`border rounded-lg p-4 cursor-pointer
                    flex items-center justify-between transition
                    ${
                      selectedFamilyId === f.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <span className="font-medium text-gray-800">
                    {f.family_name}
                  </span>

                  <Link
                    to={`/families/${f.id}/invite`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Invite
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* FAMILY TREE */}
        {selectedFamilyId && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <FamilyTree familyId={selectedFamilyId} />
          </div>
        )}
      </div>
    </div>
  );
}
