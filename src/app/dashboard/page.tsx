"use client";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";
import { User } from "../utils/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import { fetchWithAuth } from "../utils/api";
// import { User } from "../utils/types";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

interface ResumenMes {
  mes: string;
  turnos: number;
  ingresos: number;
}

interface DashboardData {
  periodo: { desde: string; hasta: string };
  talleresNuevos: number;
  turnosReservados: number;
  totalIngresos: number;
  resumenPorMes: ResumenMes[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [usuario, setUsuario] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    
    fetchWithAuth("http://localhost:3001/api/profile").then(async (res) => {
      const data = await res.json();
      if (data.data[0].rol_id !== 3) {
            toast.error("Acceso no autorizado")
            router.push("/")
            return
      }
      setUsuario(data.data[0]);
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log(usuario?.rol_id);
    
  //         if (usuario?.rol_id !== 3 ) {
  //           toast.error("Acceso no autorizado")
  //           router.push("/")
  //         }

  //   return () => {
      
  //   };
  // }, [usuario]);
  
  const fetchDashboard = async (from?: string, to?: string) => {
    setLoading(true);
    try {
      // 🔗 Construimos la URL con query params
      const query = new URLSearchParams();
      if (from) query.append("desde", from);
      if (to) query.append("hasta", to);

      // const res = await fetchWithAuth(`http://localhost:3001/api/dashboard?${query}`).then;
      const res = await fetch(`http://localhost:3001/api/dashboard?${query}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error al obtener dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

    // 🔄 Cargar datos al iniciar
  useEffect(() => {
    fetchDashboard();
  }, []);
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await fetch("http://localhost:3001/api/dashboard");
//         const json = await res.json();
//         setData(json);
//       } catch (error) {
//         console.error("Error al obtener dashboard:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);
    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchDashboard(desde, hasta);
    };

  if (loading) return <p>Cargando datos del tablero...</p>;
  if (!data) return <p>No hay información disponible.</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>📊 Panel de Control</h1>

      {/* FILTROS DE FECHA */}
      <form
        onSubmit={handleFilter}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <label>Desde: </label>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
          />
        </div>

        <div>
          <label>Hasta: </label>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
          />
        </div>

        <button type="submit">Filtrar</button>
      </form>

      <p>
        Periodo: {data.periodo.desde} → {data.periodo.hasta}
      </p>

      {/* CARDS DE DATOS */}
      <section
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Card title="Talleres nuevos" value={data.talleresNuevos} />
        <Card title="Turnos reservados" value={data.turnosReservados} />
        <Card
          title="Ingresos totales"
          value={`$ ${data.totalIngresos.toLocaleString("es-AR")}`}
        />
      </section>

      {/* TABLA DE RESUMEN */}
      <h2 style={{ marginTop: "2rem" }}>📅 Resumen por mes</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Mes</th>
            <th style={thStyle}>Turnos</th>
            <th style={thStyle}>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {data.resumenPorMes.map((r) => (
            <tr key={r.mes}>
              <td style={tdStyle}>{r.mes}</td>
              <td style={tdStyle}>{r.turnos}</td>
              <td style={tdStyle}>$ {r.ingresos.toLocaleString("es-AR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const Card = ({ title, value }: { title: string; value: string | number }) => (
  <div
    style={{
      flex: "1 1 200px",
      background: "#f9f9f9",
      padding: "1rem",
      borderRadius: "8px",
      textAlign: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <h3>{title}</h3>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
  </div>
);

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "0.5rem",
  textAlign: "left" as const,
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem",
};