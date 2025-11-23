'use client'
import { useEffect, useState } from "react";
import { User } from "../utils/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../utils/api";

type Taller = {
    nombre_taller: string,
    direccion: string,
    id: string,
    estado:boolean
}
export default function DashboardShopsPage() {
  const [talleres, setTalleres] = useState<Taller[]>([]);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [usuario, setUsuario] = useState<User | null>();
  const router = useRouter();

useEffect(() => {
    const verificarUsuario = async () => {  
      
        const res = await fetchWithAuth("http://localhost:3001/api/profile", 
          {
        method: "GET",
      });
        const data = await res.json();
      
        if (data?.message || data?.data[0].rol_id !== 3) {
          toast.error("Acceso no autorizado")
          router.push("/")
          return
        } 
        console.log(data);
    }
    verificarUsuario()
    return () => {
      
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:3001/api/talleres")
      .then((res) => res.json())
      .then((data) => setTalleres(data));
  }, []);

  const toggleEstado = async (id: string, estadoActual:boolean) => {
    const nuevoEstado = !estadoActual;
    console.log(estadoActual, nuevoEstado);
    
    await fetch(`http://localhost:3001/api/talleres/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    setTalleres((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
    );
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Talleres</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor:"lightgray", borderRadius:"5px" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #000000", padding: "10px" }}>
              ID
            </th>
            <th style={{ borderBottom: "1px solid #000000", padding: "10px" }}>
              Nombre
            </th>
            <th style={{ borderBottom: "1px solid #000000", padding: "10px" }}>
              Dirección
            </th>
            <th style={{ borderBottom: "1px solid #000000", padding: "10px" }}>
              Estado
            </th>
            <th style={{ borderBottom: "1px solid #000000", padding: "10px" }}>
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {talleres.map((taller) => (
            <tr key={taller.id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #1a1a1a" }}>
                {taller.id}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #1a1a1a" }}>
                {taller.nombre_taller}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #1a1a1a" }}>
                {taller.direccion}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #1a1a1a" }}>
                {taller.estado ? "Activo" : "Inactivo"}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #1a1a1a" }}>
                <button
                  onClick={() => toggleEstado(taller.id, taller.estado)}
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    backgroundColor: taller.estado ? "#e74c3c" : "#2ecc71",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  {taller.estado ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
