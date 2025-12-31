import Login from "./auth/Login";
import Register from "./auth/Register";
import CreateFamily from "./families/createFamily";

export default function App() {
  return (
    <>
      <Register />
      <Login />
      <CreateFamily />
    </>
  );
}
