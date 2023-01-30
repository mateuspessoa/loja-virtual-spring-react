import Link from "next/link";
import React from "react";
import styles from "../styles/sidebar.module.css"

const Sidebar = () => {
  return (
    <header className={styles.header}>
        <h1 className={styles.titulo}>Painel Administrativo</h1>

        <nav className={styles.navbar}>

            <Link className={styles.link} href="/cadastros/estado">Estados</Link>
            <Link className={styles.link} href="/cadastros/cidade">Cidades</Link>
            <Link className={styles.link} href="/cadastros/categoria">Categorias</Link>
            <Link className={styles.link} href="/cadastros/marca">Marcas</Link>
            <Link className={styles.link} href="/cadastros/permissao">Permissões</Link>
            <Link className={styles.link} href="/cadastros/produto">Produtos</Link>

        </nav>
    </header>
  );
};

export default Sidebar;
