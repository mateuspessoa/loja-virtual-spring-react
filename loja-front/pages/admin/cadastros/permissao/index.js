import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../../styles/estados.module.css";
import Swal from "sweetalert2";

import axios from "axios";
import { useState, useEffect } from "react";

const Permissao = () => {
  const [permissao, setPermissao] = useState({
    nome: "",
  });

  const [permissoes, setPermissoes] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodos();
  }, [atualizar])

  function handleChange(e) {
    setPermissao({ ...permissao, [e.target.name]: e.target.value });
  }

  function buscarTodos() {
    axios.get("http://localhost:8080/api/permissao/").then((result) => {
        setPermissoes(result.data);
    })
  }

  function limpar() {
    setPermissao({
      nome: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (permissao.id === undefined) {
      axios.post("http://localhost:8080/api/permissao/", permissao)
        .then(() => {return new Swal("Sucesso", "Permissão Cadastrada com Sucesso!", "success")}).then((result) => {
          setAtualizar(result)
        })
    } else {
      axios.put("http://localhost:8080/api/permissao/", permissao)
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
        axios.delete("http://localhost:8080/api/permissao/" + id).then(result => {
          Swal.fire(
            'Excluído!',
            'A Permissão foi excluída com sucesso!.',
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
          <label className="form-label">Nome da Permissão</label>
          <input
            onChange={handleChange}
            value={permissao.nome}
            name="nome"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        {
          permissao.id && <input type="submit" className="btn btn-success" value="Editar" />
        }
        {
          permissao.id === undefined && <input type="submit" className="btn btn-success" value="Cadastrar" />
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
            {permissoes?.map((permissoess) => (
                <tr key={permissoess.id}>
                    <td>{permissoess.nome}</td>
                    <td className={styles.btns}>
                        <button onClick={() => setPermissao(permissoess)} type="button" className="btn btn-warning">Alterar</button>&nbsp;&nbsp;
                        <button onClick={() => excluir(permissoess.id)} type="button" className="btn btn-danger">Excluir</button>&nbsp;&nbsp;
                    </td>
                 </tr>
            ))}
                
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Permissao;
