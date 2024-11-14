import { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import { ArrowUpDownIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CurrencyConverter({ assets }) {
  const [sendCurrency, setSendCurrency] = useState(assets[2]);
  const [receiveCurrency, setReceiveCurrency] = useState(assets[3]);
  const [conversionRates, setConversionRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);

  const fetchConversionRates = (baseCurrency) => {
    fetch(`https://v6.exchangerate-api.com/v6/0621ec524156b5d1a77b985d/latest/${baseCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          setConversionRates(data.conversion_rates);
        } else {
          toast.error("No se pudieron cargar las tasas de cambio");
        }
      })
      .catch((error) => {
        console.error("Error al cargar las tasas de cambio:", error);
        toast.error("Error al cargar las tasas de cambio");
      });
  };

  useEffect(() => {
    if (sendCurrency) {
      fetchConversionRates(sendCurrency.attributes.currency);
    }
  }, [sendCurrency]);

  useEffect(() => {
    if (conversionRates && receiveCurrency) {
      const receiveRate = conversionRates[receiveCurrency.attributes.currency];
      if (receiveRate) {
        setConvertedAmount(amount * receiveRate);
        setExchangeRate(receiveRate);
      } else {
        setConvertedAmount(0);
        setExchangeRate(null);
      }
    }
  }, [receiveCurrency, amount, conversionRates]);

  const handleSwapCurrencies = () => {
    if (sendCurrency.attributes.can_receive && receiveCurrency.attributes.can_send) {
      setSendCurrency(receiveCurrency);
      setReceiveCurrency(sendCurrency);
      setAmount(convertedAmount);
    } else {
      toast.error("Elija otro método de pago", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: "#f56565", color: "white" },
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Conversor de Moneda</h2>

      <div className="mb-4">
        {exchangeRate && (
          <p className="text-gray-500 text-sm mb-1">
            {`1 ${sendCurrency.attributes.currency} = ${exchangeRate.toFixed(4)} ${
              receiveCurrency.attributes.currency
            }`}
          </p>
        )}
        <label className="block text-gray-700 font-semibold mb-2">
          {`Envías ${sendCurrency ? sendCurrency.attributes.currency : ""}`}
        </label>
        <CurrencySelector
          options={assets.filter((asset) => asset.attributes.can_send)}
          selectedCurrency={sendCurrency}
          onCurrencyChange={setSendCurrency}
          amount={amount}
          setAmount={setAmount}
        />
      </div>

      <div className="flex justify-center my-4">
        <ArrowUpDownIcon
          onClick={handleSwapCurrencies}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200 transform hover:scale-110"
          size={24}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          {`Recibes ${receiveCurrency ? receiveCurrency.attributes.currency : ""}`}
        </label>
        <CurrencySelector
          options={assets.filter((asset) => asset.attributes.can_receive)}
          selectedCurrency={receiveCurrency}
          onCurrencyChange={setReceiveCurrency}
          amount={convertedAmount}
          setAmount={setConvertedAmount}
        />
      </div>
    </div>
  );
}

export default CurrencyConverter;
