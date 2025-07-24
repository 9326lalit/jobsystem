import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/jobs/getalljobs')
      .then((res) => {
        setJobs(res.data.data || []);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
      });
  }, []);

  const styles = {
    container: {
      maxWidth: '960px',
      margin: '20px auto',
      padding: '10px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
    },
    heading: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '180px',
    },
    title: {
      fontSize: '18px',
      marginBottom: '8px',
      color: '#2c3e50',
    },
    label: {
      fontWeight: 'bold',
      color: '#444',
    },
    desc: {
      marginTop: '8px',
      fontSize: '14px',
      color: '#666',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Listings</h2>
      <div style={styles.grid}>
        {jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <h3 style={styles.title}>{job.title}</h3>
            <p><span style={styles.label}>Company:</span> {job.company}</p>
            <p><span style={styles.label}>Location:</span> {job.location}</p>
            <p style={styles.desc}>
              {job.description || 'No description available.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
