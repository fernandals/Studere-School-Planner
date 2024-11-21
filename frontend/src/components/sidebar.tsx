import { useEffect, useState } from "react";

import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/sidebar.module.css';
import appLogo from '../../public/images/icon.png'; 

const Sidebar = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Replace with actual API endpoint!
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setEmail(data.email));
  }, []);

  return (
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <Image src={appLogo} alt="An open book, the app icon." className={styles.icon} />
          <p className={styles.appName}>Studere</p>
        </div>

        <div className={styles.navigation}>
          <Link href="/dashboard">
            <button className={styles.button}>Dashboard</button>
          </Link>

          <Link href="/courses">
            <button className={styles.button}>Courses</button>
          </Link>

          <Link href="/plans">
            <button className={styles.button}>Study Plans</button>
          </Link>

          <Link href="/sessions">
            <button className={styles.button}>Sessions</button>
          </Link>

          <Link href="/calendar">
            <button className={styles.button}>Calendar</button>
          </Link>

          <Link href="/achievments">
            <button className={styles.button}>Achievments</button>
          </Link>

          <Link href="/settings">
            <button className={styles.button}>Settings</button>
          </Link>
        </div>

        <div className={styles.userInfo}>
          <a href="/account" className={styles.email}>
            {email ? <p className={styles.email}>User Email: {email}</p> : <p className={styles.email}>Loading...</p>}
          </a>
        </div>
      </div>
  );
};

export default Sidebar;