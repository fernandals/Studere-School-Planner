import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/register.module.css';
import appIcon from '../../public/images/icon.png'; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});

    {/* 
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', { name, email, password });
            // Here you would typically send the data to your backend
            // For example: axios.post('/api/register', { name, email, password })
        } else {
            setErrorMessage('Please fix the errors above.');
        }
    };

    */}

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
              
          <form /*onSubmit={handleSubmit}*/ className={styles.form} >
            <input 
                type="text"
                value={name}
                placeholder='Enter you name'
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
            />
            {/*{errors.name && <p style={{ color: 'red' }}>{errors.name}</p>} 
            */}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className={styles.input}
            />
            {/*
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            */}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className={styles.input}
            />
            {/*
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            */}
            
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password'
              className={styles.input}
            />
            {/*
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
            */}
            
            <button type="submit" className={styles.registerButton}>Register</button>

            <a href="/login" className={styles.haveAccount}>Already have an account?</a>
                
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>

        </div>
      </div>

    );
};

export default Register;
