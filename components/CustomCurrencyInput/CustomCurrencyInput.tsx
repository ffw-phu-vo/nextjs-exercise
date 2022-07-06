import React from "react";
import CurrencyInput from "react-currency-input-field";

interface ICustomCurrencyInput {
  id: string;
  className: string;
  placeholder: string;
  value: number;
  onValueChange: (value: number|string|undefined) => void;
}
const CustomCurrencyInput = ({
  id,
  className,
  placeholder,
  value,
  onValueChange,
}: ICustomCurrencyInput) => {
  return (
    <CurrencyInput
      id={id}
      className={className}
      value={value}
      placeholder={placeholder}
      prefix={"$"}
      allowDecimals={false}
      onValueChange={onValueChange}
    />
  );
};

export default CustomCurrencyInput;
