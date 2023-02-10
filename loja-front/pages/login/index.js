import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../../styles/login.module.css'
import Swal from "sweetalert2";

const Login = () => {

    const [usuario, setUsuario] = useState({
        email: "",
        senha: ""
    })


    const CHAVE_TOKEN = "";



    function handleChange(e) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
      }
    
    function limpar() {
        setUsuario({
          email: "",
          senha: "",
        });
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        if(!usuario.email.includes('@') || (!usuario.email.includes('.'))){
            const error = document.getElementById("error")
            error.style.display = "block"
            setTimeout(() => {
              error.style.display = "none"
            }, 3000)
            return
          }else{
            //console.log(usuario)
            axios.post("http://localhost:8080/api/pessoa-gerenciamento/login", usuario).then(result => {
                console.log(result);
                localStorage.setItem("TOKEN", result.data.token);
                window.location.href = "/admin";
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
          }
          limpar();
      }

      function autenticado() {
        return localStorage.getItem("TOKEN") != null;
      }

  return (
    <div className={styles.container}>
        <div className={styles.container_login}>
            <h1>Login</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.container_email}>
                    <label>Email</label>
                    <input type="text" name='email' onChange={handleChange} value={usuario.email} required />
                    <span id='error' className={styles.erro}>Digite um email válido</span>
                </div>
                
                <div className={styles.container_senha}>
                    <label>Senha</label>
                    <input type="password" name='senha' onChange={handleChange} value={usuario.senha} required />
                </div>
                <div className={styles.container_esqueci}>
                    <Link href="/codigo"><span>Esquecia a minha senha</span></Link>
                </div>
                <div className={styles.submit}>
                    <input type="submit" value="Entrar" />
                </div>
            </form>
            <div className={styles.sem_conta}>
                <Link href="#"><span>Faça o seu cadastro</span></Link>
            </div>
        </div>
    </div>
  )
}

export default Login