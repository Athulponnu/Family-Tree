import CreateFamily from "./families/createFamily";
import JoinFamily from "./families/JoinFamily";
import InviteMember from "./families/InviteMember";

export default function App() {
  return (
    <div>
      <CreateFamily />
      <JoinFamily />

      {/* Replace 1 with actual family ID */}
      <InviteMember familyId={1} />
    </div>
  );
}
