import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import styles from '../../styles/admin.module.css'
import Login from '../login'

const Admin = () => {

  const [autorizar, setAutorizar] = useState("")

  useEffect(() => {
    const item = localStorage.getItem('TOKEN') != null
    setAutorizar(item)
    console.log(item)
  }, [])

  console.log(autorizar)

  const PaginaAdmin = () => {
    return (
      <div className={styles.container}>
        <Sidebar />
        <h1>Tela de Dashboard</h1>
    </div>
    );
  }

  return (
    <div>
      {
        autorizar ?
        <PaginaAdmin />
        :
        <Login />
      }
    </div>
  )
}

export default Admin