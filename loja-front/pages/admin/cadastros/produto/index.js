import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../../styles/produto.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

const Produto = () => {
  const [produto, setProduto] = useState({
    descricaoCurta: "",
    descricaoLonga: "",
    valorCusto: "",
    valorVenda: "",
    marca: {},
    categoria: {}
  });

  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idMarca, setIdMarca] = useState(null);
  const [idCategoria, setIdCategoria] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodosProdutos();
    buscarTodasMarcas();
    buscarTodasCategorias();
  }, [atualizar]);

  function handleChange(e) {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  }

  function buscarTodosProdutos() {
    axios.get("http://localhost:8080/api/produto/").then((result) => {
      setProdutos(result.data);
    });
  }

  function buscarTodasMarcas() {
    axios.get("http://localhost:8080/api/marca/").then((result) => {
      setMarcas(result.data);
    });
  }

  function buscarTodasCategorias() {
    axios.get("http://localhost:8080/api/categoria/").then((result) => {
      setCategorias(result.data);
    });
  }

  function limpar() {
    setProduto({
      descricaoCurta: "",
      descricaoLonga: "",
      valorCusto: "",
      valorVenda: "",
      marca: "",
      categoria: ""
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    var idMarcaNum = parseInt(idMarca);
    var obj = `{"id":${idMarcaNum}}`;
    var objConv = JSON.parse(obj);
    produto.marca = objConv;

    var idCategoriaNum = parseInt(idCategoria);
    var obj = `{"id":${idCategoriaNum}}`;
    var objConv = JSON.parse(obj);
    produto.categoria = objConv;
    console.log(produto);

    if (produto.id === undefined) {
      axios.post("http://localhost:8080/api/produto/", produto)
        .then(() => {return new Swal("Sucesso", "Produto Cadastrado com Sucesso!", "success")}).then((result) => {
          setAtualizar(result)
        })
    } else {
      axios.put("http://localhost:8080/api/produto/", produto)
      .then(() => {return new Swal("Sucesso", "Dados Editados com Sucesso!", "success")}).then((result) => {
        setAtualizar(result)
      });
    }
    limpar();
  }

  function excluir(id) {
    Swal.fire({
      title: 'Voc?? tem Certeza?',
      text: "Essa a????o n??o poder?? ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8080/api/produto/" + id).then(result => {
          Swal.fire(
            'Exclu??do!',
            'O Produto foi exclu??do com sucesso!.',
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Descri????o Curta</label>
          <input
            name="descricaoCurta"
            onChange={handleChange}
            value={produto.descricaoCurta}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descri????o Longa</label>
          <textarea
            rows="5"
            name="descricaoLonga"
            onChange={handleChange}
            value={produto.descricaoLonga}
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Valor de Custo</label>
          <input
            name="valorCusto"
            onChange={handleChange}
            value={produto.valorCusto}
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Valor de Venda</label>
          <input
            name="valorVenda"
            onChange={handleChange}
            value={produto.valorVenda}
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Marca</label>
          <select
            name="marca"
            onChange={(e) => {
              setIdMarca(e.target.value);
            }}
            defaultValue={'DEFAULT'}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="DEFAULT" disabled>Selecione...</option>
            {marcas?.map((marcass) => (
              <option key={marcass.id} value={marcass.id}>{marcass.nome}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <select
            name="categoria"
            onChange={(e) => {
              setIdCategoria(e.target.value);
            }}
            defaultValue={'DEFAULT'}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="DEFAULT" disabled>Selecione...</option>
            {categorias?.map((categoriass) => (
              <option key={categoriass.id} value={categoriass.id}>{categoriass.nome}</option>
            ))}
            
          </select>
        </div>
        {
          produto.id && <input type="submit" className="btn btn-success" value="Editar" />
        }
        {
          produto.id === undefined && <input type="submit" className="btn btn-success" value="Cadastrar" />
        }
      </form>

      <div className={styles.tabela}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Descri????o Curta</th>
              <th scope="col">V. Custo</th>
              <th scope="col">V. Venda</th>
              <th scope="col">Marca</th>
              <th scope="col">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {produtos?.map((produtoss) => (
              <tr key={produtoss.id}>
                <td>{produtoss.descricaoCurta}</td>
                <td>R$ {produtoss.valorCusto},00</td>
                <td>R${produtoss.valorVenda},00</td>
                <td>{produtoss.marca.nome}</td>
                <td>{produtoss.categoria.nome}</td>
                <td className={styles.btns}>
                  <button
                    onClick={() => setProduto(produtoss)}
                    type="button"
                    className="btn btn-warning"
                  >
                    Alterar
                  </button>
                  &nbsp;&nbsp;
                  <button
                    onClick={() => excluir(produtoss.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                  &nbsp;&nbsp;
                  <Link href={`/admin/cadastros/produtoImagens/${produtoss.id}`}><button type="button" className="btn btn-info">Imagens</button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produto;
