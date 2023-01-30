import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../styles/estado.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Cidade = () => {
  const [cidade, setCidade] = useState({
    nome: "",
    estado: {},
  });

  const [estados, setEstados] = useState([]);
  const [idEstado, setIdEstado] = useState(null);
  const [cidades, setCidades] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodosEstados();
  }, [atualizar]);

  useEffect(() => {
    buscarTodasCidade();
  }, [atualizar]);

  function handleChange(e) {
    setCidade({ ...cidade, [e.target.name]: e.target.value });
  }

  function buscarTodosEstados() {
    axios.get("http://localhost:8080/api/estado/").then((result) => {
      setEstados(result.data);
    });
  }

  function buscarTodasCidade() {
    axios.get("http://localhost:8080/api/cidade/").then((result) => {
      setCidades(result.data);
    });
  }

  function limpar() {
    setCidade({
      nome: "",
      estado: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    var idEstadoNum = parseInt(idEstado);
    var obj = `{"id":${idEstadoNum}}`;
    var objConv = JSON.parse(obj);
    cidade.estado = objConv;
    console.log(cidade);

    if (cidade.id === undefined) {
      axios.post("http://localhost:8080/api/cidade/", cidade).then((result) => {
        setAtualizar(result);
      });
    } else {
      axios.put("http://localhost:8080/api/cidade/", cidade).then((result) => {
        setAtualizar(result);
      });
    }
    limpar();
  }

  function excluir(id) {
    axios.delete("http://localhost:8080/api/cidade/" + id).then((result) => {
      setAtualizar(result);
    });
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome da Cidade</label>
          <input
            name="nome"
            onChange={handleChange}
            value={cidade.nome}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            name="estado"
            onChange={(e) => {
              setIdEstado(e.target.value);
            }}
            className="form-select"
            aria-label="Default select example"
          >
            {estados?.map((estadoss) => (
              <option key={estadoss.id} value={estadoss.id}>{estadoss.nome}</option>
            ))}
          </select>
        </div>
        {
          cidade.id && <input type="submit" className="btn btn-success" value="Editar" />
        }
        {
          cidade.id === undefined && <input type="submit" className="btn btn-success" value="Cadastrar" />
        }
      </form>

      <div className={styles.tabela}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Estado</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cidades?.map((cidadess) => (
              <tr key={cidadess.id}>
                <td>{cidadess.nome}</td>
                <td>
                  {cidadess.estado &&
                    cidadess.estado.nome + "/" + cidadess.estado.sigla}
                </td>
                <td className={styles.btns}>
                  <button
                    onClick={() => setCidade(cidadess)}
                    type="button"
                    className="btn btn-warning"
                  >
                    Alterar
                  </button>
                  &nbsp;&nbsp;
                  <button
                    onClick={() => excluir(cidadess.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                  &nbsp;&nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cidade;
