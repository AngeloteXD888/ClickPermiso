import React, { useState } from 'react';

const InputCampo = ({ label, type, name, value, onChange, regex, mensajeError }) => {
  const [error, setError] = useState(false);

  // Validación local al perder el foco (onBlur)
  const handleBlur = () => {
    if (regex) {
      // .test() devuelve true si cumple la regex, false si falla
      if (!regex.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  // Al escribir, limpiamos el error para dar feedback positivo inmediato
  const handleChangeInternal = (e) => {
    setError(false);
    onChange(e); // Propagamos el evento al padre
  };

  return (
    <div className="grupo-input">
      <label className="etiqueta">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChangeInternal}
        onBlur={handleBlur}
        className={error ? 'input-error' : 'input-normal'}
      />
      {/* Renderizado condicional del error */}
      {error && <span className="mensaje-error">{mensajeError}</span>}
    </div>
  );
};

export default InputCampo;