import { useState } from "react";
import { createFamilyApi } from "../api/families";
import { useNavigate } from "react-router-dom";

export default function CreateFamily() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createFamilyApi(name);
    navigate("/families");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Family
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Family Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter family name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg
                     font-medium hover:bg-blue-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name.trim()}
        >
          Create Family
        </button>
      </form>
    </div>
  );
}
