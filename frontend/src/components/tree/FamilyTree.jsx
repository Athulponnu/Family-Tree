import { useEffect, useState } from "react";
import { getFamilyTree } from "../../services/familyService";
import TreeNode from "./TreeNode";

export default function FamilyTree({ familyId }) {
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFamilyTree(familyId)
      .then(setTree)
      .finally(() => setLoading(false));
  }, [familyId]);

  if (loading) return <p>Loading family tree...</p>;
  if (!tree) return <p>No data</p>;

  return (
    <div>
      <h2>{tree.family.name} Family Tree</h2>

      {tree.nodes.map((node) => (
        <TreeNode key={node.user_id} node={node} />
      ))}
    </div>
  );
}
