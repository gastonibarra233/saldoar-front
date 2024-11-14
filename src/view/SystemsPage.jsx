import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "../redux/slices/assetsSlice";
import CurrencyCalculator from "../components/CurrencyCalculator";
import AssetsList from "../components/AssetsList";

const SystemsPage = () => {
  const dispatch = useDispatch();
  const { assets, error } = useSelector((state) => state.assets);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);
  if (error) return <p>{error}</p>;

  return (
    <div className="flex max-w-5xl mx-auto mt-10 gap-6">
      <div className="w-1/2">
        <AssetsList assets={assets} />
      </div>
      <div className="w-1/2">
        <CurrencyCalculator assets={assets} />
      </div>
    </div>
  );
};

export default SystemsPage;
