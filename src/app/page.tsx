"use client";
import {MapTalleres} from "./components/mapHome";
import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.banner2}>
          <h1>Tu auto en manos seguras</h1>
          <p>Reservá tu turno de forma rápida, cómoda y segura.</p>
          <p>
            Talleres verificados y listos para ayudarte cuando más lo necesitás.
          </p>
          <button
            className={styles.ctaButton}
            onClick={() =>
              document
                .getElementById("mapSection")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Buscar talleres ahora
          </button>
        </div>

        <section className={styles.banner}>
          <h1 className={styles.title}>Encontrá tu taller de confianza</h1>
          <p className={styles.subtitle}>
            Nuestra plataforma conecta clientes con talleres mecánicos de tu
            zona. Registrá tu taller o buscá un mecánico cercano por barrio.
          </p>
        </section>
      </div>
      <MapTalleres/>
    </main>
  );
}
