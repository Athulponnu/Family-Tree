import { useState } from "react";
import { createFamily } from "../api/families";

export default function CreateFamily() {
  const [name, setName] = useState("");

  const submit = async () => {
    try {
      await createFamily(name);
      alert("Family created");
    } catch (err) {
      const msg = err?.response?.data || err.message;
      alert("Failed to create family: " + JSON.stringify(msg));
      console.error("Create family error:", err);
    }
  };

  return (
    <div>
      <h2>Create Family</h2>
      <input value={name} placeholder="Family Name" onChange={e => setName(e.target.value)} />
      <button onClick={submit}>Create</button>
    </div>
  );
}
