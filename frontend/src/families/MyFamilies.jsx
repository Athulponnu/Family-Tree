import { useEffect, useState } from "react";
import { fetchFamilies } from "../api/families";
import { Link, useNavigate } from "react-router-dom";

export default function MyFamilies() {
  const [families, setFamilies] = useState([]);
  const [inviteToken, setInviteToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFamilies().then((res) => setFamilies(res.data));
  }, []);

  const joinFamily = () => {
    if (!inviteToken.trim()) {
      alert("Enter invite token");
      return;
    }
    navigate(`/families/join/${inviteToken}`);
  };

  return (
    <div>
      <h2>My Families</h2>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/families/create">➕ Create Family</Link>
      </div>

      {/* JOIN FAMILY SECTION */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Join Family</h4>
        <input
          placeholder="Paste invite token"
          value={inviteToken}
          onChange={(e) => setInviteToken(e.target.value)}
        />
        <button onClick={joinFamily}>Join</button>
      </div>

      {/* FAMILY LIST */}
      <ul>
        {families.map((f) => (
          <li key={f.id}>
            {f.family_name}
            {"  "}
            <Link to={`/families/${f.id}/invite`}>Invite</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
