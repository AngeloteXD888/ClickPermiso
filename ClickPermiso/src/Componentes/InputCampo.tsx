import { useState } from 'react';

interface InputCampoProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  regex?: RegExp;
  mensajeError?: string;
  placeholder?: string;
  required?: boolean;
}

const InputCampo = ({
  label,
  type,
  name,
  value,
  onChange,
  regex,
  mensajeError,
  placeholder = '',
  required = false,
}: InputCampoProps) => {
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (regex) {
      setError(!regex.test(value));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false); // limpiamos error al escribir
    onChange(e);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
          error
            ? 'border-red-400 focus:ring-red-400 bg-red-50'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      />

      {error && mensajeError && (
        <span className="text-xs text-red-600 mt-0.5">{mensajeError}</span>
      )}
    </div>
  );
};

export default InputCampo;