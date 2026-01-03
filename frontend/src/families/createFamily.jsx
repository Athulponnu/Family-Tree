import { useState } from "react";
import { createFamilyApi } from "../api/families";
import { useNavigate } from "react-router-dom";

export default function CreateFamily() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await createFamilyApi(name);
    navigate("/families");
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Family</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <button>Create</button>
    </form>
  );
}
