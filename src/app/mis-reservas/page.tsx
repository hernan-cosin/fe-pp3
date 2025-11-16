'use client'
import { useEffect, useState } from "react";
import styles from "./myAppointments.module.css"
import { fetchWithAuth } from "../utils/api";
import PrecioInput from "../components/amountInput";
import { Button } from "../components/button";
// import { WalletBrickButton } from "../components/walletBrickButton";
// import { PaymentBrickButton } from "../components/paymentBrickButton";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { MercadoPago?: any; }
}

type Reserva = {
  id: number;
  cliente_id: number;
  taller_id: number;
  fecha: string;
  hora: string;
  estado: string;
  monto_asignado: number;
  talleres: {direccion:string;id:number;nombre_taller:string}
  usuarios: {apellido: string;id:number;nombre:string; telefono:number}
};
export default function MyAppointments () {
    const [myAppointments, setMyAppointments] = useState<Reserva[]>();
    const [isClient, setIsClient] = useState<boolean>();
    const [preferenceId, setPreferenceId] = useState("");

    useEffect(() => {
        const fetchAppointments = async ()=>{
            const response = await fetchWithAuth("http://localhost:3001/api/turnos/mis-reservas", {method: "GET"});
            const data = await response.json();
            setMyAppointments(data.data);

            if (data.data[0].talleres){
                setIsClient(true)
            } else {setIsClient(false)};
        }
        fetchAppointments()
    }, []);


    const handlePayButton = async (taller_id:number, reservaId:number)=>{
        const response = await fetchWithAuth(`http://localhost:3001/api/pagos/${taller_id}/create-preference`, {
        method: "POST",
        body: JSON.stringify({
            turnoId: reservaId
    })  
    })
    const data = await response.json();
    console.log("RESPUESTA: ", data.preferenceId);
        setPreferenceId(data.preferenceId)
        return data 
    }
    
    return (
    <main className={styles.main}>
      <h1 className={styles.title}>Mis reservas</h1>
        {
            isClient?
                    <ul>
                        {myAppointments?.map((reserva) => (
                            <li key={reserva.id} className={styles.li}>
                            <p>
                                <strong>Fecha:</strong>{" "}
                                {(reserva.fecha)}
                            </p>
                            <p>
                                <strong>Hora:</strong> {reserva.hora.substring(0, 5)}
                            </p>
                            <p>
                                <strong>Taller:</strong> {reserva.talleres.nombre_taller}
                            </p>
                            <p>
                                <strong>Direccion:</strong> {reserva.talleres.direccion}
                            </p>
                            <p>
                                <strong>Precio:</strong> {reserva.monto_asignado}
                            </p>
                            {!preferenceId && reserva.monto_asignado? <Button className={styles.payButton} onClick={()=>{handlePayButton(reserva.talleres.id, reserva.id)}}>Abonar</Button> : 
                                
                            (
                                <div></div>
                                // <PaymentBrickButton preference={preferenceId} amount={reserva.monto_asignado} />
                                // <div id="wallet_container">
                                //     <WalletBrickButton preferenceId={preferenceId} />
                                // </div>
                            )
                                

                                }
                            </li>))}
                    </ul> : <ul>
                        {myAppointments?.map((reserva) => (
                            <li key={reserva.id} className={styles.li}>
                            <p>
                                <strong>Fecha:</strong>{" "}
                                {(reserva.fecha)}
                            </p>
                            <p>
                                <strong>Hora:</strong> {reserva.hora.substring(0, 5)}
                            </p>
                            <p>
                                <strong>Cliente:</strong> {reserva.usuarios.nombre + " " + reserva.usuarios.apellido}
                            </p>
                            <p>
                                <strong>Teléfono:</strong> {reserva.usuarios.telefono}
                            </p>
                            <PrecioInput montoBackend={reserva.monto_asignado} id={reserva.id}/>
                            </li>))}
                    </ul>
        }
        
    </main>
  );
}