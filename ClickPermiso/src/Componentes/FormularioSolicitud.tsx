import { useState } from "react";

const FormularioSolicitud = () => {
  const [formData, setFormData] = useState({
    fecha: '21/01/2026',
    telefono: '',
    jornada: '',
    turno: 'Diurno',
    horasDocencia: '',
    diasPermiso: '',
    noRetribuido: false,
    causaSobrevenida: true,
    justificacion: '',
    archivo: null as File | null
  });

  const handleSubmit = () => {
    console.log('Guardar solicitud:', formData);
    alert('Solicitud guardada correctamente');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, archivo: e.target.files[0]});
    }
  };

  return (
    <div className="main-content">
      <div className="form-container">
        <div className="form-header">
          <div className="form-title-container">
            <span>📅</span>
            <h2 className="form-title">Solicitar Día: 21 de enero de 2026</h2>
          </div>
          <button className="back-button">
            ← Volver
          </button>
        </div>

        <div>
          {/* Fila 1: Fecha y Teléfono */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Día Solicitado</label>
              <input
                type="text"
                value={formData.fecha}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Número de Teléfono</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className="form-input"
                placeholder="Introduce tu teléfono"
              />
            </div>
          </div>

          {/* Fila 2: Jornada y Turno */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Jornada</label>
              <select
                value={formData.jornada}
                onChange={(e) => setFormData({...formData, jornada: e.target.value})}
                className="form-select"
              >
                <option value="">---------</option>
                <option value="completa">Completa</option>
                <option value="parcial">Parcial</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Turno Solicitado</label>
              <select
                value={formData.turno}
                onChange={(e) => setFormData({...formData, turno: e.target.value})}
                className="form-select"
              >
                <option value="Diurno">Diurno</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>
          </div>

          {/* Fila 3: Horas y Días */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Núm. de horas de docencia directa y guardias afectadas
              </label>
              <input
                type="number"
                value={formData.horasDocencia}
                onChange={(e) => setFormData({...formData, horasDocencia: e.target.value})}
                className="form-input"
                placeholder="0"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Núm. de días de permisos solicitados en el centro
              </label>
              <input
                type="number"
                value={formData.diasPermiso}
                onChange={(e) => setFormData({...formData, diasPermiso: e.target.value})}
                className="form-input"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Checkbox: Permiso no retribuido */}
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="noRetribuido"
              checked={formData.noRetribuido}
              onChange={(e) => setFormData({...formData, noRetribuido: e.target.checked})}
              className="checkbox-input"
            />
            <label htmlFor="noRetribuido" className="checkbox-label">
              Estoy solicitando un día de permiso no retribuido
            </label>
          </div>

          {/* Checkbox: Causa sobrevenida */}
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="causaSobrevenida"
              checked={formData.causaSobrevenida}
              onChange={(e) => setFormData({...formData, causaSobrevenida: e.target.checked})}
              className="checkbox-input"
            />
            <label htmlFor="causaSobrevenida" className="checkbox-label">
              ¿Causa sobrevenida?
            </label>
          </div>

          {/* Justificación */}
          <div className="form-group full-width">
            <label className="form-label">
              Justificación de la causa sobrevenida
            </label>
            <textarea
              value={formData.justificacion}
              onChange={(e) => setFormData({...formData, justificacion: e.target.value})}
              className="form-textarea"
              placeholder="Describe aquí la justificación..."
            />
          </div>

          {/* Documento PDF */}
          <div className="form-group full-width">
            <label className="form-label">
              Documento Justificativo en PDF
            </label>
            <div className="file-upload-container">
              <label className="file-upload-button">
                Seleccionar archivo
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
              <span className="file-name">
                {formData.archivo ? formData.archivo.name : 'nada seleccionado'}
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button className="btn btn-cancel">
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="btn btn-submit"
            >
              Guardar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioSolicitud;