import styles from "./footer.module.css"
import Image from "next/image";


export function Footer (){
    return <footer className={styles.footer}>
            <div>
                <Image src="/logo.svg" alt="logo" width={100} height={50}></Image>
                <h2 className={styles.titulo}>Busca Mecánico</h2>
                <p className="text-sm">
                    © {new Date().getFullYear()} Busca Mecánico.  
                    Todos los derechos reservados.
                </p>
            </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contacto</h3>
          <ul className={styles.contactoUl}>
            <li>📞 Tel: +54 11 1234-5678</li>
            <br />
            <li>📧 Email: buscamecanico@gmail.com</li>
            <br />
            <li>📍 Dirección: Buenos Aires, Argentina.</li>
            <br />
            <a href="https://www.instagram.com/" aria-label="Instagram" className={styles.instagramLink}>📷 Instagram</a>
          </ul>

          {/* <div className="flex gap-4 mt-4 text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-white">📷</a>
            <a href="#" aria-label="Facebook" className="hover:text-white">📘</a>
            <a href="#" aria-label="WhatsApp" className="hover:text-white">💬</a>
          </div> */}
        </div>
        <div>
          <h3 className={styles.informacionTitle}>Información</h3>
          <ul className={styles.informacionUl}>
            <li><a href="/nosotros">Sobre nosotros</a></li>
            <br />
            <li><a href="/qa">Preguntas frecuentes</a></li>
          </ul>
        </div>
    </footer>
}