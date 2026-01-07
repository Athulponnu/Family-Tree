import { useEffect, useState } from "react";
import { getMyProfile, updateBio } from "../api/users";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setUser(res.data);
        setBio(res.data.bio || "");
      })
      .finally(() => setLoading(false));
  }, []);

  const saveBio = async () => {
    try {
      setSaving(true);
      await updateBio(bio);
      setUser({ ...user, bio });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (!user) return <p className="mt-10 text-center">Profile not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded p-6 space-y-4">
      <h2 className="text-2xl font-semibold">My Profile</h2>

      <p><b>ID:</b> {user.id}</p>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>

      <div>
        <label className="block font-semibold mb-1">Bio</label>

        {editing ? (
          <>
            <textarea
              className="w-full border rounded p-2"
              rows={4}
              maxLength={500}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              {bio.length}/500 characters
            </p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={saveBio}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setBio(user.bio || "");
                  setEditing(false);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700">
              {user.bio ? user.bio : "No bio added yet"}
            </p>

            <button
              onClick={() => setEditing(true)}
              className="mt-2 text-blue-600 hover:underline"
            >
              Edit Bio
            </button>
          </>
        )}
      </div>
    </div>
  );
}
