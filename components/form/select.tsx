type SelectProps = {
  id?: string;
  name?: string;
  form?: string;
  value?: string;
  label?: string;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  className?: string;
  block?: boolean;
  options?: { label: string, value: string | number }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  id,
  name,
  form,
  value,
  label = "",
  prefix,
  postfix,
  className = "",
  block = false,
  options = [],
  onChange,
  ...props
}: SelectProps) {
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
        <select
          id={id}
          name={name}
          value={value}
          form={form}
          className={`${block ? "w-full" : ""} h-full p-2`}
          onChange={onChange}
          {...props}
        >
          {
            options.map((o) => (<option key={`${name || id}-${o.value}`} value={o.value} className="bg-gray-800 rounded-sm">{o.label}</option>))
          }
        </select>
        {
          postfix ? (
            <div className="content-center px-2">
              {postfix}
            </div>
          ) : null
        }
      </div>
    </div>
  );
}