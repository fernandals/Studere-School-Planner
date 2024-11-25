import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/login.module.css';
import appIcon from '../../public/images/icon.png'; 
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make login request
      const response = await axios.post('http://localhost:8000/users/login/', { "email": email, "password": password });
      
      // Get the Bearer token from the response
      const token = response.data.access_token;

      // Store the token (you could store it in localStorage or cookies)
      localStorage.setItem('authToken', token);
      router.push('/dashboard');

      // Redirect the user after successful login (optional)
      // You can use Next.js' useRouter for navigation
      // router.push('/dashboard');
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError('Invalid email or password');
    }
  };


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
          
          <input type="text" placeholder="Email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)}/>

          {error && <p className={styles.error}>{error}</p>}  {/* Display error message */}

          <button className={styles.loginButton} onClick={handleLogin}>Login</button>
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
