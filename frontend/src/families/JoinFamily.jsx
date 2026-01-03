import { useParams, useNavigate } from "react-router-dom";
import { joinFamilyApi } from "../api/families";

export default function JoinFamily() {
  const { token } = useParams();
  const navigate = useNavigate();

  const join = async () => {
    try {
      await joinFamilyApi(token);
      alert("Joined family successfully");
      navigate("/families");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to join family");
    }
  };

  return (
    <div>
      <h2>Join Family</h2>
      <p>Invite Token: <b>{token}</b></p>
      <button onClick={join}>Join Family</button>
    </div>
  );
}
