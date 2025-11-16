'use client'
import { Header } from "./components/header"
import { Footer } from "./components/footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import style from "./page.module.css"
import { Provider } from 'jotai'
import { MercadoPagoProvider } from "./lib/mercadopago";

export default function mainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={style.body}>
        <ToastContainer />
        <Header/>
        <main className={style.main}>
          <MercadoPagoProvider>
            <Provider>
              {children}
            </Provider>
          </MercadoPagoProvider>
        </main>
        <Footer/>
      </body>
    </html>
  )
}