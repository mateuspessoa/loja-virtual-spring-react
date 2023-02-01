import React from "react";
import styles from "../../../../styles/teste.module.css";
import Sidebar from "@/components/Sidebar";

function fechar() {
  const quadrado = document.getElementById("qua");
  const btnf = document.getElementById("btnf");
  const btna = document.getElementById("btna");
  quadrado.style.display = "none";
  btnf.style.display = "none";
  btna.style.display = "block";
}

function abrir() {
  const quadrado = document.getElementById("qua");
  const btna = document.getElementById("btna");
  const btnf = document.getElementById("btnf");
  quadrado.style.display = "block";
  btna.style.display = "none";
  btnf.style.display = "block";
}

const Teste = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.conteudo}>
      <div id="qua" className={styles.quadrado}></div>
      <button id="btnf" onClick={() => fechar()} className={styles.btnf}>
        X
      </button>
      <button id="btna" onClick={() => abrir()} className={styles.btna}>
        Cadastrar
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Teste;
