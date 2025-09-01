import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";

interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  options: { label: string; value: string }[];
  error?: FieldError;
}

export const RadioGroupField = ({
  name,
  control,
  label,
  options,
  error,
}: RadioGroupFieldProps) => (
  <div>
    <p className="text-white font-medium mb-[8px]">{label}</p>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex gap-x-8 gap-y-4 flex-wrap">
          {options.map((option) => (
            <label
              key={option.value}
              className="text-white flex items-center gap-2"
            >
              <input
                type="radio"
                value={option.value}
                checked={field.value === option.value}
                onChange={() => field.onChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    />
    {error && <p className="text-red-500 text-sm mt-[8px]">{error.message}</p>}
  </div>
);
