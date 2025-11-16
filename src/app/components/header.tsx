import Image from "next/image";
import { Menu } from "./menu";
import styles from "./header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={100} height={50}></Image>
          </Link>
          <h1 className={styles.titulo}>Busca Mecánico</h1>
          <Menu />
        </div>
      </header>
      {/* <div className={styles.container}>
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
      </div> */}
    </>
  );
}
