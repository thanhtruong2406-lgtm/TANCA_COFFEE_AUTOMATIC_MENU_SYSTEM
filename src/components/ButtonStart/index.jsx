import React from "react";

const Button = ({
  children = "START >",
  onClick,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-9 py-3 bg-[#6B4F3A] hover:bg-[#543D2C] text-[#F5EBDD] font-bold text-base rounded-full tracking-wider shadow-lg shadow-[#6B4F3A]/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 select-none cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 

export default Button;
