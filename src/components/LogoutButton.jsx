import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    if (isAuthenticated) logout();
    navigate("/login");
  };
  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated && user ? (
        <p className="text-lg font-semibold">¡Hola, {user.name}!</p>
      ) : null}
      <button onClick={handleLogout} className="text-red-500 mt-0">
        Cerrar sesión
      </button>
    </div>
  );
};
export default LogoutButton;
