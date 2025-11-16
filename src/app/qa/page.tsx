'use client'
import styles from "./qa.module.css"

export default function FAQ() {
  return (
        <section className={styles.faqContainer}>
      <h2 className={styles.faqitle}>Preguntas Frecuentes</h2>

      <div className={styles.faqList}>
        
        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Cómo puedo reservar un turno?</h3>
          <p className={styles.faqAnswer}>
            Podés reservar un turno directamente desde nuestra plataforma seleccionando el servicio, el día y el horario disponible. Recibirás una confirmación por email.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Cómo realizo el pago de mi reserva?</h3>
          <p className={styles.faqAnswer}>
            Al confirmar tu turno, podés abonar mediante MercadoPago con tarjeta, débito, transferencia o saldo en cuenta. El turno queda confirmado solo si el pago es aprobado.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Puedo cancelar o reprogramar un turno?</h3>
          <p className={styles.faqAnswer}>
            Sí, desde tu perfil podés cancelar o reprogramar el turno dentro del tiempo permitido por la política de cancelaciones.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Qué pasa si mi pago es rechazado?</h3>
          <p className={styles.faqAnswer}>
            Si el pago es rechazado, el turno queda en estado pendiente. Podés reintentar el pago o elegir otro método.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Recibo un comprobante después de pagar?</h3>
          <p className={styles.faqAnswer}>
            Sí, enviamos automáticamente un comprobante por email y también puede descargarse desde tu panel.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Qué métodos de pago aceptan?</h3>
          <p className={styles.faqAnswer}>
            A través de MercadoPago podés usar tarjetas, transferencias, billeteras virtuales y pagos en efectivo.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Cómo sé si mi turno está confirmado?</h3>
          <p className={styles.faqAnswer}>
            Vas a recibir un email de confirmación y en tu panel se mostrará como “Confirmado”.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>No recibí el correo de confirmación, ¿qué hago?</h3>
          <p className={styles.faqAnswer}>
            Revisá la carpeta de spam. Si no aparece, podés solicitar otro correo o escribirnos por WhatsApp.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Puedo modificar mis datos personales?</h3>
          <p className={styles.faqAnswer}>
            Sí, desde tu cuenta podés actualizar tus datos personales en cualquier momento.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>¿Tienen atención al cliente?</h3>
          <p className={styles.faqAnswer}>
            Sí, podés contactarnos por WhatsApp, redes sociales o mediante el formulario de contacto. Respondemos dentro de las 24 hs hábiles.
          </p>
        </div>
      </div>
    </section>
  );
}