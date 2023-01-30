import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../styles/estado.module.css";

import axios from "axios";
import { useState, useEffect } from "react";

const Estado = () => {
  const [estado, setEstado] = useState({
    nome: "",
    sigla: "",
  });

  const [estados, setEstados] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodos();
  }, [atualizar])

  function handleChange(e) {
    setEstado({ ...estado, [e.target.name]: e.target.value });
  }

  function buscarTodos() {
    axios.get("http://localhost:8080/api/estado/").then((result) => {
        setEstados(result.data);
    })
  }

  function limpar() {
    setEstado({
      nome: "",
      sigla: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (estado.id === undefined) {
      axios.post("http://localhost:8080/api/estado/", estado).then((result) => {
        setAtualizar(result);
      });
    } else {
      axios.put("http://localhost:8080/api/estado/", estado).then((result) => {
        setAtualizar(result);
      });
    }
    limpar();
  }

  function excluir(id) {
    axios.delete("http://localhost:8080/api/estado/" + id).then(result => {
        setAtualizar(result);
    })
  }

  return (
    <div className={styles.container}>
      <Sidebar />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome do Estado</label>
          <input
            onChange={handleChange}
            value={estado.nome}
            name="nome"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sigla do Estado</label>
          <input
            onChange={handleChange}
            value={estado.sigla}
            name="sigla"
            type="text"
            className="form-control"
          />
        </div>
        {
          estado.id && <input type="submit" className="btn btn-success" value="Editar" />
        }
        {
          estado.id === undefined && <input type="submit" className="btn btn-success" value="Cadastrar" />
        }
      </form>

      <div className={styles.tabela}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Sigla</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {estados?.map((estadoss) => (
                <tr key={estadoss.id}>
                    <td>{estadoss.nome}</td>
                    <td>{estadoss.sigla}</td>
                    <td className={styles.btns}>
                        <button onClick={() => setEstado(estadoss)} type="button" className="btn btn-warning">Alterar</button>&nbsp;&nbsp;
                        <button onClick={() => excluir(estadoss.id)} type="button" className="btn btn-danger">Excluir</button>&nbsp;&nbsp;
                    </td>
                 </tr>
            ))}
                
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estado;
