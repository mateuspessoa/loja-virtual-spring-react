import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../styles/estado.module.css";

import axios from "axios";
import { useState, useEffect } from "react";

const Categoria = () => {
  const [categoria, setCategoria] = useState({
    nome: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodos();
  }, [atualizar])

  function handleChange(e) {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  }

  function buscarTodos() {
    axios.get("http://localhost:8080/api/categoria/").then((result) => {
        setCategorias(result.data);
    })
  }

  function limpar() {
    setCategoria({
      nome: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (categoria.id === undefined) {
      axios.post("http://localhost:8080/api/categoria/", categoria).then((result) => {
        setAtualizar(result);
      });
    } else {
      axios.put("http://localhost:8080/api/categoria/", categoria).then((result) => {
        setAtualizar(result);
      });
    }
    limpar();
  }

  function excluir(id) {
    axios.delete("http://localhost:8080/api/categoria/" + id).then(result => {
        setAtualizar(result);
    })
  }

  return (
    <div className={styles.container}>
      <Sidebar />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome da Categoria</label>
          <input
            onChange={handleChange}
            value={categoria.nome}
            name="nome"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        {
          categoria.id && <input type="submit" className="btn btn-success" value="Editar" />
        }
        {
          categoria.id === undefined && <input type="submit" className="btn btn-success" value="Cadastrar" />
        }
      </form>

      <div className={styles.tabela}>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias?.map((categoriass) => (
                <tr key={categoriass.id}>
                    <td>{categoriass.nome}</td>
                    <td className={styles.btns}>
                        <button onClick={() => setCategoria(categoriass)} type="button" className="btn btn-warning">Alterar</button>&nbsp;&nbsp;
                        <button onClick={() => excluir(categoriass.id)} type="button" className="btn btn-danger">Excluir</button>&nbsp;&nbsp;
                    </td>
                 </tr>
            ))}
                
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categoria;
