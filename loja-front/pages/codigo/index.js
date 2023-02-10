import React from 'react'
import { useState } from 'react'
import styles from '../../styles/login.module.css'
import Swal from "sweetalert2";
import Link from 'next/link';
import axios from 'axios';

const Codigo = () => {

    const [email, setEmail] = useState({
        email: ""
    })

    function handleChange(e) {
        setEmail({ ...email, [e.target.name]: e.target.value });
      }

    function limpar() {
        setEmail({
          email: "",
        });
      }

    function handleSubmit(e) {
        e.preventDefault();
        if(!email.email.includes('@') || (!email.email.includes('.'))){
            const error = document.getElementById("error")
            error.style.display = "block"
            setTimeout(() => {
              error.style.display = "none"
            }, 3000)
            return
          }else{
            axios.post("http://localhost:8080/api/pessoa-gerenciamento/senha-codigo", email).then(() => {return new Swal("Sucesso", "Código Enviado com Sucesso!", "success")}).then((result) => {
              console.log(result)
              window.location.href = "/senha";
            })
            .catch(function(error) {
                if(error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email não Cadastrado',
                        footer: 'Digite o seu email corretamente'
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
                    <input type="text" name='email'required onChange={handleChange} value={email.email}/>
                    <span id='error' className={styles.erro}>Digite um email válido</span>
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

export default Codigo