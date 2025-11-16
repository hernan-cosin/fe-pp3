"use client";
import Link from "next/link";
import styles from "./sign-in.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  // const setUserValue = useSetAtom(userAtom);

  const [form, setForm] = useState({
    email: "",
    contrasena: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (!data.token) {
        toast.error("Error al ingresar usuario");
      } else {
        localStorage.setItem("token", data.token);
        toast.success("Acceso exitoso"); 

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || "Error al crear el usuario");
    }
  };
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <Link href={"/"}>Olvide mi contraseña</Link>
        <button type="submit" className={styles.button}>
          Iniciar sesión
        </button>
      </form>
    </main>
  );
}
