import { useEffect, useState } from "react";
import { getMyFamilies } from "../api/families";

export default function MyFamilies() {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    getMyFamilies().then(res => setFamilies(res.data));
  }, []);

  return (
    <div>
      <h2>My Families</h2>
      <ul>
        {families.map(f => (
          <li key={f.id}>{f.family_name}</li>
        ))}
      </ul>
    </div>
  );
}
