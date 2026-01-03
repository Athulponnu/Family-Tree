import { useParams } from "react-router-dom";
import { inviteMemberApi } from "../api/families";
import { useState } from "react";

export default function InviteMember() {
  const { id } = useParams();
  const [token, setToken] = useState("");

  const invite = async () => {
    const res = await inviteMemberApi(id, "Member");
    setToken(res.data.invite_token);
  };

  return (
    <div>
      <button onClick={invite}>Generate Invite</button>
      {token && <p>Invite Token: {token}</p>}
    </div>
  );
}
