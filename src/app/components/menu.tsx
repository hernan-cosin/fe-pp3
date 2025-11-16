"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./menu.module.css";
import { User } from "../utils/types";
import { fetchWithAuth } from "../utils/api";
import { useRouter } from "next/navigation";

export function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  const [usuario, setUsuario] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    fetchWithAuth("http://localhost:3001/api/profile").then(async (res) => {
      const data = await res.json();
      console.log("probando data", data);
      setUsuario(data?.data[0]);

    });
  }, []);

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(undefined)
    
    router.push("/sign-in");
  };

  return (
    <nav className={styles.nav}>
      {usuario ? (
        <li className={styles.li + " " + styles.headMenu} onClick={handleClick}>
          {openMenu ? "Cerrar" : "Menu"}
        </li>
      ) : (
        <li className={styles.li + " " + styles.headMenu} onClick={handleClick}>
          {openMenu ? "Cerrar" : "Ingresar"}
        </li>
      )}
      <ul className={openMenu ? styles.opened : styles.closed}>
        <li className={styles.li}>
          {usuario ? (
            <div onClick={logout} className={styles.link}>
              Cerrar sesión
            </div>
          ) : (
            <Link href="/sign-in" className={styles.link}>
              Iniciar sesión
            </Link>
          )}
        </li>
        {usuario ? (
          <>
            <Link href="/dashbord-user" className={styles.link}>
              Mis datos
            </Link>
            <Link href="/mis-reservas" className={styles.link}>
              Mis reservas
            </Link>
          </>
        ) : (
          <>
            <li className={styles.li}>
              <Link href="/sign-up-user" className={styles.link}>
                Registrar usuario
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/sign-up-shop" className={styles.link}>
                Registrar taller
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
