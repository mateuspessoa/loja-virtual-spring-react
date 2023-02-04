import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../../styles/imagens.module.css";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import FormData from 'form-data';

const ProdutoImagens = () => {

  const [imagem, setImagem] = useState(null)
  const [atualizar, setAtualizar] = useState(null)
  const [imagens, setImagens] = useState(null)
  const [produto, setProduto] = useState({})


  const router = useRouter();
  const produtoId = router.query.produtoId
  const produtoIdNum = parseInt(produtoId)
  
  const buscaPorProduto = useCallback(async (id) => {
      await axios.get(`http://localhost:8080/api/produtoImagens/produto/${produtoId}`).then((result) => {
      setImagens(result.data)
    })
  }, [produtoId]);

  const buscaPorId = useCallback(async () => {
    await axios.get(`http://localhost:8080/api/produto/${produtoId}`).then((result) => {
      setProduto(result.data)
    })
  }, [produtoId]);

  useEffect(() => {
      buscaPorId();
      buscaPorProduto();
  }, [buscaPorId, buscaPorProduto, atualizar]);


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
      .then(() => {return new Swal("Sucesso", "Imagem Cadastrada com Sucesso!", "success")}).then((result) => {
        setAtualizar(result)
      })
  }

  function excluir(id) {
    Swal.fire({
      title: 'Você tem Certeza?',
      text: "Essa ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8080/api/produtoImagens/" + id).then(result => {
          Swal.fire(
            'Excluído!',
            'A Imagem foi excluída com sucesso!.',
            'success'
          )
          setAtualizar(result)
        })
      }
    })
  }

  return (
    <div className={styles.container}>
      <Sidebar />      
      <div className={styles.conteudo}>
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
          <button type="submit" className="btn btn-primary">Adcionar</button>
        </form>

        <div className={styles.container_imagens}>
          {imagens?.map((img) => (
            <div key={img.id} className={styles.card_imagens}>
                <img className={styles.img} src={'data:image;base64, ' + img.arquivo} alt="imagem camisa" />
                <h4 className={styles.nome_imagem}>{img.nome}</h4>
                <button onClick={() => excluir(img.id)} type="button" className="btn btn-danger">Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProdutoImagens;
