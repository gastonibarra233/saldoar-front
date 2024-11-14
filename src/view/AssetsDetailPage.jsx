import { useNavigate, useParams } from "react-router-dom";

const AssetsDetailPage = ({ assets }) => {
    const navigate = useNavigate()
  const { system_id } = useParams();
  const asset = assets.find((as) => as.id === system_id);

  if (!asset) {
    return <div>No se encontró el activo</div>;
  }

   return (
     <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">
       <button
         onClick={() => navigate(-1)}
         className="mb-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out">
         Volver
       </button>

       <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
         {asset.attributes.name}
       </h2>

       <div className="flex justify-center mb-6">
         <img
           src={`https://panel.saldo.com.ar/img/sistemas2/${asset.id}.big.png`}
           alt={`${asset.attributes.name} logo`}
           className="w-full h-56 object-contain"
         />
       </div>

       <div className="mb-8">
         <p className="text-gray-600 text-lg">{asset.attributes.description}</p>
       </div>

       <div className="grid grid-cols-2 gap-6 space-y-6">
         <div className="flex justify-between items-center border-b-2">
           <h4 className="font-semibold text-lg text-gray-800">Venta mínima:</h4>
           <p className="text-lg text-gray-600">
             {asset.attributes.currency} {asset.attributes.minimum_amount_send.toFixed(2)}
           </p>
         </div>

         <div className="flex justify-between items-center border-b-2 pb-5">
           <h4 className="font-semibold text-lg text-gray-800">Compra mínima:</h4>
           <p className="text-lg text-gray-600">
             {asset.attributes.currency} {asset.attributes.minimum_amount_receive.toFixed(2)}
           </p>
         </div>

         <div className="flex justify-between items-center border-b-2 pb-5">
           <h4 className="font-semibold text-lg text-gray-800">Venta máxima:</h4>
           <p className="text-lg text-gray-600">
             {asset.attributes.currency} {asset.attributes.maximum_amount_send.toFixed(2)}
           </p>
         </div>

         <div className="flex justify-between items-center border-b-2 pb-5">
           <h4 className="font-semibold text-lg text-gray-800">Compra máxima:</h4>
           <p className="text-lg text-gray-600">
             {asset.attributes.currency} {asset.attributes.maximum_amount_receive.toFixed(2)}
           </p>
         </div>
       </div>
     </div>
   );
};

export default AssetsDetailPage;
