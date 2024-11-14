import { useState, useEffect, Fragment } from "react";
import { Popover, PopoverPanel, PopoverButton, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function CurrencySelector({ options, selectedCurrency, onCurrencyChange, amount, setAmount }) {
  const [selected, setSelected] = useState(selectedCurrency);

  useEffect(() => {
    setSelected(selectedCurrency);
  }, [selectedCurrency]);

  const handleSelect = (currency, closePopover) => {
    setSelected(currency);
    onCurrencyChange(currency);
    closePopover();
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <div className="flex items-center w-full p-2 border rounded-md bg-gray-100">
            <div className="flex-1 mr-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Ingrese valor"
                className="w-full p-2 border-none rounded-md bg-white"
              />
            </div>

            <div className="border-r border-gray-300 mx-2 h-8"></div>

            <PopoverButton className="flex items-center space-x-2">
              {selected ? (
                <img
                  src={`https://panel.saldo.com.ar/img/sistemas2/${selected.id}.big.png`}
                  alt={`${selected.attributes.name} logo`}
                  className="w-full h-16 object-contain"
                />
              ) : (
                <span>Seleccione una moneda</span>
              )}
              <ChevronDownIcon
                className={`w-full h-5 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </PopoverButton>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            <PopoverPanel className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option, close)}
                    className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
                    <img
                      src={`https://panel.saldo.com.ar/img/sistemas2/${option.id}.big.png`}
                      alt={`${option.attributes.name} logo`}
                      className="w-full h-16 object-contain"
                    />
                  </button>
                ))}
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default CurrencySelector;
