import { useEffect, useState } from "react";
import { getMyProfile } from "../api/users";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then((res) => setUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="mt-10 text-center">Loading...</p>;
  }

  if (!user) {
    return <p className="mt-10 text-center">Profile not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-8">
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>
    </div>
  );
}
