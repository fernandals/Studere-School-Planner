import React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

import styles from '@/styles/account.module.css';

// Define the UserInfo type
interface UserInfo {
  username: string;
  email: string;
  courses: string[];
}

const Account = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);  // Explicit type definition
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch user information from API or get it from the session (mocked here)
    // Replace this with actual fetch logic
    const user = {
      username: 'John Doe',
      email: 'john.doe@example.com',
      courses: ['Math 101', 'History 201']
    };
    setUserInfo(user);
  }, []);

  const handleLogout = () => {
    // Clear session/token or call API to log out
    // Then redirect to login page
    localStorage.removeItem('authToken');  // Assuming you store the auth token in localStorage
    router.push('/login');  // Redirect to login page after logout
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    setPasswordError('');

    // Proceed to update password (call API here)
    console.log('Updating password...');
    // Example API call:
    // await updatePassword(oldPassword, newPassword);
    
    // For now, clear the fields after "successful" password change
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Password updated successfully!');
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }}>
            
        <Header 
          title="Account Information" 
          buttonText={undefined} 
          onButtonClick={undefined}          
        />

        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.accountInfo}>
              <p><strong>Username:</strong> {userInfo.username}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
            </div>

            <div className={styles.passwordForm}>
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordChange}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Old Password</label>
                  <input
                    className={styles.passwordInput}
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>New Password</label>
                  <input
                    className={styles.passwordInput}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Confirm New Password</label>
                  <input
                    className={styles.passwordInput}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordError && <p className={styles.error}>{passwordError}</p>}
                <button className={styles.button} type="submit">Update Password</button>
              </form>
            </div>
          </div>
          
          <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
        </div>

        </main>
      </div>
    );
};

export default Account;
