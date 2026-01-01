import { useState } from "react";
import { joinFamily } from "../api/families";

export default function JoinFamily() {
  const [token, setToken] = useState("");

  const join = async () => {
    await joinFamily(token);
    alert("Joined family successfully");
  };

  return (
    <div>
      <h3>Join Family</h3>

      <input
        placeholder="Invite Token"
        value={token}
        onChange={e => setToken(e.target.value)}
      />

      <button onClick={join}>Join</button>
    </div>
  );
}
