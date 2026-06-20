import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

const ratesFromINR = {
  INR: 1,
  EUR: 0.011,
  USD: 0.012,
};

const currencyLocales = {
  INR: "en-IN",
  EUR: "en-EU",
  USD: "en-US",
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("INR");

  const convertPrice = (priceInINR) => {
    const converted = priceInINR * ratesFromINR[currency];

    return new Intl.NumberFormat(currencyLocales[currency], {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, convertPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}