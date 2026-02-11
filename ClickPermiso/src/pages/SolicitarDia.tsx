import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SolicitarDia = ({ turnoPorDefecto = "Diurno" }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fecha: '', tel: '', jornada: '', turno: turnoPorDefecto, justificante: '' });

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6 border-b pb-4">📝 Solicitar Día ({form.turno})</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <input name="fecha" type="date" onChange={handleChange} className="border p-2 rounded" />
          <input name="tel" placeholder="Teléfono" onChange={handleChange} className="border p-2 rounded" />
          <select name="jornada" onChange={handleChange} className="border p-2 rounded">
            <option value="">Selecciona Jornada</option>
            <option>Completa</option><option>Parcial</option>
          </select>
          <select name="turno" value={form.turno} onChange={handleChange} className="border p-2 rounded">
            <option>Diurno</option><option>Vespertino</option>
          </select>
        </div>

        <textarea name="justificante" placeholder="Justificación..." className="w-full border p-2 mt-4 rounded h-24" onChange={handleChange} />

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
          <button onClick={() => alert('Solicitud enviada')} className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button>
        </div>
      </div>
    </div>
  );
};
export default SolicitarDia;