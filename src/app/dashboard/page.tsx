"use client";
import { useEffect, useState } from "react";
import { User } from "../utils/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import { fetchWithAuth } from "../utils/api";

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

interface ResumenPorTaller {
  taller_id: number;
  taller: string;
  monto_recaudado: number;
  cantidad_turnos: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [dataResumenPorTaller, setDataResumenPorTaller] =
    useState<ResumenPorTaller | null>(null);
  const [loading, setLoading] = useState(true);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [usuario, setUsuario] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    const verificarUsuario = async () => {
      const res = await fetchWithAuth("http://localhost:3001/api/profile", {
        method: "GET",
      });
      const data = await res.json();

      if (data?.message || data?.data[0].rol_id !== 3) {
        toast.error("Acceso no autorizado");
        router.push("/");
        return;
      }
      console.log(data);
    };
    verificarUsuario();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      const resResumenPorTaller = await fetch(
        `http://localhost:3001/api/dashboard/resumen-por-taller`
      );
      const jsonResumenPorTaller = await resResumenPorTaller.json();
      setDataResumenPorTaller(jsonResumenPorTaller);
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

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDashboard(desde, hasta);
  };

  function goToEditar() {
    router.push("/dashboard-shops");
  }

  if (loading) return <p>Cargando datos del tablero...</p>;
  if (!data) return <p>No hay información disponible.</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <div className={styles.titulo}>
        <h1>📊 Panel de Control</h1>
        <button className={styles.buttonEditar} onClick={goToEditar}>
          Gestión de talleres
        </button>
      </div>

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
            className={styles.input}
          />
        </div>

        <div>
          <label>Hasta: </label>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.buttonFiltrar}>
          Filtrar
        </button>
      </form>

      <p className={styles.periodo}>
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
      <h2 style={{ marginTop: "2rem" }}>📅 Total de ingresos por mes</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "lightgray",
          borderRadius: "4px",
        }}
      >
        <thead>
          <tr style={trStyle}>
            <th style={thStyle}>Fecha</th>
            <th style={thStyle}>Turnos</th>
            <th style={thStyle}>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {data.resumenPorMes.map((r) => (
            <tr key={r.mes}>
              <td style={tdStyle}>{r.mes}</td>
              <td style={tdStyle}>{r.turnos}</td>
              <td style={tdStyle}>$ {r.ingresos}</td>
              {/* <td style={tdStyle}>$ {r.ingresos.toLocaleString("es-AR")}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.resumenPorTallerContainer}>
        <h2>Resumen Mensual por taller</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "lightgray",
            borderRadius: "4px",
          }}
        >
          <thead>
            <tr style={trStyle}>
              <th style={thStyle}>Fecha</th>
              <th style={thStyle}>Taller</th>
              {/* <th style={thStyle}>Hora</th> */}
              <th style={thStyle}>Cantidad de Turnos </th>
              <th style={thStyle}>Monto recaudado </th>
            </tr>
          </thead>

          <tbody>
            {dataResumenPorTaller?.map((item) => (
              <tr key={`${item.taller_id}-${item.mes}`}>
                <td style={tdStyle}>
                  {new Intl.DateTimeFormat("es-AR", {
                    month: "short",
                    year: "numeric",
                  })
                    .format(new Date(item.mes))
                    .replace(".", "")}
                </td>
                <td style={tdStyle}>{item.taller}</td>
                <td style={tdStyle}>{item.cantidad_turnos}</td>
                <td style={tdStyle}>${item.monto_recaudado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      backgroundColor: "#d3d3d3",
    }}
  >
    <h3>{title}</h3>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
  </div>
);

const thStyle = {
  borderBottom: "2px solid #000000",
  padding: "0.5rem",
  textAlign: "left" as const,
};

const tdStyle = {
  borderBottom: "1px solid #1a1a1a",
  padding: "0.5rem",
};

const trStyle = {
  backgroundColor: "rgb(151 151 151)",
};
