import { twMerge } from "tailwind-merge";
import InputComponent from "./Input";

export default function InputLabelComponent({
  type = "text",
  labelName,
  name,
  placeholder = "Type Here",
  labelClassName,
  inputClassName,
  paraphClassName,
  error = false,
  errorMessage,
  onChangeEvent,
  defaultValue = ""
}) {
  return (
    <>
      <label
        htmlFor={name}
        className={twMerge(labelClassName, error ? "text-red-500" : "")}
      >
        {labelName}
      </label>
      <InputComponent
        className={twMerge(inputClassName, error ? "input-error" : "")}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChangeEvent}
      />
      {error && (
        <p className={twMerge(paraphClassName, error ? "text-red-500" : "")}>
          {errorMessage}
        </p>
      )}
    </>
  );
}
