"use client";
import { useRef } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import Button from "../button";
import { useLocale } from "next-intl";

type QuantityInputProps = {
  name?: string;
  form?: string;
  value?: number;
  prefix?: React.ReactNode | string;
  postfix?: React.ReactNode | string;
  max?: number;
  min?: number;
  className?: string;
  onChange?: (value: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

export default function QuantityInput({
  name,
  form,
  value = 0,
  max,
  min = 0,
  className = "",
  onChange,
  onIncrement,
  onDecrement
}: QuantityInputProps) {
  const numberField = useRef<HTMLInputElement>(null);
  const displayField = useRef<HTMLSpanElement>(null);
  const locale = useLocale();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeHandler = (e: any) => {
    onChange?.call(null, Number.parseInt(e.target.textContent));
  };

  const onIncrementHandler = () => {
    if (max == null || value < max) onIncrement?.call(null);
  };
  const onDecrementHandler = () => {
    if (min == null || value > min) onDecrement?.call(null);
  };

  return (
    <div className={`grid grid-cols-[40px_1fr_40px] sm:grid-cols-[40px_80px_40px] ${className}`}>
      {
        locale == "en" ? (
          <Button icon={<LuMinus />} onClick={onDecrementHandler} className="p-0! rounded-md!" />
        ) : (
          <Button icon={<LuPlus />} onClick={onIncrementHandler} className="p-0! rounded-md!" />
        )
      }
      <span
        contentEditable
        className="h-full text-lg p-2 text-center"
        onChange={onChangeHandler}
        ref={displayField}
      >
        {value}
      </span>
      <input ref={numberField} type="hidden" name={name} form={form} value={value} />
      {
        locale == "en" ? (
          <Button icon={<LuPlus />} onClick={onIncrementHandler} className="p-0! rounded-md!" />
        ) : (
          <Button icon={<LuMinus />} onClick={onDecrementHandler} className="p-0! rounded-md!" />
        )
      }
    </div>
  );
}