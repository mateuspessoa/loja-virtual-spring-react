import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "../../../styles/produto.module.css";
import axios from "axios";
import { IMaskInput } from "react-imask";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const Produto = () => {
  const [pessoa, setPessoa] = useState({
    nome: "",
    cpf: "",
    email: "",
    endereco: "",
    cep: "",
    cidade: {},
  });

  const [cidades, setCidades] = useState([]);
  const [idCidade, setIdCidade] = useState(null);
  const [pessoas, setPessoas] = useState([]);
  const [atualizar, setAtualizar] = useState();
  const [cpf, setCpf] = useState("")
  const [cep, setCep] = useState("")

  useEffect(() => {
    buscarTodasPessoas();
    buscarTodasCidades()
  }, [atualizar]);

  function handleChange(e) {
    setPessoa({ ...pessoa, [e.target.name]: e.target.value });
  }

  function buscarTodasPessoas() {
    axios.get("http://localhost:8080/api/pessoa/").then((result) => {
      setPessoas(result.data);
    });
  }

  function buscarTodasCidades() {
    axios.get("http://localhost:8080/api/cidade/").then((result) => {
      setCidades(result.data);
    });
  }

  function limpar() {
    setPessoa({
      nome: "",
      cpf: "",
      email: "",
      endereco: "",
      cep: "",
      cidade: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    var idCidadeNum = parseInt(idCidade);
    var obj = `{"id":${idCidadeNum}}`;
    var objConv = JSON.parse(obj);
    pessoa.cidade = objConv;

    var cpfSM = cpf.replace(".", "").replace("-", "").replace(".", "")
    pessoa.cpf = cpfSM;
    
    var cepSM = cep.replace("-", "")
    pessoa.cep = cepSM

    if (pessoa.id === undefined) {
      if(!pessoa.email.includes('@') || (!pessoa.email.includes('.'))){
        const error = document.getElementById("error")
        error.style.display = "block"
        setTimeout(() => {
          error.style.display = "none"
        }, 3000)
        return
      }else{
        axios
        .post("http://localhost:8080/api/pessoa/", pessoa)
        .then(() => {return new Swal("Sucesso", "Pessoa Cadastrada com Sucesso!", "success")}).then((result) => {
          setAtualizar(result)
        })
      }
    } else if(!pessoa.email.includes('@') || (!pessoa.email.includes('.'))) {
        const error = document.getElementById("error")
        error.style.display = "block"
        setTimeout(() => {
          error.style.display = "none"
        }, 3000)
        return
    }else{
      axios
      .put("http://localhost:8080/api/pessoa/", pessoa)
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
        axios.delete("http://localhost:8080/api/pessoa/" + id).then(result => {
          Swal.fire(
            'Excluído!',
            'A pessoa foi excluída com sucesso!.',
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
          <label className="form-label">Nome</label>
          <input
            name="nome"
            onChange={handleChange}
            value={pessoa.nome}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CPF</label>
          <IMaskInput
            name="cpf"
            mask="000.000.000-00"
            onChangeCapture={(e) => {setCpf(e.target.value)}}
            onChange={handleChange}
            value={pessoa.cpf}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            name="email"
            onChange={handleChange}
            value={pessoa.email}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
          <span id="error" className={styles.span}>Digite um email válido</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Endereço</label>
          <input
            name="endereco"
            onChange={handleChange}
            value={pessoa.endereco}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CEP</label>
          <IMaskInput
            name="cep"
            mask="00000-000"
            onChange={handleChange}
            onChangeCapture={(e) => {setCep(e.target.value)}}
            value={pessoa.cep}
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cidade</label>
          <select
            name="cidade"
            onChange={(e) => {
              setIdCidade(e.target.value);
            }}
            className="form-select"
            aria-label="Default select example"
          >
            {cidades?.map((cidadess) => (
              <option key={cidadess.id} value={cidadess.id}>
                {cidadess.nome}
              </option>
            ))}
          </select>
        </div>
        {pessoa.id && (
          <input type="submit" className="btn btn-success" value="Editar" />
        )}
        {pessoa.id === undefined && (
          <input type="submit" className="btn btn-success" value="Cadastrar" />
        )}
      </form>

      <div className={styles.tabela}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Cidade</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {pessoas?.map((pessoass) => (
              <tr key={pessoass.id}>
                <td>{pessoass.nome}</td>
                <td>{pessoass.cidade.nome}</td>
                <td>{pessoass.email}</td>
                <td className={styles.btns}>
                  <button
                    onClick={() => setPessoa(pessoass)}
                    type="button"
                    className="btn btn-warning"
                  >
                    Alterar
                  </button>
                  &nbsp;&nbsp;
                  <button
                    onClick={() => excluir(pessoass.id)}
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

export default Produto;
