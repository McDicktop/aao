import React from "react";

function InputField({
  className = "",
  type = "text",
  placeholder = "",
  label = "",
  value,
  onChange,
  id,

}) {
  return (
    <div className="relative">
      <label
        className={`${label ? 'absolute font-semibold top-[5px] left-[6px] rounded-full bg-blue-400 text-xs text-neutral-300 pt-1 w-6 h-6 text-center' : ''} `}
        htmlFor={`${id}`}
      >{label}</label>
      <input
        className={className}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        required
      />
    </div>
  );
}

export default InputField;
