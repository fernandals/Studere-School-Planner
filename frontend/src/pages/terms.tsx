import { useState } from 'react';
import { API_URL } from '@/config';

import axios from 'axios'

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import TermModal from '@/components/termModal';
import TermList from '@/components/termList';

import styles from '@/styles/terms.module.css';

const Terms = () => {
  const [terms, setTerms] = useState([]);
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);

  const closeTermModal = () => setIsTermModalOpen(false);

  const handleCreateTerm = () => {
    //setCurrentTerm(null);
    setIsTermModalOpen(true); // Open the modal for creating
  };

  const fetchTerms = async () => {
    try {

      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      }

      const response = await axios.get(`${API_URL}/terms`, { headers: headers });
      
      setTerms(response.data)
    } catch (err) {
      console.error('Error fetching terms:', err);
    } finally {
      console.log('Terms:', terms);
    }
  };

  const handleSaveTerm = async (term: any) => {

    try {
      const requestBody = {
        "name": term.name,
        "start_date": term.startDate,
        "end_date": term.endDate,
      }
      
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      }

      const response = await axios.post(`${API_URL}/terms`, requestBody, { headers: headers });
      
      if (response.status === 201) {
        alert("Term created successfully");
        closeTermModal();
        fetchTerms(); 
      }

    } catch (err) {
        console.error('Error saving term:', err);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }} className={styles.content}>
        
        <Header 
          title="Terms" 
          buttonText="Create Term" 
          onButtonClick={handleCreateTerm} 
        />

        <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
          <TermModal 
            isOpen={isTermModalOpen} 
            onClose={closeTermModal} 
            onSave={handleSaveTerm}
          />
          
          <TermList
            terms={terms}
            fetchTerms={fetchTerms}
          />
        </div>               
        
      </main>
    </div>
  );
};

export default Terms;
