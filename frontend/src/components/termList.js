import { useState, useEffect } from 'react';
import { API_URL } from '@/config';

import axios from 'axios';

import TermCard from "./termCard";

import styles from '@/styles/sessionList.module.css';

export default function TermList({terms, fetchTerms}) {
  /*
  const [filter, setFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  */

  useEffect(() => {
    console.log("Fetching terms...");
    fetchTerms();
  }, []);

  // // Filter terms
  // const filteredTerms = terms.filter((term) => {
  //   const matchesFilter = term.name.toLowerCase().includes(filter.toLowerCase());
  //   const matchesPlan = planFilter === "all" || term.plan === planFilter;
  //   return matchesFilter && matchesPlan;
  // });

  return (
    <div className={styles.container}>
      {/* Filters 
      <div  className={styles.filters}>
        <input
          type="text"
          placeholder="Search terms by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
        />

        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Plans</option>
          {[...new Set(terms.map((s) => s.plan))].map((plan, index) => (
            <option key={index} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>
      */}

      {/* Render Term Cards */}
      <div className={styles.list}>
        {terms.length > 0 ? (
          terms.map((term, index) => (
            <TermCard
              key={index}
              name={term.name}
              startDate={term.start_date}
              endDate={term.end_date}
            />
          ))
        ) : (
          <p>No terms match your filters.</p>
        )}
      </div>
      
    </div>
  );
};