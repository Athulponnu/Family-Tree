import { useEffect, useState } from "react";
import { getFamilyTree, kickMember } from "../../services/familyService";
import TreeNode from "./TreeNode";

export default function FamilyTree({ familyId }) {
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔴 kick-member modal state
  const [kickTarget, setKickTarget] = useState(null);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    setLoading(true);
    getFamilyTree(familyId)
      .then(setTree)
      .finally(() => setLoading(false));
  }, [familyId]);

  if (loading) return <p>Loading family tree...</p>;
  if (!tree) return <p>No data</p>;

  /**
   * 🔐 Determine if CURRENT USER is an ELDER
   * We detect ELDER by matching primary family role
   */
  const isCurrentUserElder = tree.nodes.some(
    (n) =>
      n.primary_membership.family_id === tree.family.id &&
      n.primary_membership.role === "ELDER"
  );

  const confirmKick = async () => {
    try {
      await kickMember(familyId, kickTarget.user_id);

      setTree((prev) => ({
        ...prev,
        nodes: prev.nodes.filter(
          (n) => n.user_id !== kickTarget.user_id
        ),
      }));

      setKickTarget(null);
      setConfirmText("");
    } catch (err) {
      alert("You are not allowed to remove this member");
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
        {tree.family.name} Family Tree
      </h2>

      {tree.nodes.map((node) => (
        <TreeNode
          key={node.user_id}
          node={node}
          canRemove={
            isCurrentUserElder &&
            node.primary_membership.role !== "ELDER"
          }
          onRemove={() => {
            setKickTarget(node);
            setConfirmText("");
          }}
        />
      ))}

      {/* 🔥 REMOVE CONFIRMATION MODAL */}
      {kickTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "420px",
              padding: "20px",
            }}
          >
            <h3 style={{ color: "#dc2626", marginBottom: "8px" }}>
              Remove Member
            </h3>

            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
              This will remove <strong>{kickTarget.name}</strong> from
              the family. This action cannot be undone.
            </p>

            <label style={{ fontSize: "13px", fontWeight: 500 }}>
              Type <code>remove/user</code> to confirm
            </label>

            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="remove/user"
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "16px",
              }}
            >
              <button onClick={() => setKickTarget(null)}>
                Cancel
              </button>

              <button
                disabled={confirmText !== "remove/user"}
                onClick={confirmKick}
                style={{
                  background:
                    confirmText === "remove/user"
                      ? "#dc2626"
                      : "#fca5a5",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor:
                    confirmText === "remove/user"
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
