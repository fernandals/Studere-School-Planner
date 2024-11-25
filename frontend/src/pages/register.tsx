import { useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config';

import axios from 'axios';

import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/register.module.css';
import appIcon from '../../public/images/icon.png'; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState('');

    const router = useRouter();
 
    const validateForm = () => {
        const newErrors = {};

        if (!name) newErrors.name = 'Name is required.';
        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!password) newErrors.password = 'Password is required.';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');

        if (validateForm()) {
          const requestBody = {
            "email": email,
            "password": password,
            "full_name": name
          };

          try {
            const response = await axios.post(`${API_URL}/users/register/`, requestBody);
            console.log('Registration successful:', response);

            router.push('/login');
          } catch (error) {
              console.log(error)
              if (error.response && error.response.status === 400) {
                setEmailError(error.response.data.message || 'Email already exists.');
              } else {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
              }
          }
        }
    };

    return (
      <div className={styles.container}>

        <Head>
          <title>Studere: Study Management</title>
        </Head>

        <div className={styles.header}>
          <Image src={appIcon} alt="An open book, the app icon." className={styles.icon} />
          <p>logo junto com o nome que eu vo fazer</p>
        </div>

        <div className={styles.formBlock}>
          <h2 className={styles.title}>Create an account!</h2>
              
          <form onSubmit={handleSubmit} className={styles.form} >
            <input 
                type="text"
                value={name}
                placeholder='Enter you name'
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>} 
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className={styles.input}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className={styles.input}
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password'
              className={styles.input}
            />
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
            
            <button type="submit" className={styles.registerButton}>Register</button>

            <a href="/login" className={styles.haveAccount}>Already have an account?</a>
                
          </form>

        </div>
      </div>

    );
};

export default Register;
