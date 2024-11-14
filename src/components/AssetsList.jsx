import { useEffect, useState } from "react";
import { getValidSystemIDs } from "./ValidatedIds";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

const AssetsList = ({ assets }) => {
  const [validIDs, setValidIDs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValidIDs = async () => {
      const ids = await getValidSystemIDs();
      setValidIDs(ids);
      setLoading(false);
    };

    fetchValidIDs();
  }, []);

  const validAssets = assets.filter((asset) => validIDs.includes(asset.id));

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Activos</h2>
      <ul className="space-y-4">
        {validAssets.map((system) => (
          <li
            key={system.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm flex items-center space-x-4">
            <Link to={`/systems/${system.id}`} className="flex items-center w-full">
            <img
              src={`https://panel.saldo.com.ar/img/sistemas2/${system.id}-saldo.small.png`}
              alt={`${system.attributes.name} logo`}
              className="w-12 h-12 mr-2"
              />

            <div>
              <h3 className="text-lg font-semibold text-gray-800">{system.attributes.name}</h3>
            </div>
              </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetsList;
