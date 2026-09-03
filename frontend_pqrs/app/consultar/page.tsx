'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Ticket = {
  codigo: string;
  categoria: string;
  estado: string;
  fecha_creacion: string;
  asunto: string;
  descripcion: string;
};

export default function ConsultarTicket() {
  const router = useRouter();
  const [codigo, setCodigo] = useState('');
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    setTicket(null);

    try {
      const res = await fetch(`http://localhost:8000/api/consultar/${codigo.trim()}/`);
      const data = await res.json();

      if (res.ok) {
        setTicket(data);
      } else {
        setError('No se encontró ningún ticket asociado a este código.');
      }
    } catch {
      setError('Error al conectar con el servidor backend.');
    } finally {
      setCargando(false);
    }
  };

  const getBadgeColor = (estado: string) => {
    switch (estado) {
      case 'Nuevo': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'En Revision': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Resuelto': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cerrado': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
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
          <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium text-xs md:text-sm px-4 py-2 rounded-xl hover:bg-slate-100 transition">
            Radicar
          </Link>
          <span className="bg-blue-50 text-blue-700 font-semibold text-xs md:text-sm px-4 py-2 rounded-xl border border-blue-100">
            Consultar Estado
          </span>
        </nav>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto py-12 px-4">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition"
        >
          &larr; Volver atrás
        </button>

        <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Consultar Estado</h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Introduce tu código alfanumérico único para ver el estado de tu trámite en tiempo real.</p>
          </div>

          <form onSubmit={handleConsultar} className="flex flex-col sm:flex-row gap-3 mb-8">
            <input 
              className="flex-1 bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 font-mono tracking-wider uppercase focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:outline-none transition font-medium" 
              placeholder="Ej. PQRS-A1B2C3" 
              required 
              value={codigo} 
              onChange={e => setCodigo(e.target.value)} 
            />
            <button 
              type="submit" 
              disabled={cargando}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {cargando ? 'Buscando...' : 'Consultar'}
            </button>
          </form>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 mb-6 rounded-2xl text-sm font-medium flex items-center gap-3">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {ticket && (
            <div className="bg-slate-50/70 border border-slate-200 p-6 md:p-8 rounded-2xl space-y-5 shadow-inner">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-bold tracking-wider block">CÓDIGO DE RADICADO</span>
                  <span className="font-mono font-black text-xl text-blue-600 tracking-wider">{ticket.codigo}</span>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border shadow-xs ${getBadgeColor(ticket.estado)}`}>
                  {ticket.estado}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-bold tracking-wider block">CATEGORÍA</span>
                  <span className="font-semibold text-slate-800">{ticket.categoria}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold tracking-wider block">FECHA DE RADICACIÓN</span>
                  <span className="font-medium text-slate-700 text-sm">{new Date(ticket.fecha_creacion).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-bold tracking-wider block">ASUNTO</span>
                <p className="font-semibold text-slate-900 mt-0.5">{ticket.asunto}</p>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-bold tracking-wider block">DESCRIPCIÓN</span>
                <p className="text-slate-700 bg-white p-4 rounded-xl border border-slate-200 text-sm mt-1 leading-relaxed shadow-xs">{ticket.descripcion}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}