import { useState } from "react";
import { createFamily } from "../api/families";

export default function CreateFamily() {
  const [name, setName] = useState("");

  const submit = async () => {
    await createFamily(name);
    alert("Family created");
  };

  return (
    <div>
      <h2>Create Family</h2>
      <input placeholder="Family Name" onChange={e => setName(e.target.value)} />
      <button onClick={submit}>Create</button>
    </div>
  );
}
