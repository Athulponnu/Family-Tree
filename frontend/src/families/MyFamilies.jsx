import { useEffect, useState } from "react";
import { fetchFamilies } from "../api/families";
import { removeFamily } from "../services/familyService";
import { Link, useNavigate } from "react-router-dom";
import FamilyTree from "../components/tree/FamilyTree";

export default function MyFamilies() {
  const [families, setFamilies] = useState([]);
  const [inviteToken, setInviteToken] = useState("");
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);

  // 🔴 GitHub-style delete state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirmText, setConfirmText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchFamilies().then((res) => setFamilies(res.data));
  }, []);

  const confirmDelete = async () => {
    try {
      await removeFamily(deleteTarget.id);

      setFamilies((prev) =>
        prev.filter((f) => f.id !== deleteTarget.id)
      );

      if (selectedFamilyId === deleteTarget.id) {
        setSelectedFamilyId(null);
      }

      setDeleteTarget(null);
      setConfirmText("");
    } catch (err) {
      alert("You are not allowed to delete this family");
    }
  };

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

                  <div className="flex gap-3">
                    <Link
                      to={`/families/${f.id}/invite`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Invite
                    </Link>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(f);
                        setConfirmText("");
                      }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
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

      {/* 🔥 DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-red-600">
              Delete Family
            </h3>

            <p className="text-sm text-gray-700">
              This action <strong>cannot be undone</strong>.
              This will permanently delete{" "}
              <strong>{deleteTarget.family_name}</strong>.
            </p>

            <label className="text-sm font-medium text-gray-700">
              Type <span className="font-mono bg-gray-100 px-1">
                family/delete
              </span>{" "}
              to confirm
            </label>

            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full border rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="family/delete"
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border
                           text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                disabled={confirmText !== "family/delete"}
                onClick={confirmDelete}
                className={`px-4 py-2 rounded-lg text-white
                  ${
                    confirmText === "family/delete"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-300 cursor-not-allowed"
                  }`}
              >
                I understand, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
