import { useParams } from "react-router-dom";
import { joinFamilyApi } from "../api/families";

export default function JoinFamily() {
  const { token } = useParams();

  const join = async () => {
    await joinFamilyApi(token);
    alert("Joined family successfully");
  };

  return <button onClick={join}>Join Family</button>;
}
