import './App.css';
import ImportJobs from './components/ImportLogs';
import JobImportHistory from './components/JobList';

function App() {
  return (
    <div className="container">
      <h1>Job Import Dashboard</h1>
      <div className="grid">
        {/* <JobImportHistory /> */}
        <ImportJobs />
      </div>
    </div>
  );
}

export default App;
