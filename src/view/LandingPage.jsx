import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const token = useSelector(state => state.auth.token)
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenidos a SaldoAR</h1>
        <p className="text-gray-600 text-lg mb-6">La forma más fácil de intercambiar dinero.</p>
        {token ?
        <button
          onClick={() => navigate("/systems")}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          Iniciar
        </button>
          :
        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          Iniciar sesión
        </button>
        }
      </div>
    </div>
  );
};

export default LandingPage;
