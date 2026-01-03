import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MyFamilies from "./families/MyFamilies";
import CreateFamily from "./families/CreateFamily";
import InviteMember from "./families/InviteMember";
import JoinFamily from "./families/JoinFamily";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/families"
        element={
          <ProtectedRoute>
            <MyFamilies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/families/create"
        element={
          <ProtectedRoute>
            <CreateFamily />
          </ProtectedRoute>
        }
      />
      <Route
        path="/families/:id/invite"
        element={
          <ProtectedRoute>
            <InviteMember />
          </ProtectedRoute>
        }
      />
      <Route
        path="/families/join/:token"
        element={
          <ProtectedRoute>
            <JoinFamily />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/families" />} />
    </Routes>
  );
}
