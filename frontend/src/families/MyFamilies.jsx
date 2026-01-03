import { useEffect, useState } from "react";
import { fetchFamilies } from "../api/families";
import { Link } from "react-router-dom";

export default function MyFamilies() {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    fetchFamilies().then((res) => setFamilies(res.data));
  }, []);

  return (
    <div>
      <h2>My Families</h2>
      <Link to="/families/create">Create Family</Link>
      <ul>
        {families.map((f) => (
          <li key={f.id}>
            {f.family_name}
            <Link to={`/families/${f.id}/invite`}> Invite</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
