import React, { useState } from 'react';

const InputCampo = ({ label, type, name, value, onChange, regex, mensajeError }) => {
  const [error, setError] = useState(false);

  // Al perder el foco, validamos con la regex
  const handleBlur = () => {
    if (regex && value) {
      setError(!regex.test(value));
    }
  };

  // Al escribir, quitamos el aviso de error
  const handleChangeInternal = (e) => {
    setError(false);
    onChange(e); 
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChangeInternal}
        onBlur={handleBlur}
        className={`p-3 border rounded-xl outline-none transition-all ${
          error 
            ? 'border-red-500 bg-red-50 ring-2 ring-red-100' 
            : 'border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-100'
        }`}
      />
      {error && <span className="text-xs text-red-600 font-medium">{mensajeError}</span>}
    </div>
  );
};

export default InputCampo;