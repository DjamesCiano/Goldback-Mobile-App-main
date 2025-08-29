import { useState } from "react";

export const useCurrencyInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const formatCurrency = (inputValue: string): string => {
    const cleanValue = inputValue.replace(/[^0-9.]/g, "");

    const [integerPartRaw, decimalPart] = cleanValue.split(".");

    const integerPart = integerPartRaw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const formattedValue =
      decimalPart !== undefined
        ? `${integerPart}.${decimalPart.substring(0, 2)}`
        : integerPart;

    return formattedValue;
  };

  const handleChange = (value: string) => {
    const formattedValue = formatCurrency(value);
    setValue(formattedValue);

    return formattedValue;
  };

  const parseCurrency = (formattedValue: string): number => {
    const numericValue = parseFloat(formattedValue.replace(/,/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  return {
    value,
    onChange: handleChange,
    toNumber: (value: string) => parseCurrency(value),
  };
};
