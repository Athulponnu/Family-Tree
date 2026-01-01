import { useState } from "react";
import { inviteMember } from "../api/families";

export default function InviteMember({ familyId }) {
  const [role, setRole] = useState("MEMBER");
  const [token, setToken] = useState("");

  const generateInvite = async () => {
    const res = await inviteMember(familyId, role);
    setToken(res.data.invite_token);
  };

  return (
    <div>
      <h3>Invite Member</h3>

      <select onChange={e => setRole(e.target.value)}>
        <option value="MEMBER">Member</option>
        <option value="ELDER">Elder</option>
      </select>

      <button onClick={generateInvite}>Generate Invite</button>

      {token && (
        <p>
          Invite Token: <b>{token}</b>
        </p>
      )}
    </div>
  );
}
