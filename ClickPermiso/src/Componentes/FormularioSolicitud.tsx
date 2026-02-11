import React, { useState } from 'react';
import InputCampo from './InputCampo';

const FormularioSolicitud = () => {
  // 1. Estado único para todos los campos
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    telefono: '',
    password: ''
  });

  // 2. Función genérica para actualizar el estado
  const manejarCambio = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Manejo del envío
  const manejarEnvio = (e) => {
    e.preventDefault();
    // Aquí se haría una validación final antes de enviar al backend
    console.log("Datos enviados:", formData);
    alert("Formulario enviado con éxito");
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-contenedor">
      <h2>Crear Cuenta</h2>

      {/* INSTANCIA 1: Nombre de Usuario */}
      <InputCampo
        label="Nombre de Usuario"
        type="text"
        name="usuario"
        value={formData.usuario}
        onChange={manejarCambio}
        regex={/^[a-zA-Z0-9]{4,16}$/} // Letras/nums, 4-16 caracteres
        mensajeError="El usuario debe tener entre 4 y 16 caracteres alfanuméricos."
      />

      {/* INSTANCIA 2: Correo Electrónico */}
      <InputCampo
        label="Correo Electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={manejarCambio}
        regex={/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
        mensajeError="Por favor, introduce un correo electrónico válido."
      />

      {/* INSTANCIA 3: Teléfono (Solo números) */}
      <InputCampo
        label="Teléfono Móvil"
        type="tel"
        name="telefono"
        value={formData.telefono}
        onChange={manejarCambio}
        regex={/^[0-9]{9}$/} // Exactamente 9 dígitos
        mensajeError="El teléfono debe contener 9 dígitos numéricos."
      />
      
      {/* INSTANCIA 4: Password */}
      <InputCampo 
         label="Contraseña"
         type="password"
         name="password"
         value={formData.password}
         onChange={manejarCambio}
         regex={/^.{6,}$/} // Mínimo 6 caracteres
         mensajeError="La contraseña debe tener al menos 6 caracteres."
      />

      <button type="submit">Registrarse</button>
    </form>
  );
};