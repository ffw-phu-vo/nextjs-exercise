import React from "react";
import CurrencyInput from "react-currency-input-field";

interface ICustomCurrencyInput {
  id: string;
  className: string;
  placeholder: string;
  value: number;
  setValue: any;
}
const CustomCurrencyInput = ({
  id,
  className,
  placeholder,
  value,
  setValue,
}: ICustomCurrencyInput) => {
  return (
    <CurrencyInput
      id={id}
      className={className}
      value={value}
      placeholder={placeholder}
      prefix={"$"}
      allowDecimals={false}
      onValueChange={(value) => setValue(value)}
    />
  );
};

export default CustomCurrencyInput;
