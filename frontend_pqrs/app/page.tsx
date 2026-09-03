'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RadicarPQRS() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    categoria: 'Peticion',
    asunto: '',
    descripcion: ''
  });
  const [resultado, setResultado] = useState<{ codigo?: string; error?: string } | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setResultado(null);

    try {
      const res = await fetch('http://localhost:8000/api/radicar/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResultado({ codigo: data.codigo });
        setFormData({ nombre: '', correo: '', categoria: 'Peticion', asunto: '', descripcion: '' });
      } else {
        setResultado({ error: 'No se pudo procesar la solicitud. Verifica los campos.' });
      }
    } catch {
      setResultado({ error: 'Error de conexión con el servidor backend.' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80 px-6 md:px-12 py-4 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold p-2.5 rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center text-sm">
            SC
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-slate-900 text-lg block">Sol Cielo S.A.S.</span>
            <span className="text-xs text-slate-400 font-medium tracking-wide">Portal Ciudadano</span>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <span className="bg-blue-50 text-blue-700 font-semibold text-xs md:text-sm px-4 py-2 rounded-xl border border-blue-100">
            Radicar
          </span>
          <Link href="/consultar" className="text-slate-600 hover:text-blue-600 font-medium text-xs md:text-sm px-4 py-2 rounded-xl hover:bg-slate-100 transition">
            Consultar Estado
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto py-12 px-4">
        <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Radica tu Solicitud</h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Completa el formulario oficial para gestionar Peticiones, Quejas, Reclamos o Sugerencias.</p>
          </div>

          {resultado?.codigo && (
            <div className="bg-emerald-50/80 border border-emerald-200 text-emerald-900 p-6 mb-8 rounded-2xl flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-2.5 font-bold text-base text-emerald-800">
                <span>✅</span> ¡Solicitud radicada con éxito!
              </div>
              <p className="text-sm text-emerald-700">Conserva tu código único de seguimiento para verificar el estado de tu trámite en cualquier momento:</p>
              <div className="bg-white border-2 border-emerald-300 font-mono text-xl font-black px-5 py-3 rounded-xl text-blue-600 w-fit select-all shadow-inner tracking-wider">
                {resultado.codigo}
              </div>
            </div>
          )}

          {resultado?.error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 mb-8 rounded-2xl text-sm font-medium flex items-center gap-3">
              <span>⚠️</span>
              <span>{resultado.error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Nombre completo</label>
                <input 
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:outline-none transition font-medium" 
                  placeholder="Ej. Carlos Mendoza" 
                  required 
                  value={formData.nombre} 
                  onChange={e => setFormData({...formData, nombre: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Correo electrónico</label>
                <input 
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:outline-none transition font-medium" 
                  type="email" 
                  placeholder="correo@dominio.com" 
                  required 
                  value={formData.correo} 
                  onChange={e => setFormData({...formData, correo: e.target.value})} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Categoría de trámite</label>
                <select 
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:outline-none transition font-medium cursor-pointer" 
                  value={formData.categoria} 
                  onChange={e => setFormData({...formData, categoria: e.target.value})}
                >
                  <option value="Peticion">Petición</option>
                  <option value="Queja">Queja</option>
                  <option value="Reclamo">Reclamo</option>
                  <option value="Sugerencia">Sugerencia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Asunto</label>
                <input 
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:outline-none transition font-medium" 
                  placeholder="Asunto principal de la solicitud" 
                  required 
                  value={formData.asunto} 
                  onChange={e => setFormData({...formData, asunto: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Descripción detallada</label>
              <textarea 
                className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:outline-none transition resize-none font-medium" 
                placeholder="Redacta los hechos y detalles de tu requerimiento..." 
                rows={4} 
                required 
                value={formData.descripcion} 
                onChange={e => setFormData({...formData, descripcion: e.target.value})} 
              />
            </div>

            <button 
              type="submit" 
              disabled={cargando}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              {cargando ? 'Procesando registro...' : 'Enviar Solicitud Oficial'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}