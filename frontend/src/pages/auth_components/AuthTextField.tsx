// UNUSED COMPONENT

import type { LucideIcon } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  error?: string;
  register: UseFormRegisterReturn;
}

export default function AuthTextField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  error,
  register,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
        )}

        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className={`border p-2 rounded w-full focus:outline-none ${Icon ? "pl-10" : ""}`}
        />
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
