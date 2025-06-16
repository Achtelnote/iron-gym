type InputFieldProps = {
  id?: string;
  name?: string;
  form?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  className?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "date" | "time";
  block?: boolean;
  pattern?: string;
  dataList?: { label: string; value: (string|number) }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function InputField({
  id,
  name,
  form,
  value,
  label = "",
  placeholder = "",
  prefix,
  postfix,
  className = "",
  block = false,
  type = "text",
  pattern = "",
  dataList,
  onChange,
  ...props
}: InputFieldProps) {
  return (
    <div className={`${block ? "w-full" : ""} ${className}`}>
      <label htmlFor={id || name} className="text-sm">{label}</label>
      <div className={`relative ${block ? "w-full" : ""} h-10 flex flex-row gap-2 bg-gray-800 rounded-sm`}>
        {
          prefix ? (
            <div className="content-center px-2">
              {prefix}
            </div>
          ) : null
        }
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          form={form}
          placeholder={placeholder}
          className={`${block ? "w-full" : ""} h-full p-2`}
          onChange={onChange}
          pattern={pattern || undefined}
          list={`datalist-${name || id}`}
          {...props}
        />
        {
          postfix ? (
            <div className="content-center px-2">
              {postfix}
            </div>
          ) : null
        }
      </div>
      <datalist id={`datalist-${name || id}`}>
        {
          dataList?.map((d) => (
            <option value={d.value}>{d.label}</option>
          ))
        }
      </datalist>
    </div>
  );
}
