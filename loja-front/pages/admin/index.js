import React from 'react'
import Sidebar from '@/components/Sidebar'
import styles from '../../styles/admin.module.css'

const Admin = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <h1>Tela de Dashboard</h1>
    </div>
  )
}

export default Admin