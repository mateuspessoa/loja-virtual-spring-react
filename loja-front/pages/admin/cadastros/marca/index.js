import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../../styles/estados.module.css";
import Swal from "sweetalert2";

import axios from "axios";
import { useState, useEffect } from "react";

const Marca = () => {
  const [marca, setMarca] = useState({
    nome: "",
  });

  const [marcas, setMarcas] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodos();
  }, [atualizar])

  function handleChange(e) {
    setMarca({ ...marca, [e.target.name]: e.target.value });
  }

  function buscarTodos() {
    axios.get("http://localhost:8080/api/marca/").then((result) => {
        setMarcas(result.data);
    })
  }

  function limpar() {
    setMarca({
      nome: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (marca.id === undefined) {
      axios.post("http://localhost:8080/api/marca/", marca)
        .then(() => {return new Swal("Sucesso", "Marca Cadastrada com Sucesso!", "success")}).then((result) => {
          setAtualizar(result)
        })
    } else {
      axios.put("http://localhost:8080/api/marca/", marca)
      .then(() => {return new Swal("Sucesso", "Dados Editados com Sucesso!", "success")}).then((result) => {
        setAtualizar(result)
      });
    }
    limpar();
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
        axios.delete("http://localhost:8080/api/marca/" + id).then(result => {
          Swal.fire(
            'Excluído!',
            'A Marca foi excluída com sucesso!.',
            'success'
          )
          setAtualizar(result)
        }).catch(function (error) {
          if (error.response) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Existem produtos cadastrados com essa marca',
              footer: 'Primeiro exclua os produtos cadastrados desta marca'
            })
          }
        });
      }
    })
  }

  return (
    <div className={styles.container}>
      <Sidebar />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome da Marca</label>
          <input
            onChange={handleChange}
            value={marca.nome}
            name="nome"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        {
          marca.id && <input type="submit" className="btn btn-success" value="Editar" />
        }
        {
          marca.id === undefined && <input type="submit" className="btn btn-success" value="Cadastrar" />
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
            {marcas?.map((marcass) => (
                <tr key={marcass.id}>
                    <td>{marcass.nome}</td>
                    <td className={styles.btns}>
                        <button onClick={() => setMarca(marcass)} type="button" className="btn btn-warning">Alterar</button>&nbsp;&nbsp;
                        <button onClick={() => excluir(marcass.id)} type="button" className="btn btn-danger">Excluir</button>&nbsp;&nbsp;
                    </td>
                 </tr>
            ))}
                
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marca;
