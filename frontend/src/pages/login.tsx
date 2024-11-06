import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/login.module.css';
import appIcon from '../../public/images/icon.png'; 

const Login = () => {
  return (
    <div className={styles.container}>

      <Head>
        <title>Studere: Sutdy Management</title>
      </Head>
      
      <div className={styles.leftContent}>
        <div className={styles.iconTitle}>
            
          <Image src={appIcon} alt="An open book, the app icon." className={styles.icon} />
          <h1 className={styles.title}>Studere App</h1>
          
        </div>
        <p className={styles.subtitle}>Transforming study into success, one session at a time.</p>
      </div>

      <div className={styles.rightContent}>
        <div className={styles.form}>
          
          <input type="text" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          
          <button className={styles.loginButton}>Login</button>
          <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          
          <Link href="/register" passHref>
            <button className={styles.createAccountButton}>Create new account</button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
