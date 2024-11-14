import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">
        Inicio
      </Link>
      <div className="space-x-4">
        {token ? (
          <LogoutButton/>
        ) : (
          <Link to="/login" className="text-blue-500">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
