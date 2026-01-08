import Badge from "./Badge";

export default function TreeNode({ node }) {
  const { name, primary_membership, secondary_memberships, profile } = node;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      <h4>{name}</h4>

      {/* Primary badges */}
      <div style={{ marginBottom: "6px" }}>
        <Badge text={primary_membership.family_name} />
        <Badge text={primary_membership.role} />
        <Badge text={primary_membership.relation} />
      </div>

      {/* Secondary family badges */}
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

      {/* Profile info */}
      <div style={{ marginTop: "8px", fontSize: "13px" }}>
        {profile.bio && <div>Bio: {profile.bio}</div>}
        {profile.email && <div>Email: {profile.email}</div>}
      </div>
    </div>
  );
}
