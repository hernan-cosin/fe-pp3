"use client";
import styles from "./nosotros.module.css"

export default function Nosotros() {

  return <>
  <div className={styles.container}>
        <h2 className={styles.subtitulo}>
            Quiénes Somos
        </h2>
        <p className={styles.text}>
            Somos un equipo joven de desarrolladores y emprendedores apasionados por la
            tecnología y la innovación en servicios automotrices. Nacimos con la idea de
            simplificar la conexión entre conductores y talleres mecánicos, combinando nuestra
            experiencia en sistemas web con una visión moderna del mercado automotor.
            Nuestra competencia radica en la integración de soluciones digitales ágiles, seguras
            y centradas en la ex periencia del usuario. Creemos que la confianza y la eficiencia
            pueden ir de la mano cuando la tecnología se usa para acercar personas y servicios.
        </p>
        <h2 className={styles.subtitulo}>
            Misión
        </h2>
        <p className={styles.text}>
            Nuestra misión es digitalizar el vínculo entre los automovilistas y los talleres
            mecánicos, brindando una plataforma confiable, intuitiva y accesible que permita
            encontrar, comparar, cotizar y contratar servicios mecánicos de manera rápida y
            segura. Buscamos transformar la forma en que los usuarios gestionan el
            mantenimiento de sus vehículos, facilitando la comunicación y mejorando la calidad
            del servicio a través de herramientas tecnológicas simples y efectivas.
        </p>
  </div>
  </>
}