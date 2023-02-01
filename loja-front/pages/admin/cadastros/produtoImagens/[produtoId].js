import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../../styles/imagens.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import FormData from 'form-data';

const ProdutoImagens = () => {
  /*const [objetoNovo, setObjetoNovo] = useState({
    file: null,
    idProduto: null,
  });*/

  const [imagem, setImagem] = useState(null)
  const [atualizar, setAtualizar] = useState(null)

  const router = useRouter();
  const produtoId = router.query.produtoId
  const produtoIdNum = parseInt(produtoId)

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', imagem)
    formData.append('idProduto', produtoIdNum)

    const headers = {
      'headers': {
        'Content-Type': 'multipart/form-data'
      }
    }
    
    axios.post("http://localhost:8080/api/produtoImagens/", formData, headers)
        .then((result) => {
          console.log(result)
        })
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Imagem</label>
          <input
            name="descricaoLonga"
            type="file"
            onChange={(e) => {setImagem(e.target.files[0])}}
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default ProdutoImagens;
