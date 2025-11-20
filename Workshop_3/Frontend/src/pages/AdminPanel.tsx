import React from 'react';

export const AdminPanel: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[var(--unal-dark)] mb-6">Panel Administrativo</h2>
      <div className="p-10 bg-white shadow rounded-lg">
        <p className="mb-4">Zona restringida para carga de archivos CSV/JSON.</p>
        <button className="bg-[var(--unal-red)] text-white px-4 py-2 rounded hover:bg-red-800 transition-colors">
          Subir Archivo
        </button>
      </div>
    </div>
  );
};