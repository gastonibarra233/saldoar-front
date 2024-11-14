import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector(state => state.auth)

   const handleSubmit = (e) => {
     e.preventDefault();
     dispatch(login({ email, password }))
       .unwrap()
       .then(() => navigate("/systems"))
       .catch((err) => console.error(err));
   };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};
export default LoginForm;
