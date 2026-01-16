import Badge from "./Badge";

export default function TreeNode({ node, canRemove, onRemove }) {
  const {
    name,
    primary_membership,
    secondary_memberships,
    profile,
  } = node;

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      {/* 🔴 REMOVE BUTTON */}
      {canRemove && (
        <button
          onClick={onRemove}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "none",
            border: "none",
            color: "#dc2626",
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Remove
        </button>
      )}

      <h4>{name}</h4>

      <div style={{ marginBottom: "6px" }}>
        <Badge text={primary_membership.family_name} />
        <Badge text={primary_membership.role} />
        {primary_membership.relation && (
          <Badge text={primary_membership.relation} />
        )}
      </div>

      {secondary_memberships.length > 0 && (
        <div style={{ fontSize: "13px", color: "#555" }}>
          Also connected to:
          <div style={{ marginTop: "4px" }}>
            {secondary_memberships.map((m) => (
              <Badge
                key={m.family_id}
                text={`${m.family_name} • ${m.relation}`}
              />
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "8px", fontSize: "13px" }}>
        {profile.bio && <div>Bio: {profile.bio}</div>}
        {profile.email && <div>Email: {profile.email}</div>}
      </div>
    </div>
  );
}
