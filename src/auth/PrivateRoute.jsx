import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the import based on your file structure

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
