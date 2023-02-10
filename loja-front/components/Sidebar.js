import Link from "next/link";
import React from "react";
import styles from "../styles/sidebar.module.css"

const Sidebar = () => {

  function sair() {
    localStorage.removeItem("TOKEN");
    window.location.reload(false);
  }

  return (
    <header className={styles.header}>
        <h1 className={styles.titulo}>Painel Administrativo</h1>

        <nav className={styles.navbar}>

            <Link className={styles.link} href="/admin/">Home</Link>
            <Link className={styles.link} href="/admin/cadastros/estado">Estados</Link>
            <Link className={styles.link} href="/admin/cadastros/cidade">Cidades</Link>
            <Link className={styles.link} href="/admin/cadastros/categoria">Categorias</Link>
            <Link className={styles.link} href="/admin/cadastros/marca">Marcas</Link>
            <Link className={styles.link} href="/admin/cadastros/permissao">Permissões</Link>
            <Link className={styles.link} href="/admin/cadastros/produto">Produtos</Link>
            <Link className={styles.link} href="/admin/cadastros/pessoa">Pessoas</Link>

            <div className={styles.container_sair}>
              <button onClick={() => sair()} className={styles.sair}>Sair</button>
            </div>

        </nav>
    </header>
  );
};

export default Sidebar;
