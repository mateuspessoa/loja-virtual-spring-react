import React from 'react'
import { useState } from 'react'
import styles from '../../styles/login.module.css'
import Swal from "sweetalert2";
import Link from 'next/link';
import axios from 'axios';

const Senha = () => {

    const [objeto, setObjeto] = useState({
      email: "",
      codigoRecuperacaoSenha: "",
      senha: ""
    })

    function handleChange(e) {
        setObjeto({ ...objeto, [e.target.name]: e.target.value });
      }

    function limpar() {
        setObjeto({
          email: "",
          codigoRecuperacaoSenha: "",
          senha: ""
        });
      }

    function handleSubmit(e) {
        e.preventDefault();
        if(!objeto.email.includes('@') || (!objeto.email.includes('.'))){
            const error = document.getElementById("error")
            error.style.display = "block"
            setTimeout(() => {
              error.style.display = "none"
            }, 3000)
            return
          }else{
            console.log(objeto)
            axios.post("http://localhost:8080/api/pessoa-gerenciamento/senha-alterar", objeto).then(() => {return new Swal("Sucesso", "Senha Alterada com Sucesso", "success")}).then((result) => {
              console.log(result)
              window.location.href = "/login";
            }).catch(function(error) {
                if(error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuário ou Senha incorretos!',
                        footer: 'Digite o seu email e senha cadastrados'
                      })
                }
            })
            //window.location.href = "/senha"
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.container_login}>
            <h1>Código</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.container_email}>
                    <label>Email</label>
                    <input type="text" name='email'required onChange={handleChange} value={objeto.email}/>
                    <span id='error' className={styles.erro}>Digite um email válido</span>
                </div>
                <div className={styles.container_email}>
                    <label>Código</label>
                    <input type="text" name='codigoRecuperacaoSenha' required onChange={handleChange} value={objeto.codigoRecuperacaoSenha}/>
                </div>
                <div className={styles.container_email}>
                    <label>Nova Senha</label>
                    <input type="password" name='senha'required onChange={handleChange} value={objeto.senha}/>
                </div>
                <div className={styles.container_esqueci}>
                    <Link href="/login"><span>Voltar para o login</span></Link>
                </div>
                <div className={styles.submit}>
                    <input type="submit" value="Enviar" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Senha