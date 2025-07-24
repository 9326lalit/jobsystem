

import React, { useEffect, useState } from "react";

const ImportLogs = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("http://localhost:5000/api/import/import")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data);
      })
      .catch((err) => {
        console.error("Error fetching import status:", err);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Feed Import Summary</h2>

      {status ? (
        <div style={styles.card}>
          <p><strong>Message:</strong> {status.message}</p>
          <p><strong>Total Fetched:</strong> {status.totalFetched}</p>
          <p><strong>New Jobs:</strong> {status.newJobs}</p>
          <p><strong>Updated Jobs:</strong> {status.updatedJobs}</p>
          <p><strong>Failed Jobs:</strong> {status.failedJobsCount}</p>
        </div>
      ) : (
        <p>Loading status...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "linear-gradient(to bottom right, #f8f9fa, #dfe6e9)",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#2d3436",
  },
  card: {
    maxWidth: "500px",
    margin: "20px auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    color: "#2d3436",
  },
};

export default ImportLogs;
