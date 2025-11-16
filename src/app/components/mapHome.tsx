"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./mapHome.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Taller {
        "id": number,
        "nombre_taller": string,
        "direccion": string,
        "creado_en": string,
        "horario_inicio": string,
        "horario_fin": string,
        "duracion_turno": number,
        "latitud": number,
        "longitud": number,
        "dias_laborales": string[],
        "usuario_id": number,
        "ciudad": string,
        "barrio_id": {nombre:string};
}

export function MapTalleres() {
    const router = useRouter()
    
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [barrioId, setBarrioId] = useState<number | null>(null);
  const [barrios, setBarrios] = useState<{ id: number; nombre: string }[]>([]);
useEffect(() => {
    console.log(talleres);
    
    return () => {
        
    };
}, [talleres]);
  // 🔹 Cargar barrios
  useEffect(() => {
    const fetchBarrios = async () => {
      const res = await fetch("http://localhost:3001/api/barrios");
      const data = await res.json();
      setBarrios(data.data);
    };
    fetchBarrios();
  }, []);

  // 🔹 Cargar talleres
  useEffect(() => {
    const fetchTalleres = async () => {
    //   let url = "http://localhost:3001/api/talleres";
    //   if (barrioId) url += `?barrio_id=${barrioId}`;
        const url = `http://localhost:3001/api/mecanicos/barrio/${barrioId}`   
      const res = await fetch(url);
      const data = await res.json();
      setTalleres(data.data);      
    };
    fetchTalleres();
  }, [barrioId]);

  const handleReservation = (id: number) => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            return router.push("/sign-in");
        }
        else {
            router.push("/mechanic/" + id )       
        }
    };

  return (
    <div className={styles.container}>
      <select
        onChange={(e) => setBarrioId(Number(e.target.value))}
        className={styles.select}
      >
        <option value="">Seleccione un barrio</option>
        {barrios.map((b) => (
          <option key={b.id} value={b.id}>
            {b.nombre}
          </option>
        ))}
      </select>

      <p className={styles.resultado}>
      {talleres?.length > 0
        ? `Se encontraron ${talleres.length} taller(es) en la zona seleccionada`
        : barrioId
          ? "No se encontraron talleres en este barrio"
          : "Seleccione un barrio para ver los talleres disponibles"}
    </p>

      {/* <div id="mapSection"> */}
        <MapContainer
          center={[-34.6037, -58.3816]} // coordenadas iniciales (Buenos Aires)
          zoom={12}
          style={{ height: "70vh", width: "100%" }}
          id="mapSection"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {talleres?.map((taller) => (
            <Marker
              key={taller.id}
              position={[taller.latitud, taller.longitud]}
              icon={icon}
            >
              <Popup>
                <strong>{taller.nombre_taller}</strong>
                <br />
                {taller.direccion}
                <br />
                {taller.barrio_id?.nombre}

                <br />
                <strong onClick={()=> {handleReservation(taller.id)}} className={styles.reserve}>Reservar</strong>

              </Popup>
            </Marker>
          ))}
        </MapContainer>
      {/* </div> */}
    </div>
  );
}