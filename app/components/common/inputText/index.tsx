type InputType = {
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onChange: () => void;
};
export const InputText = ({
  value,
  placeholder,
  autoFocus,
  className,
  onChange,
}: InputType) => {
  return (
    <input
      type="text"
      className={`${className ? className : ""}`}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={onChange}
    />
  );
};
